/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export interface FormCheckboxProps {
  id?: string;
  name?: string;
  label?: string;               // label text (if omitted, label can be hidden)
  showLabel?: boolean;          // whether to render label (default true)
  optional?: boolean;           // show "(optional)" next to label
  checked?: boolean;            // controlled checked
  defaultChecked?: boolean;     // uncontrolled default
  disabled?: boolean;
  required?: boolean;
  width?: string;               // 'w-full' or '200px'
  textColor?: string;           // 'text-sky-600' or '#1e40af'
  backgroundColor?: string;     // 'bg-white' or '#fff'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelPlacement?: 'right' | 'left'; // where label appears relative to checkbox
  className?: string;           // extra classes for wrapper

  isGlobal?: boolean;
  globalKey?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  id,
  name,
  label = 'Label',
  showLabel = true,
  optional = false,
  checked,
  defaultChecked,
  disabled = false,
  required = false,
  width = 'w-full',
  textColor = '',
  backgroundColor = '',
  onChange,
  labelPlacement = 'right',
  className = '',
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  const generatedId = React.useMemo(
    () => id ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`,
    [id]
  );

  const isTwWidth = width?.startsWith?.('w-');
  const isTwText = textColor?.startsWith?.('text-');
  const isTwBg = backgroundColor?.startsWith?.('bg-');

  const inlineStyle: React.CSSProperties = {};
  if (!isTwWidth && width) inlineStyle.width = width;
  if (!isTwText && textColor) inlineStyle.color = textColor;
  if (!isTwBg && backgroundColor)
    inlineStyle.backgroundColor = backgroundColor;

  const wrapperClasses = [
    'flex items-center gap-2 my-2',
    labelPlacement === 'left'
      ? 'flex-row-reverse justify-between'
      : '',
    isTwWidth ? width : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    'select-none text-sm',
    isTwText ? textColor : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
      <div className={`px-3 sm:px-0 ${wrapperClasses}`} style={inlineStyle}>
        <div className="flex items-center gap-2">
          <input
            id={generatedId}
            name={name}
            type="checkbox"
            aria-label={label}
            aria-required={required || undefined}
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            className={[
              'h-4 w-4 rounded border',
              'accent-sky-600',
              disabled
                ? 'opacity-60 cursor-not-allowed'
                : 'cursor-pointer',
            ]
              .filter(Boolean)
              .join(' ')}
          />

          {showLabel && (
            <label htmlFor={generatedId} className={labelClasses}>
              <span>{label}</span>
              {optional && (
                <span className="ml-2 text-xs text-gray-500">
                  (optional)
                </span>
              )}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCheckbox;
