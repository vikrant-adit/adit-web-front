'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import FeatureHero, { FeatureHeroProps } from './component.client';

export const FeatureHeroConfig: ComponentConfig<FeatureHeroProps> = {
  label: 'Feature Hero (Screenshot)',
  fields: {
    iconUrl:{
      type: 'object',
      label: 'Image',
      objectFields: {
        src: { type: 'media', mediaType: 'image', label: 'Image File' },
        alt: { type: 'text', label: 'Alt Text' },
      },
    },
    title: { type: 'text', label: 'Title' },
    description: { type: 'textarea', label: 'Description (HTML allowed)' },
    image: {
      type: 'object',
      label: 'Image',
      objectFields: {
        src: { type: 'media', mediaType: 'image', label: 'Image File' },
        alt: { type: 'text', label: 'Alt Text' },
      },
    },
    background: {
      type: 'text',
      label: 'Background (CSS color or Tailwind class)',
    //   description: "Examples: '#06a6d6' or 'bg-sky-500'",
    },
    position: {
      type: 'select',
      label: 'Position',
      options: [
        { label: 'Relative (Normal Flow)', value: 'relative' },
        { label: 'Absolute (Positioned)', value: 'absolute' },
        { label: 'Fixed (Sticky on top)', value: 'fixed' },
      ],
    },
    className: { type: 'text', label: 'Additional CSS Classes' },
    zIndex: { type: 'number', label: 'Z-index' },
  },
  defaultProps: {
    iconUrl: {
      src: '', // picked from media gallery in builder
      alt: 'Feature illustration',
    },
    title: 'All-In-One VOIP Phone System To Centralize Patient Communication',
    description:
      '<p>All-in-one VOIP phone system to centralize patient communication, improve call management and streamline care.</p>',
    image: {
      src: '', // picked from media gallery in builder
      alt: 'Feature illustration',
    },
    background: '#14a0d8',
    position: 'relative',
    className: '',
    zIndex: 50,
  },
  render: (props) => <FeatureHero {...props} />,
};

export default FeatureHeroConfig;


