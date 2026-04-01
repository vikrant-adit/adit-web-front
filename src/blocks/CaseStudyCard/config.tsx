'use client';

import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import CaseStudyCard, {
  CaseStudyCardProps,
} from './component.client';

export const CaseStudyCardConfig: Omit<
  ComponentConfig<CaseStudyCardProps, CaseStudyCardProps>,
  'type'
> = {
  label: 'Case Study Card',

  fields: {
    image: {
      type: 'object',
      label: 'Image',
      objectFields: {
        src: {
          type: 'media',
          mediaType: 'image',
          label: 'Image File',
        },
        alt: {
          type: 'text',
          label: 'Alt Text',
        },
      },
    },

    category: {
      type: 'text',
      label: 'Category',
    },

    title: {
      type: 'text',
      label: 'Title',
    },

    description: {
      type: 'text',
      label: 'Description',
    },

    stats: {
      type: 'array',
      label: 'Stats',
      arrayFields: {
        value: {
          type: 'text',
          label: 'Value',
        },
        label: {
          type: 'text',
          label: 'Label',
        },
      },
    },

    link: {
      type: 'text',
      label: 'Slug (case-studies/...)',
    },
  },

  defaultProps: {
    title: 'Case Study Title',
    category: 'Healthcare',
    description:
      'Short description of the case study goes here.',
    stats: [
      { value: '30%', label: 'Growth' },
      { value: '2x', label: 'Leads' },
      { value: '45%', label: 'ROI' },
    ],
  },

  render: (data) => <CaseStudyCard {...data} />,
};

export default CaseStudyCardConfig;
