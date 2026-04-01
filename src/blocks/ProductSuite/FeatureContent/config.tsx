// File: FeatureSplit.config.tsx
'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import FeatureSplit, { FeatureSplitProps } from './component.client';

export const FeatureSplitConfig: ComponentConfig<FeatureSplitProps> = {
  label: 'Feature Split (Text + Image)',
  fields: {
    title: { type: 'text', label: 'Title' },
    titleSize: { type: 'text', label: 'Title Size (e.g. text-3xl or 45px)' },
    titleColor: { type: 'text', label: 'Title Color (e.g. text-red-500 or #123456)' },
    description: { type: 'textarea', label: 'Description (HTML allowed)' },

    buttonText: { type: 'text', label: 'Button Text' },
    buttonUrl: { type: 'text', label: 'Button URL' },

    image: {
      type: 'object',
      label: 'Image',
      objectFields: {
        src: { type: 'media', mediaType: 'image', label: 'Image File' },
        alt: { type: 'text', label: 'Alt Text' },
      },
    },

    imagePosition: {
      type: 'select',
      label: 'Image Position',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },

    // layout controls
    layout: {
      type: 'select',
      label: 'Layout Mode',
      options: [
        { label: 'Grid (2 columns)', value: 'grid' },
        { label: 'Flex', value: 'flex' },
      ],
    },
    flexDirection: {
      type: 'select',
      label: 'Flex Direction (applies when Layout = Flex)',
      options: [
        { label: 'Row', value: 'row' },
        { label: 'Column', value: 'column' },
      ],
    },
    gap: {
      type: 'number',
      label: 'Gap (px)',
    },

    imagePreset: {
      type: 'select',
      label: 'Image Size Preset',
      options: [
        { label: 'Small (320px)', value: 'small' },
        { label: 'Medium (520px)', value: 'medium' },
        { label: 'Large (820px)', value: 'large' },
        { label: 'Contain', value: 'contain' },
        { label: 'Cover', value: 'cover' },
        { label: 'Custom', value: 'custom' },
      ],
    },

    customWidth: {
      type: 'text',
      label: 'Custom Width (only when Custom preset selected)',
    },

    // padding control (Tailwind classes)
    padding: {
      type: 'text',
      label: 'Padding (Tailwind classes, e.g. py-16 px-6)',
    },

    background: { type: 'text', label: 'Background Color or Tailwind Class' },
    position: {
      type: 'select',
      label: 'Section Position',
      options: [
        { label: 'Relative', value: 'relative' },
        { label: 'Absolute', value: 'absolute' },
        { label: 'Fixed', value: 'fixed' },
      ],
    },

    className: { type: 'text', label: 'Additional CSS Classes' },
    zIndex: { type: 'number', label: 'Z-index' },
  },

  defaultProps: {
    title: 'Say Goodbye to Missed Calls and Hello to Growth',
    titleSize: '45px',
    titleColor: 'text-slate-900',
    description: '<p>Manage calls, texts, and faxes with an easy VoIP phone system.</p>',

    buttonText: 'Optimize Your Practice',
    buttonUrl: '#',

    image: { src: '', alt: 'Feature Image' },
    imagePosition: 'right',

    layout: 'grid',
    flexDirection: 'row',
    gap: 32,
    padding: 'py-16 px-6',

    imagePreset: 'medium',
    customWidth: '520px',

    background: '#ffffff',
    position: 'relative',
    className: '',
    zIndex: 10,
  },

  render: (props) => <FeatureSplit {...props} />,
};

export default FeatureSplitConfig;


