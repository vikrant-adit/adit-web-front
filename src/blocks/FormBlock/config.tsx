'use client';

import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import FormBlock, { FormBlockProps } from './component.client';

export const FormBlockConfig: Omit<
  ComponentConfig<FormBlockProps, FormBlockProps>,
  'type'
> = {
  label: 'Form Field',

  fields: {
    id: { type: 'text', label: 'ID (optional)' },
    label: { type: 'text', label: 'Label' },
    showLabel: { type: 'text', label: 'Show Label' },
    placeholder: { type: 'text', label: 'Placeholder' },

    type: {
      type: 'select',
      label: 'Field Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Number', value: 'number' },
        { label: 'Password', value: 'password' },
        { label: 'Phone', value: 'tel' },
        { label: 'Dropdown', value: 'select' },
      ],
    },

    required: { type: 'text', label: 'Required' },

    variant: {
      type: 'select',
      label: 'UI Variant',
      options: [
        { label: 'Box (default)', value: 'box' },
        { label: 'Underline', value: 'underline' },
        { label: 'Filled', value: 'filled' },
      ],
    },

    width: { type: 'text', label: 'Width (Tailwind class, e.g. w-full or w-64)' },
    textColor: { type: 'text', label: 'Text color (Tailwind, e.g. text-gray-700)' },
    backgroundColor: { type: 'text', label: 'Background (Tailwind, e.g. bg-white)' },

    options: { type: 'text', label: 'Dropdown options (comma separated)' },

    labelClass: { type: 'text', label: 'Extra label classes (Tailwind)' },
    inputClass: { type: 'text', label: 'Extra input classes (Tailwind)' },
      isGlobal: {
      type: "text",
      label: "Set as Global",
    },

    globalKey: {
      type: "text",
      label: "Global Key",
    },
  },

  defaultProps: {
    id: undefined,
    label: 'Your Name',
    showLabel: true,
    placeholder: 'Enter your name',
    type: 'text',
    required: false,
    variant: 'box',
    width: 'w-full',
    textColor: 'text-gray-900',
    backgroundColor: 'bg-white',
    options: '',
    labelClass: '',
    inputClass: '',
  },

  render: (props) => <FormBlock {...props} />,
};

export default FormBlockConfig;

