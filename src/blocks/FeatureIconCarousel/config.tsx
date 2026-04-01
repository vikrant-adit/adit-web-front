'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import FeatureIconCarousel, {
  FeatureIconCarouselProps,
} from './component.client';

export const FeatureIconCarouselConfig: Omit<
  ComponentConfig<FeatureIconCarouselProps, FeatureIconCarouselProps>,
  'type'
> = {
  label: 'Feature Icon Carousel',

  fields: {
    items: {
      type: 'array',
      label: 'Items',
      arrayFields: {
        title: { type: 'text', label: 'Title' },
        iconImage: { type: 'media', mediaType: 'image', label: 'Icon' },
        iconAlt: { type: 'text', label: 'Icon Alt Text' },
      },
    },
    showArrows: { type: 'text', label: 'Show Arrows' },
    backgroundColor: {
      type: 'text',
      label: 'Section Background (Tailwind class or hex/rgb)',
    },
    cardBorderColor: {
      type: 'text',
      label: 'Card Border Color (Tailwind class or hex/rgb)',
    },
    iconColor: {
      type: 'text',
      label: 'Icon Color (Tailwind class or hex/rgb)',
    },
  },

  defaultProps: {
    items: [
      { title: 'Reminder' },
      { title: 'Patient Recall' },
      { title: 'Adit Pay' },
      { title: 'Practice Analytics' },
      { title: 'Health Score' },
      { title: 'Digital Marketing' },
    ],
    showArrows: true,
    backgroundColor: 'bg-white',
    cardBorderColor: 'border-sky-200',
    iconColor: 'text-slate-800',
  },

  render: (data) => {
    const normalized: any = { ...data };

    if (Array.isArray(normalized.items)) {
      normalized.items = normalized.items.map((item: any) => {
        const nextItem = { ...item };
        if (nextItem.iconImage && typeof nextItem.iconImage === 'object' && 'url' in nextItem.iconImage) {
          nextItem.iconImage = {
            src: nextItem.iconImage.url,
            alt: nextItem.iconImage.name || nextItem.iconAlt || '',
          };
        } else if (typeof nextItem.iconImage === 'string') {
          nextItem.iconImage = { src: nextItem.iconImage, alt: nextItem.iconAlt || '' };
        }
        return nextItem;
      });
    }

    return <FeatureIconCarousel {...(normalized as FeatureIconCarouselProps)} />;
  },
};

export default FeatureIconCarouselConfig;
