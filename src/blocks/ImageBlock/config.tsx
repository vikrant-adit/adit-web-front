'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import ImageBlock, { ImageBlockProps } from './component.client';

export const ImageBlockConfig: Omit<
  ComponentConfig<ImageBlockProps, ImageBlockProps>,
  'type'
> = {
  label: 'Image',
  fields: {
    image: {
      type: 'object',
      label: 'Image',
      objectFields: {
        src: { type: 'media', mediaType: 'image', label: 'Image File' },
        alt: { type: 'text', label: 'Alt Text' },
      },
    },
    width: { type: 'number', label: 'Width (px)' },
    height: { type: 'number', label: 'Height (px)' },
    borderRadius: { type: 'number', label: 'Border Radius (px)' },
    margin: { type: 'number', label: 'Margin (px)' },
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
    image: {
      src: '',
      alt: 'Placeholder Image',
    },
    width: 800,
    height: 400,
    borderRadius: 12,
  },
  render: (data) => <ImageBlock {...data} />,
};

export default ImageBlockConfig;

