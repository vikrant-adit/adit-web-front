'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import CaseStudyBlock, { CaseStudyBlockProps } from './component.client';

export const CaseStudyBlockConfig: Omit<
  ComponentConfig<CaseStudyBlockProps, CaseStudyBlockProps>,
  'type'
> = {
  label: 'Case Study Highlight',
  fields: {
    title: {
      type: 'textarea',
      label: 'Title',
    },
    highlightedName: {
      type: 'text',
      label: 'Highlighted Name (part of title to bold)',
    },
    highlightedStat: {
      type: 'text',
      label: 'Highlighted Stat (e.g., "40%")',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },
    readMoreLink: {
      type: 'text',
      label: 'Read More Link',
    },
    stats: {
      type: 'array',
      label: 'Statistics',
      arrayFields: {
        value: { type: 'text', label: 'Value' },
        unit: { type: 'text', label: 'Unit (%, hours, etc)' },
        unitSecondary: { type: 'text', label: 'Unit Secondary' },
        label: { type: 'text', label: 'Label' },
      },
      getItemSummary: (it: any) => `${it?.value}${it?.unit || ''} - ${it?.label || ''}`,
      max: 10,
    },
    imageUrl: {
      type: 'media',
      mediaType: 'image',
      label: 'Case Study Image',
    },
    imageAlt: {
      type: 'text',
      label: 'Image Alt Text',
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
    title: 'See how this case study boosted results',
    description: 'Description of the case study...',
    stats: [],
    buttonText: 'Download Case Study',
    buttonLink: '#',
  },
  render: (data) => <CaseStudyBlock {...data} />,
};

export default CaseStudyBlockConfig;
