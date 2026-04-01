'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import ParagraphBlock, { ParagraphBlockProps } from './component.client';

export const ParagraphBlockConfig: Omit<
  ComponentConfig<ParagraphBlockProps, ParagraphBlockProps>,
  'type'
> = {
  label: 'Paragraph',
  fields: {
    text: { type: 'textarea', label: 'Text' },

    color: {
      type: 'text',
      label: 'Text Color (e.g. text-red-500 or #123456)',
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

    size: {
      type: 'number',
      label: 'Font Size (px)',
    },

    // NEW padding fields
    paddingMobile: {
      type: 'text',
      label: 'Mobile Padding (e.g. px-3)',
    },
    paddingTablet: {
      type: 'text',
      label: 'Tablet Padding (e.g. sm:px-6)',
    },
    paddingDesktop: {
      type: 'text',
      label: 'Desktop Padding (e.g. md:px-10)',
    },

    isGlobal: {
      type: 'text',
      label: 'Set as Global',
    },

    globalKey: {
      type: 'text',
      label: 'Global Component Key',
    },
  },

  defaultProps: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    align: 'left',
    size: 16,
    color: 'text-gray-700',
    paddingMobile: 'px-3',
    paddingTablet: 'sm:px-6',
    paddingDesktop: 'md:px-10',
  },

  render: (data) => <ParagraphBlock {...data} />,
};

export default ParagraphBlockConfig;
