/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export interface TextAreaBlockProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  width?: string; // Tailwind (w-full) or raw ("400px")
  textColor?: string; // text-red-500 OR #000
  backgroundColor?: string; // bg-gray-100 OR #f4f4f4

  isGlobal?: boolean;
  globalKey?: string;
}

const TextAreaBlock: React.FC<TextAreaBlockProps> = ({
  label = 'Message',
  placeholder = '',
  rows = 4,
  required = false,
  width = 'w-full',
  textColor = '',
  backgroundColor = '',
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  const isTwWidth = width.startsWith('w-');
  const isTwText = textColor.startsWith('text-');
  const isTwBg = backgroundColor.startsWith('bg-');

  const inlineStyle: React.CSSProperties = {};
  if (!isTwWidth && width) inlineStyle.width = width;
  if (!isTwText && textColor) inlineStyle.color = textColor;
  if (!isTwBg && backgroundColor)
    inlineStyle.backgroundColor = backgroundColor;

  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
      <div className="flex flex-col gap-1 my-2 px-3 sm:px-0" style={inlineStyle}>
        {label && (
          <label className="font-medium text-sm sm:text-base">
            {label} {required ? '*' : ''}
          </label>
        )}

        <textarea
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={[
            'border rounded px-3 py-2 resize-y',
            isTwWidth ? width : '',
            isTwText ? textColor : '',
            isTwBg ? backgroundColor : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={inlineStyle}
        />
      </div>
    </div>
  );
};

export default TextAreaBlock;
