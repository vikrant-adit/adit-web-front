'use client';

import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import FaqBlock, { FaqBlockProps } from './component.client';

export const FaqBlockConfig: Omit<
  ComponentConfig<FaqBlockProps, FaqBlockProps>,
  'type'
> = {
  label: 'FAQ Block',

  fields: {
    title: {
      type: 'text',
      label: 'Title',
    },

    items: {
      type: 'array',
      label: 'FAQ Items',
      arrayFields: {
        question: {
          type: 'text',
          label: 'Question',
        },
        answer: {
          type: 'textarea',
          label: 'Answer',
        },
      },
    },

    titleSize: {
      type: 'select',
      label: 'Title Size',
      options: [
        { label: 'Large (2xl)', value: 'text-2xl' },
        { label: 'Extra Large (3xl)', value: 'text-3xl' },
        { label: 'Huge (4xl)', value: 'text-4xl' },
      ],
    },

    spacing: {
      type: 'select',
      label: 'Item Spacing',
      options: [
        { label: 'Compact', value: 'space-y-2' },
        { label: 'Normal', value: 'space-y-4' },
        { label: 'Spacious', value: 'space-y-6' },
      ],
    },

    backgroundColor: {
      type: 'text',
      label: 'Background Color (Tailwind class)',
    },

    textColor: {
      type: 'text',
      label: 'Text Color (Tailwind class)',
    },

    borderColor: {
      type: 'text',
      label: 'Border Color (Tailwind class)',
    },

    isGlobal: {
      type: 'text',
      label: 'Set as Global',
    },

    globalKey: {
      type: 'text',
      label: 'Global Key',
    },
  },

  defaultProps: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'How long does it take to get fully set up?',
        answer: 'Getting you up and running on the Adit platform only takes 6 hours of your time...',
      },
      {
        question: 'Does this affect other software on my computer?',
        answer: 'No. The Adit application does not disrupt any existing software.',
      },
    ],
    titleSize: 'text-3xl',
    spacing: 'space-y-4',
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    borderColor: 'border-gray-200',
  },

  render: (props) => <FaqBlock {...props} />,
};

export default FaqBlockConfig;
