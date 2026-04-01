'use client';

import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import TextAreaBlock, { TextAreaBlockProps } from './component.client';

export const TextAreaBlockConfig: Omit<
  ComponentConfig<TextAreaBlockProps, TextAreaBlockProps>,
  'type'
> = {
  label: 'Textarea',

  fields: {
    label: { type: 'text', label: 'Label' },
    placeholder: { type: 'text', label: 'Placeholder' },
    rows: { type: 'number', label: 'Rows' },
    required: { type: 'text', label: 'Required' },
    width: { type: 'text', label: 'Width (e.g., w-full or 400px)' },
    textColor: { type: 'text', label: 'Text Color (text-gray-900 or #222)' },
    backgroundColor: { type: 'text', label: 'Background (bg-gray-100 or #f3f3f3)' },
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
    label: 'Message',
    placeholder: 'Write your message…',
    rows: 4,
    required: false,
    width: 'w-full',
    textColor: 'text-gray-900',
    backgroundColor: 'bg-white',
  },

  render: (data) => <TextAreaBlock {...data} />,
};

export default TextAreaBlockConfig;
