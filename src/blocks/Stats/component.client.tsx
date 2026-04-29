/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* component.client.tsx */
'use client';
import React, { useEffect, useRef, useState, memo } from 'react';

export type StatItem = {
  id?: string | number;
  label?: string;
  subLabel?: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type StatsProps = {
  items?: StatItem[];
  duration?: number;
  separator?: boolean;
  align?: 'left' | 'center' | 'right';
  gap?: number;
  editable?: boolean;
  // 🎨 new
  numberColor?: string;
  labelColor?: string;
};

/** format number with Intl fallback */
function formatNumber(val: number, decimals = 0, useSep = true) {
  if (!useSep) return Number(val).toFixed(decimals);
  try {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val);
  } catch {
    return Number(val).toFixed(decimals);
  }
}

/** count-up hook */
function useCountUp(target: number, duration: number, decimals: number) {
  const [current, setCurrent] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(target) || duration <= 0) {
      setCurrent(target);
      return;
    }
    setCurrent(0);
    startRef.current = null;

    const step = (ts: number) => {
      startRef.current ??= ts;
      const elapsed = ts - (startRef.current || 0);
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Number((target * eased).toFixed(decimals));
      setCurrent(value);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else rafRef.current = null;
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [target, duration, decimals]);

  return current;
}

/** Child tile — safe to use hooks here */
const StatTile: React.FC<{
  item: StatItem;
  duration: number;
  separator: boolean;
  editable: boolean;
  numberColor: string;
  labelColor: string;
}> = memo(({ item, duration, separator, editable, numberColor, labelColor }) => {
  const target = Number(item?.value ?? 0);
  const decimals = Number(item?.decimals ?? 0);

  // use hook inside child (safe)
  const animated = useCountUp(target, Number(duration), decimals);
  const displayNumber = editable ? target : animated;
  const formatted = formatNumber(displayNumber, decimals, Boolean(separator));

  return (
    <div
      className="stat-item"
      style={{
        minWidth: 'clamp(90px, 100%, 140px)',
        flex: '1 1 auto',
        textAlign: 'center',
      }}
    >
      <div
        className="stat-number"
        style={{
          fontSize: 'clamp(1.25rem, 4vw, 2.8rem)',
          fontWeight: 700,
          color: numberColor || '#06263a',
          lineHeight: 1,
        }}
        aria-hidden={false}
      >
        <span className="stat-prefix" style={{ marginRight: 4, display: 'inline-block' }}>
          {item.prefix ?? ''}
        </span>
        <span className="stat-value" style={{ display: 'inline-block' }}>{formatted}</span>
        <span className="stat-suffix" style={{ marginLeft: 4, display: 'inline-block' }}>
          {item.suffix ?? ''}
        </span>
      </div>

      {item.label && (
        <div
          className="stat-label"
          style={{
            marginTop: 4,
            fontSize: 'clamp(0.65rem, 2vw, 0.95rem)',
            color: labelColor ?? '#6b7280',
            lineHeight: 1.3,
          }}
        >
          {item.label}
        </div>
      )}

      {item.subLabel && (
        <div
          className="stat-sublabel"
          style={{
            marginTop: 2,
            maxWidth: '160px',
            fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)',
            color: labelColor ?? '#6b7280',
            opacity: 0.8,
            lineHeight: 1.2,
            margin: '2px auto 0',
          }}
        >
          {item.subLabel}
        </div>
      )}
    </div>
  );
});
StatTile.displayName = 'StatTile';

/** Parent component */
export default function StatsClient({
  items = [],
  duration = 1200,
  separator = true,
  align = 'center',
  gap = 48,
  editable = false,
  numberColor = '#06263a',
  labelColor = '#6b7280',
}: Readonly<StatsProps>) {
  const safeItems: StatItem[] = Array.isArray(items) ? items : Object.values(items ?? {});

  const getJustifyContent = (a?: string) => {
    if (a === 'left') return 'flex-start';
    if (a === 'right') return 'flex-end';
    return 'center';
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: `clamp(0.5rem, 3vw, ${gap}px)`,
    justifyContent: getJustifyContent(align),
    alignItems: 'stretch',
    flexWrap: 'wrap',
    width: '100%',
    padding: 'clamp(0.75rem, 3vw, 2rem)',
  };

  return (
    <div className="stats-block" style={containerStyle}>
      {safeItems.map((it, idx) => (
        <div
          key={it.id ?? `${idx}-${String(it?.label ?? '').slice(0, 8)}`}
          style={{ minWidth: 'clamp(80px, 45%, 160px)', flex: '1 1 auto', textAlign: align as any }}
        >
          <StatTile
            item={it}
            duration={Number(duration)}
            separator={Boolean(separator)}
            editable={Boolean(editable)}
            numberColor={numberColor}
            labelColor={labelColor}
          />
        </div>
      ))}
    </div>
  );
}
