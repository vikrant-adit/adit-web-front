'use client';

import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import FormCheckbox, { FormCheckboxProps } from './component.client';

export const FormCheckboxConfig: Omit<
  ComponentConfig<FormCheckboxProps, FormCheckboxProps>,
  'type'
> = {
  label: 'Checkbox',

  fields: {
    label: { type: 'text', label: 'Label' },
    showLabel: { type: 'text', label: 'Show Label' },
    optional: { type: 'text', label: 'Show "(optional)"' },
    defaultChecked: { type: 'text', label: 'Default Checked' },
    disabled: { type: 'text', label: 'Disabled' },
    required: { type: 'text', label: 'Required' },

    width: { type: 'text', label: 'Width (w-full or 200px)' },
    textColor: { type: 'text', label: 'Text Color (text-sky-600 or #0ea5e9)' },
    backgroundColor: {
      type: 'text',
      label: 'Background (bg-white or #fff)',
    },

    labelPlacement: {
      type: 'select',
      label: 'Label Placement',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },

    name: { type: 'text', label: 'Input name (optional)' },
    id: { type: 'text', label: 'ID (optional)' },
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
    name: undefined,
    label: 'Opt me in for text messages!',
    showLabel: true,
    optional: false,
    defaultChecked: false,
    disabled: false,
    required: false,
    width: 'w-auto',
    textColor: 'text-sky-600',
    backgroundColor: 'bg-transparent',
    labelPlacement: 'right',
  },

  render: (props) => <FormCheckbox {...props} />,
};

export default FormCheckboxConfig;

