/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import TasksBenefitsGrid, { TasksBenefitsGridProps } from './component.client';

export const TasksBenefitsGridConfig: Omit<
  ComponentConfig<TasksBenefitsGridProps, TasksBenefitsGridProps>,
  'type'
> = {
  label: 'Tasks Benefits Grid',

  fields: {
    heading: {
      type: 'text',
      label: 'Heading',
    },

    items: {
      type: 'array',
      label: 'Cards',
      arrayFields: {
        title: {
          type: 'text',
          label: 'Title',
        },
        description: {
          type: 'textarea',
          label: 'Description',
        },

        iconImage: {
          type: 'media',
          mediaType: 'image',
          label: 'Icon Image',
        },

        bgColor: {
          type: 'text',
          label: 'Card Background (Tailwind class or hex/rgb color)',
        },

        iconBgColor: {
          type: 'text',
          label: 'Icon Background (Tailwind class or hex/rgb color)',
        },
      },
    },
  },

  defaultProps: {
    heading: "Here is what Adit's Tasks does for your practice",
    items: [
      {
        title: 'Save time',
        description: 'by automating follow-ups and recurring workflows',
        bgColor: 'bg-amber-50',
        iconBgColor: 'bg-amber-500',
      },
    ],
  },

  render: (data) => {
    const normalized: any = { ...data };

    if (Array.isArray(normalized.items)) {
      normalized.items = normalized.items.map((item: any) => {
        const normalizedItem = { ...item };

        // Handle iconImage - convert media object to URL string
        if (
          normalizedItem.iconImage &&
          typeof normalizedItem.iconImage === 'object' &&
          'url' in normalizedItem.iconImage
        ) {
          normalizedItem.iconImage = {
            src: normalizedItem.iconImage.url,
            alt: normalizedItem.iconImage.name || '',
          };
        } else if (typeof normalizedItem.iconImage === 'string') {
          normalizedItem.iconImage = {
            src: normalizedItem.iconImage,
            alt: '',
          };
        }

        return normalizedItem;
      });
    }

    return <TasksBenefitsGrid {...(normalized as TasksBenefitsGridProps)} />;
  },
};

export default TasksBenefitsGridConfig;
