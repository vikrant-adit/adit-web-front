/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export interface ParagraphBlockProps {
  text?: string;
  align?: 'left' | 'center' | 'right';
  size?: number;
  color?: string;

  // NEW padding controls
  paddingMobile?: string;   // e.g. "px-3"
  paddingTablet?: string;   // e.g. "sm:px-6"
  paddingDesktop?: string;  // e.g. "md:px-10"

  isGlobal?: boolean;
  globalKey?: string;
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = ({
  text = 'Your paragraph text goes here...',
  align = 'left',
  size = 16,
  color = '',

  paddingMobile = 'px-3',
  paddingTablet = 'sm:px-6',
  paddingDesktop = 'md:px-10',

  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  // alignment -> safe tailwind class
  const alignClass =
    align === 'left'
      ? 'text-left'
      : align === 'right'
      ? 'text-right'
      : 'text-center';

  // determine if color is a tailwind class
  const isTailwindColor =
    typeof color === 'string' && color.trim().startsWith('text-');

  // responsive font size logic
  const responsiveSize =
    typeof size === 'number' && size > 16
      ? 'text-sm sm:text-base md:text-lg'
      : 'text-xs sm:text-sm md:text-base';

  // build className
  const className = [
    'my-2',
    paddingMobile,
    paddingTablet,
    paddingDesktop,
    alignClass,
    isTailwindColor ? color : 'text-gray-700',
    responsiveSize,
  ]
    .filter(Boolean)
    .join(' ');

  // inline style
  const inlineStyle: React.CSSProperties = {};
  if (!isTailwindColor && color) inlineStyle.color = color as any;
  if (typeof size === 'number') inlineStyle.fontSize = `${size}px`;

  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
      <p className={className} style={inlineStyle}>
        {text}
      </p>
    </div>
  );
};

export default ParagraphBlock;
