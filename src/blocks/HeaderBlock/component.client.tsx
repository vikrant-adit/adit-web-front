/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export interface HeadingBlockProps {
  text?: string;
  align?: 'left' | 'center' | 'right';
  isGlobal?: boolean;
  globalKey?: string;
  level?: number; // h1–h6
  // Tailwind class OR raw color
  textColor?: string;
  // Tailwind class OR raw size
  fontSize?: string;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({
  text = 'Your Heading Here',
  textColor = '',
  align = 'center',
  fontSize = '',
  level = 1,
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  // ✅ FIX: Use React.ElementType instead of JSX namespace
  const Tag = (`h${Math.min(Math.max(level, 1), 6)}`) as React.ElementType;

  // Tailwind checks
  const isTailwindFontSize =
    typeof fontSize === 'string' && fontSize.trim().startsWith('text-');
  const isTailwindColor =
    typeof textColor === 'string' && textColor.trim().startsWith('text-');

  // Inline styles fallback
  const inlineStyle: React.CSSProperties = {};
  if (!isTailwindFontSize && fontSize) {
    inlineStyle.fontSize = fontSize as any;
  }
  if (!isTailwindColor && textColor) {
    inlineStyle.color = textColor as any;
  }

  // Alignment class
  const alignClass =
    align === 'left'
      ? 'text-left'
      : align === 'right'
      ? 'text-right'
      : 'text-center';

  // Class builder
  const className = [
    'font-bold',
    'my-1',
    'leading-tight',
    alignClass,
    isTailwindFontSize ? fontSize : '',
    !isTailwindFontSize && !fontSize
      ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
      : '',
    isTailwindColor ? textColor : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={className + (shouldGlow ? ' editor-global-glow' : '')}
      style={inlineStyle}
    >
      {text}
    </Tag>
  );
};

export default HeadingBlock;