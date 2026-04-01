/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/button.component.client.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import {  useRouter } from 'next/navigation';
import { runAction } from '../actionRegistry';
import { useEditorGlow } from '@/hooks/useEditorGlow';
export interface ButtonProps {
  label?: string;
  align?: 'left' | 'center' | 'right';
  newTab?: boolean;
  width?: string;
  // action fields added
  actionName?: string;
  actionValue?: string; // string or JSON text
  isGlobal?: boolean;
  globalKey?: string;
}

const Button: React.FC<ButtonProps> = ({
  label = 'Click Me',
  align = 'center',
  newTab = false,
  width = 'auto',
  actionName = 'none',
  actionValue = '',
  isGlobal
}) => {
  const isTwWidth = typeof width === 'string' && width.startsWith('w-');
    const inlineStyle: React.CSSProperties = {};
      if (!isTwWidth && width) inlineStyle.width = width;
const { shouldGlow } = useEditorGlow(isGlobal);

  const content = (
   <div className={shouldGlow ? 'editor-global-glow' : ''}>
     <button
       className={[
        'btn-primary',
        'px-4 sm:px-6 md:px-8',
        'py-2 sm:py-2.5 md:py-3',
        'text-sm sm:text-base md:text-lg',
        isTwWidth ? width : '',
        
      ]
        .filter(Boolean)
        .join(' ')}
      style={inlineStyle}
      type="button"
    >
      {label}
    </button>
   </div>
  );

  const router = useRouter();

  // parse actionValue: allow plain string (most common) or JSON object for advanced
  let parsedValue: any = actionValue;
  try {
    if (typeof actionValue === 'string' && actionValue.trim().startsWith('{')) {
      parsedValue = JSON.parse(actionValue);
    }
  } catch (err) {
    console.warn('[Button] actionValue JSON parse error', err);
  }

  const ctx = {
    router: { push: (p: string) => router.push(p) },
    openModal: (id: string) => window.dispatchEvent(new CustomEvent('open-modal', { detail: id })),
    track: (e: string, p?: any) => console.debug('track', e, p),
  };


  const handleClick = (e?: React.MouseEvent) => {
    if (actionName && actionName !== 'none') {
      if (e) e.preventDefault();
      runAction(actionName, parsedValue ?? actionValue, ctx);
      return;
    }
    // fallback: default link behavior (no action)
  };

  // If actionName is 'navigate' and we have an internal url and not newTab, use Link
  if (actionName === 'navigate' && (parsedValue ) && !newTab) {
    const path = (parsedValue && parsedValue.url) || parsedValue ;
    return (
      <div style={{ textAlign: align }} className="flex justify-center sm:justify-start md:justify-center">
        <Link
  href={path}
  onClick={(e) => handleClick(e)}
  aria-label={label}
  target={newTab ? "_blank" : undefined}
>
  {content}
</Link>

      </div>
    );
  }

  // If external or navigate with newTab -> anchor
  if ((actionName === 'external' || actionName === 'navigate') && (parsedValue)) {
    const url = (parsedValue && parsedValue.url) || parsedValue ;
    return (
      <div style={{ textAlign: align }}>
        <a
          href={url}
          target={newTab ? '_blank' : '_self'}
          rel={newTab ? 'noopener noreferrer' : undefined}
          onClick={() => handleClick()}
        >
          {content}
        </a>
      </div>
    );
  }

  // Default: non-link button that triggers action (openModal/scrollTo/etc.) or just button
  return (
    <div style={{ textAlign: align }}>
      <div onClick={(e) => handleClick(e)} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') handleClick(); }}>
        {content}
      </div>
    </div>
  );
};

export default Button;
