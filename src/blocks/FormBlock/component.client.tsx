/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export interface FormBlockProps {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'select';
  required?: boolean;
  width?: string; // tailwind width class
  textColor?: string; // tailwind text class
  backgroundColor?: string; // tailwind bg class
  options?: string; // comma-separated values
  variant?: 'box' | 'underline' | 'filled';
  showLabel?: boolean;
  labelClass?: string;
  inputClass?: string;

  isGlobal?: boolean;
  globalKey?: string;
}

const FormBlock: React.FC<FormBlockProps> = ({
  id,
  label = 'Your Label',
  placeholder = '',
  type = 'text',
  required = false,
  width = 'w-full',
  textColor = 'text-gray-900',
  backgroundColor = '',
  options = '',
  variant = 'box',
  showLabel = true,
  labelClass = '',
  inputClass = '',
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  const generatedId = React.useMemo(
    () => id ?? `formfield-${Math.random().toString(36).slice(2, 9)}`,
    [id]
  );

  const optionList =
    options
      ?.split(',')
      ?.map((o) => o.trim())
      .filter(Boolean) || [];

  const variantInputClasses: Record<string, string> = {
    box: 'border rounded-md px-3 py-2 focus:ring-1 focus:ring-sky-300',
    underline: 'border-0 border-b px-0 py-2 rounded-none focus:border-b-2 focus:pb-1',
    filled: 'border rounded-md px-3 py-2 bg-gray-50 focus:ring-1 focus:ring-sky-300',
  };

  const baseInput =
    'block w-full outline-none transition-colors duration-150 ease-in-out';

  const inputClasses = [
    baseInput,
    variantInputClasses[variant] ?? variantInputClasses.box,
    width || 'w-full',
    textColor || '',
    variant === 'filled' && backgroundColor ? backgroundColor : '',
    inputClass || '',
  ]
    .filter(Boolean)
    .join(' ');

  const selectClasses = inputClasses;

  const labelClasses = [
    'block text-sm font-medium mb-1',
    textColor || '',
    labelClass || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
      <div className={`flex flex-col gap-1 my-2 px-3 sm:px-0 ${width ?? ''}`}>
        {showLabel && (
          <label htmlFor={generatedId} className={labelClasses}>
            {label} {required ? <span aria-hidden="true">*</span> : null}
          </label>
        )}

        {type === 'select' ? (
          <select
            id={generatedId}
            required={required}
            className={selectClasses}
          >
            <option value="">
              {placeholder || 'Select an option'}
            </option>
            {optionList.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={generatedId}
            type={type}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )}
      </div>
    </div>
  );
};

export default FormBlock;
