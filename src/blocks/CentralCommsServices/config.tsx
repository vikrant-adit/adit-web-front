'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import CentralCommsServicesBlock, { CentralCommsServicesProps } from './component.client';

export const CentralCommsServicesConfig: Omit<
  ComponentConfig<CentralCommsServicesProps, CentralCommsServicesProps>,
  'type'
> = {
  label: 'Central Comms Services',
  fields: {
    heading: {
      type: 'text',
      label: 'Section Heading',
    },
    items: {
      type: 'array',
      label: 'Service Items',
      arrayFields: {
        title: { type: 'text', label: 'Service Title' },
        description: { type: 'textarea', label: 'Description' },
        route: { type: 'text', label: 'Link Route' },
      },
      getItemSummary: (it: any) => it?.title || 'Service Item',
      max: 20,
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
    heading: 'Our Services',
    items: [],
  },
  render: (data) => <CentralCommsServicesBlock {...data} />,
};

export default CentralCommsServicesConfig;
