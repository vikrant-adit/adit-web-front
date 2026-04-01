/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { KeyboardEvent, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';

export type CardItem = { id?: string | number; label?: string };
export type SelectableCardsProps = {
  items?: CardItem[];
  columns?: number;
  gap?: number;
  radius?: string;
  background?: string;
  textColor?: string;
  hoverBg?: string;
  selectedBg?: string;
  selectedTextColor?: string;
  multiple?: boolean;
  initialSelected?: number[] | number | null;
};

function isTailwindClass(s?: string) {
  return typeof s === 'string' && /^bg-|^text-|^rounded-|^p-|^m-/.test(s);
}

export default function SelectableCards({
  items = [],
  columns = 3,
  gap = 24,
  radius = '12px',
  background = '#ffffff',
  textColor = '#06263a',
  hoverBg = '#f1faff',
  selectedBg = '#0ea5a4',
  selectedTextColor = '#fff',
  multiple = false,
  initialSelected = null,
}: SelectableCardsProps) {
  const safeItems = Array.isArray(items) ? items : [];

  const initial: number[] = useMemo(() => {
    if (Array.isArray(initialSelected)) return initialSelected.filter((n) => typeof n === 'number');
    if (typeof initialSelected === 'number') return [initialSelected];
    return [];
  }, [initialSelected]);

  const [selectedIdxs, setSelectedIdxs] = useState<number[]>(initial);
  const [lastClickedIdx, setLastClickedIdx] = useState<number | null>(null);

  const dispatchSelectEvent = (indexes: number[]) => {
    const payload = indexes.map((i) => ({
      index: i,
      id: safeItems[i]?.id ?? null,
      label: safeItems[i]?.label ?? '',
    }));
    try {
      window.dispatchEvent(new CustomEvent('cards:selected', { detail: payload }));
    } catch {}
  };

  const handleToggle = (idx: number, e?: React.MouseEvent) => {
    const allowMultiple = Boolean(multiple);

    // Modifier keys
    const isMeta = e?.metaKey || e?.ctrlKey;
    const isShift = e?.shiftKey;

    if (!allowMultiple) {
      // Single-select mode: clicking toggles single selection
      const next = selectedIdxs.includes(idx) ? [] : [idx];
      setSelectedIdxs(next);
      setLastClickedIdx(idx);
      dispatchSelectEvent(next);
      return;
    }

    // Multiple mode -------------------------------------------------------
    // SHIFT: select range between lastClickedIdx and idx (inclusive)
    if (isShift && lastClickedIdx !== null) {
      const start = Math.min(lastClickedIdx, idx);
      const end = Math.max(lastClickedIdx, idx);
      const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      // union with existing selection
      const mergedSet = new Set([...selectedIdxs, ...range]);
      const next = Array.from(mergedSet).sort((a, b) => a - b);
      setSelectedIdxs(next);
      dispatchSelectEvent(next);
      setLastClickedIdx(idx);
      return;
    }

    // META/CMD: toggle this one while preserving others
    if (isMeta) {
      setSelectedIdxs((prev) => {
        const has = prev.includes(idx);
        const next = has ? prev.filter((i) => i !== idx) : [...prev, idx];
        dispatchSelectEvent(next);
        return next;
      });
      setLastClickedIdx(idx);
      return;
    }

    // Normal multiple-click without modifiers: toggle that item (preserve others)
    setSelectedIdxs((prev) => {
      const has = prev.includes(idx);
      const next = has ? prev.filter((i) => i !== idx) : [...prev, idx];
      dispatchSelectEvent(next);
      return next;
    });
    setLastClickedIdx(idx);
  };

  const onKey = (e: KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // cast synthetic keyboard event into MouseEvent-like (no modifiers)
      handleToggle(idx);
    }
  };

  const wrapperStyle: React.CSSProperties = {
    display: 'grid',
    gap: `clamp(12px, 2.5vw, ${gap}px)`,
    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 150px), 1fr))`,
  };

  const cardBaseStyle: React.CSSProperties = {
    borderRadius: typeof radius === 'string' && radius.startsWith('rounded-') ? undefined : radius,
    cursor: 'pointer',
    padding: 'clamp(12px, 3vw, 22px) clamp(14px, 4vw, 22px)',
    fontSize: 'clamp(13px, 2.5vw, 16px)',
    boxShadow: '0 6px 20px rgba(6,38,58,0.06)',
    transition: 'transform .12s ease, box-shadow .12s ease, background-color .12s ease',
    userSelect: 'none',
  };

  return (
    <div className="selectable-cards-block" style={wrapperStyle}>
      {safeItems.map((it, idx) => {
        const isSelected = selectedIdxs.includes(idx);

        const twBgClass = isTailwindClass(background) ? background : '';
        const twTextClass = isTailwindClass(textColor) ? textColor : '';
        const twSelectedBg = isTailwindClass(selectedBg) ? selectedBg : '';
        const twHoverBg = isTailwindClass(hoverBg) ? hoverBg : '';
        const twSelectedText = isTailwindClass(selectedTextColor) ? selectedTextColor : '';

        const labelHtml = it?.label ?? '';

        const cssVars: React.CSSProperties = {
          ['--card-bg' as any]: twBgClass ? undefined : (isSelected ? selectedBg : background),
          ['--card-color' as any]: twTextClass ? undefined : textColor,
          ['--card-hover' as any]: twHoverBg ? undefined : hoverBg,
          ['--card-selected' as any]: twSelectedBg ? undefined : selectedBg,
          ['--card-selected-color' as any]: twSelectedText ? undefined : selectedTextColor,
        };

        const composedClassName = [
          'card-item',
          'group',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-offset-2',
          twBgClass,
          twTextClass,
          isSelected && twSelectedBg ? twSelectedBg : '',
          isSelected && twSelectedText ? twSelectedText : '',
          isSelected ? 'is-selected' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={it?.id ?? idx}
            type="button"
            onClick={(e) => handleToggle(idx, e)}
            onKeyDown={(e) => onKey(e as any, idx)}
            aria-pressed={isSelected}
            className={composedClassName}
            style={{ ...cardBaseStyle, ...cssVars }}
            title={typeof it?.label === 'string' ? it.label.replace(/<[^>]*>/g, '') : undefined}
          >
            <div
              className="card-inner"
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 0,
                borderRadius: typeof radius === 'string' && radius.startsWith('rounded-') ? undefined : undefined,
                transform: 'translateZ(0)',
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(labelHtml) }}
            />
            <style jsx>{`
              .card-item {
                background: var(--card-bg, ${background});
                color: var(--card-color, ${textColor});
                border-radius: ${typeof radius === 'string' && radius.startsWith('rounded-') ? 'inherit' : radius};
              }
              .card-item:hover {
                background: var(--card-hover, ${hoverBg});
              }
              .card-item.is-selected {
                background: var(--card-selected, ${selectedBg});
                color: var(--card-selected-color, ${selectedTextColor});
              }
              .card-item:focus {
                box-shadow: 0 8px 30px rgba(6, 38, 58, 0.08);
              }
              .card-item:hover .card-inner {
                transform: translateY(-3px);
              }
            `}</style>
          </button>
        );
      })}
    </div>
  );
}
