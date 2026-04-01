'use client';

import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import Carousel, { CarouselProps } from './component.client';

export const CarouselConfig: Omit<
  ComponentConfig<CarouselProps, CarouselProps>,
  'type'
> = {
  label: 'Carousel',

  fields: {
    items: {
      type: 'array',
      label: 'Carousel Items',
      arrayFields: {
        image: {
          type: 'text',   // 🔥 changed from media to text
          label: 'Image URL',
        },
        imageAlt: {
          type: 'text',
          label: 'Alt Text',
        },
        text: {
          type: 'textarea',
          label: 'Text',
        },
        name: {
          type: 'text',
          label: 'Name',
        },
        role: {
          type: 'text',
          label: 'Role',
        },
         office: {
          type: 'text',
          label: 'Office',
        },
      },
      defaultItemProps: {
        text: 'New testimonial',
        name: 'Name',
        role: 'Role',
        image: '',
        imageAlt: '',
      },
      getItemSummary: (it: any) =>
        it?.name || it?.text?.slice?.(0, 30) || 'Slide',
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
    items: [],
  },

  render: (props) => {
    return <Carousel {...props} />;
  },
};

export default CarouselConfig;
