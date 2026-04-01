// File: FeatureVideo.config.tsx
'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import FeatureVideo, { FeatureVideoProps } from './component.client';

export const FeatureVideoConfig: ComponentConfig<FeatureVideoProps> = {
  label: 'Feature Video (Video + Text)',
  fields: {
    title: { type: 'text', label: 'Title' },
    titleSize: { type: 'text', label: 'Title Size (e.g. text-3xl or 36px)' },
    titleColor: { type: 'text', label: 'Title Color (e.g. text-sky-600 or #123456)' },
    description: { type: 'textarea', label: 'Description (HTML allowed)' },

    buttonText: { type: 'text', label: 'Button Text' },
    buttonUrl: { type: 'text', label: 'Button URL' },

    video: {
      type: 'object',
      label: 'Video / Embed',
      objectFields: {
        src: { type: 'text', label: 'Video URL or Embed iframe string (e.g. Vimeo embed URL or raw <iframe>)' },
        poster: { type: 'media', mediaType: 'image', label: 'Poster Image' },
      },
    },

    videoPosition: {
      type: 'select',
      label: 'Video Position',
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
    gap: { type: 'number', label: 'Gap (px)' },

    // video controls
    // controls: { type: 'boolean', label: 'Show controls', default: true },
    // autoplay: { type: 'boolean', label: 'Autoplay', default: false },
    // loop: { type: 'boolean', label: 'Loop', default: false },
    // muted: { type: 'boolean', label: 'Muted (recommended with autoplay)', default: false },

    // border options
  showBorder: { type: 'text', label: 'Show video border' },
    borderWidth: { type: 'number', label: 'Border width (px)' },
    borderColor: { type: 'text', label: 'Border color (e.g. border-sky-200 or #aabbcc)' },
    borderRadius: { type: 'text', label: 'Border radius classes (e.g. rounded-full or rounded-md)' },
    // sizing controls
    mediaPreset: {
      type: 'select',
      label: 'Media Size Preset',
      options: [
        { label: 'Small (320px)', value: 'small' },
        { label: 'Medium (520px)', value: 'medium' },
        { label: 'Large (820px)', value: 'large' },
        { label: 'Contain', value: 'contain' },
        { label: 'Cover (fixed height)', value: 'cover' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customMediaWidth: { type: 'text', label: 'Custom width (e.g. 400px or 50%)' },
    customMediaHeight: { type: 'text', label: 'Custom height (e.g. 225px). If empty, aspectRatio will be used.' },
    aspectRatio: { type: 'text', label: 'Aspect ratio (e.g. 16/9, 4/3, 1/1). Used when no custom height provided.' },

    padding: { type: 'text', label: 'Padding (Tailwind classes)' },
    background: { type: 'text', label: 'Background (Tailwind class or CSS color)'},
    position: {
      type: 'select',
      label: 'Section Position',
      options: [
        { label: 'Relative', value: 'relative' },
        { label: 'Absolute', value: 'absolute' },
        { label: 'Fixed', value: 'fixed' },
      ],
    },

    className: { type: 'text', label: 'Additional CSS classes' },
    zIndex: { type: 'number', label: 'Z-index' },
  },

  defaultProps: {
    title: 'Feature Video Title',
    titleSize: '36px',
    titleColor: 'text-slate-900',
    description: '<p>Your video description here.</p>',
    buttonText: '',
    buttonUrl: '#',
    video: { src: '', poster: '' },
    videoPosition: 'right',
    layout: 'grid',
    flexDirection: 'row',
    gap: 32,
    controls: true,
    autoplay: false,
    loop: false,
    muted: false,
    showBorder: false,
    borderWidth: 4,
    borderColor: 'border-sky-200',
    borderRadius: 'rounded-full',
    mediaPreset: 'medium',
    customMediaWidth: '',
    customMediaHeight: '',
    aspectRatio: '16/9',
    padding: 'py-16 px-6',
    background: '#ffffff',
    position: 'relative',
    className: '',
    zIndex: 10,
  },

  render: (props) => <FeatureVideo {...props} />,
};

export default FeatureVideoConfig;


