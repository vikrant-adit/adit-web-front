'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import ProductSuiteHeroBlock, { ProductSuiteHeroProps } from './component.client';

export const ProductSuiteHeroConfig: Omit<
  ComponentConfig<ProductSuiteHeroProps, ProductSuiteHeroProps>,
  'type'
> = {
  label: 'Product Suite Hero',
  fields: {
    title: {
      type: 'text',
      label: 'Title',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },
    imageUrl: {
      type: 'media',
      mediaType: 'image',
      label: 'Hero Image',
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
    title: 'All Your Patient Communication in One Place',
    description: 'Patient communication is the secret to a smoother, more connected practice.',
    imageUrl: '',
    buttonText: 'Schedule a Demo',
    buttonLink: '/schedule-a-demo',
  },
  render: (data) => <ProductSuiteHeroBlock {...data} />,
};

export default ProductSuiteHeroConfig;
