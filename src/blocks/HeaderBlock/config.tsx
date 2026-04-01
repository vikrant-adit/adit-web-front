'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import HeadingBlock, { HeadingBlockProps } from './component.client';

export const HeadingBlockConfig: Omit<
  ComponentConfig<HeadingBlockProps, HeadingBlockProps>,
  'type'
> = {
  label: 'Heading',
  fields: {
    text: { type: 'text', label: 'Text' },
    textColor: { type: 'text', label: 'Text Color (e.g. text-red-500 or #123456)' },
   isGlobal: {
  type: 'text',
  label: 'Set as Global',
},

globalKey: {
  type: 'text',
  label: 'Global Component Key',
},
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    fontSize: {
      type: 'text',
      label: 'Font Size (e.g., text-2xl or 24px)',
    },
  },
  defaultProps: {
    text: 'Sample Heading',
    align: 'center',
    textColor: '#000000', // use textColor (was `color` before)
    fontSize: '2rem',
  },
  render: (data) => <HeadingBlock {...data} />,
};

export default HeadingBlockConfig;

