/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import TasksBlock, { TasksBlockProps } from './component.client';

export const TasksBlockConfig: Omit<
  ComponentConfig<TasksBlockProps, TasksBlockProps>,
  'type'
> = {
  label: 'Tasks Block',
  fields: {
    title: {
      type: 'textarea',
      label: 'Main Title',
    },
    subtitle: {
      type: 'textarea',
      label: 'Subtitle / Description',
    },
    items: {
      type: 'array',
      label: 'Task Items',
      arrayFields: {
        id: { type: 'text', label: 'Item ID' },
        title: { type: 'text', label: 'Title' },
        description: { type: 'textarea', label: 'Description' },
        features: {
          type: 'array',
          label: 'Features',
          arrayFields: {
            value: { type: 'textarea', label: 'Feature Text' },
          },
          getItemSummary: (it: any) => it?.value || 'Feature',
          max: 20,
        },
        image: {
          type: 'media',
          mediaType: 'image',
          label: 'Item Image',
        },
      },
      getItemSummary: (it: any) => it?.title || 'Task Item',
      max: 20,
    },
    ctaText: {
      type: 'text',
      label: 'CTA Button Text',
    },
    ctaLink: {
      type: 'text',
      label: 'CTA Button Link',
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
    title: 'Stay on top of every task, every time',
    subtitle:
      "No more sticky notes or spreadsheets. Adit's tasks helps your team create, assign, and complete work all from a single, integrated platform.",
    items: [],
    ctaText: 'Schedule a Demo',
    ctaLink: '/schedule-a-demo',
  },
  render: (data) => <TasksBlock {...data} />,
};

export default TasksBlockConfig;
