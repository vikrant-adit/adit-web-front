'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import FinalCTABlock, { FinalCTABlockProps } from './component.client';

export const FinalCTABlockConfig: Omit<
  ComponentConfig<FinalCTABlockProps, FinalCTABlockProps>,
  'type'
> = {
  label: 'FinalCTABlock',
  fields: {
    title: {
      type: 'text',
      label: 'Title',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },
    buttonText: {
      type: 'text',
      label: 'Button Text',
    },
    buttonLink: {
      type: 'text',
      label: 'Button Link',
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
    title: 'Ready to simplify and grow your practice?',
    description: 'Adit\'s all-in-one platform brings together the tools you need to simplify patient communication and reduce busywork.',
    buttonText: 'Book a Demo',
    buttonLink: '#',
  },
  render: (data) => <FinalCTABlock {...data} />,
};

export default FinalCTABlockConfig;
