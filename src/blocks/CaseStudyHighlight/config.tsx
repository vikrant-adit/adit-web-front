'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import CaseStudyHighlightList, {
  CaseStudyHighlightListProps,
} from './component.client';

export const CaseStudyHighlightListConfig: Omit<
  ComponentConfig<CaseStudyHighlightListProps, CaseStudyHighlightListProps>,
  'type'
> = {
  label: 'Case Study Highlights (List)',

  fields: {
    items: {
      type: 'array',
      label: 'Case Studies',
      arrayFields: {
        title: { type: 'text', label: 'Title' },
        highlightedName: { type: 'text', label: 'Highlighted Name' },
        highlightedStat: { type: 'text', label: 'Highlighted Stat' },
        description: { type: 'textarea', label: 'Description' },
        readMoreLink: { type: 'text', label: 'Read More Link' },

        stats: {
          type: 'array',
          label: 'Stats',
          arrayFields: {
            value: { type: 'text', label: 'Value' },
            unitSecondary: { type: 'text', label: 'Prefix' },
            unit: { type: 'text', label: 'Unit' },
            label: { type: 'text', label: 'Label' },
          },
        },

        imageUrl: {
          type: 'media',
          label: 'Image',
          mediaType: 'image',
        },

        imageAlt: { type: 'text', label: 'Image Alt Text' },
        buttonText: { type: 'text', label: 'Button Text' },
        buttonLink: { type: 'text', label: 'Button Link' },
      },
    },
  },

  defaultProps: {
    items: [
      {
        title: 'See how W. Stuart Dexter, DDS boosted patient retention',
        highlightedName: 'W. Stuart Dexter, DDS',
        highlightedStat: '40%',
        description:
          'Discover how leading dental practices are improving patient retention and engagement.',
        readMoreLink: '#',
        stats: [
          { value: '40', unit: '%', label: 'Increase in retention' },
          { value: '2', unit: 'x', label: 'More bookings' },
        ],
        imageUrl: '',
        imageAlt: 'Case study',
        buttonText: 'Download Case Study',
        buttonLink: '#',
      },
    ],
  },

  render: (props) => <CaseStudyHighlightList {...props} />,
};

export default CaseStudyHighlightListConfig;
