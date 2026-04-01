/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import TimelineBlock, { TimelineBlockProps } from './component.client';

export const TimelineBlockConfig: Omit<ComponentConfig<TimelineBlockProps, TimelineBlockProps>, 'type'> =
  {
    label: 'Timeline Block',

    fields: {
      heading: {
        type: 'text',
        label: 'Heading',
      },

      description: {
        type: 'textarea',
        label: 'Description',
      },

      items: {
        type: 'array',
        label: 'Timeline Items',
        arrayFields: {
          year: {
            type: 'text',
            label: 'Year',
          },
          text: {
            type: 'textarea',
            label: 'Description',
          },
        },
      },

      initialYear: {
        type: 'text',
        label: 'Initial Year to Display',
      },

      backgroundColor: {
        type: 'text',
        label: 'Background Color (Tailwind class or hex/rgb)',
      },
    },

    defaultProps: {
      heading: 'The Adit story – heroes rarely do it alone',
      description:
        'Built over a decade alongside doctors, Adit focuses on removing operational friction so providers can focus on patient care.',
      items: [
        { year: '2012', text: 'Starting the journey' },
        { year: '2015', text: 'Specializing in Dental and Optometry' },
        { year: '2020', text: 'Launching Digital Forms and TeleMed' },
        { year: '2024', text: 'Expanding to Optometry industry' },
      ],
      initialYear: '2015',
      backgroundColor: 'bg-[#e8f9ff]',
    },

    render: (data) => {
      const normalized: any = { ...data };
      return <TimelineBlock {...(normalized as TimelineBlockProps)} />;
    },
  };

export default TimelineBlockConfig;
