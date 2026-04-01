// blocks/ReviewContainer/config.tsx
'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import ReviewContainerClient, { ReviewContainerProps } from './component.client';

export const ReviewContainerConfig: Omit<ComponentConfig<ReviewContainerProps, ReviewContainerProps>, 'type'> = {
  label: 'Review Container',
  fields: {
    items: {
      type: 'array',
      label: 'Review Cards',
      arrayFields: {
        title: { type: 'text', label: 'Title' },
        subtitle: { type: 'text', label: 'Subtitle' },
        rating: { type: 'number', label: 'Rating (e.g. 4.6)' },
        maxStars: { type: 'number', label: 'Max Stars' },
        starSize: { type: 'number', label: 'Star Size (px)' },
        starColor: { type: 'text', label: 'Star Color (hex)' },
        iconSrc: { type: 'media', mediaType: 'image', label: 'Icon / Logo' },
        iconAlt: { type: 'text', label: 'Icon Alt' },
        href: { type: 'text', label: 'Link' },
      },
      getItemSummary: (it: any) => (it?.title ?? it?.label ?? 'Review'),
      max: 12,
    },

    gap: { type: 'number', label: 'Gap between cards (px)' },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    wrap: {
      type: 'radio',
      label: 'Wrap on small screens',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
     isGlobal: {
      type: "text",
      label: "Set as Global",
    },

    globalKey: {
      type: "text",
      label: "Global Component Key",
    },
  },

  defaultProps: {
    items: [
      {
        title: 'Software Advice',
        subtitle: '4.6 rating',
        rating: 4.6,
        maxStars: 5,
        starSize: 18,
        starColor: '#F5A623',
        iconSrc: '',
        iconAlt: 'Software Advice',
        href: '',
      },
      {
        title: 'G2',
        subtitle: '4.7 rating',
        rating: 4.7,
        maxStars: 5,
        starSize: 18,
        starColor: '#F5A623',
        iconSrc: '',
        iconAlt: 'G2',
        href: '',
      },
      {
        title: 'Capterra',
        subtitle: '4.6 rating',
        rating: 4.6,
        maxStars: 5,
        starSize: 18,
        starColor: '#F5A623',
        iconSrc: '',
        iconAlt: 'Capterra',
        href: '',
      },
    ],
    gap: 24,
    align: 'center',
    wrap: true,
  },

  render: (data) => {
    // normalize items array (builder returns { field: {value}} shapes sometimes)
    const normalized: any = { ...data };
    if (Array.isArray(normalized.items)) {
      normalized.items = normalized.items.map((it: any) => ({
        title: it?.title?.value ?? it?.title ?? it?.label ?? '',
        subtitle: it?.subtitle?.value ?? it?.subtitle ?? '',
        rating: (it?.rating?.value ?? it?.rating) ? Number(it.rating?.value ?? it.rating) : 0,
        maxStars: (it?.maxStars?.value ?? it?.maxStars) ? Number(it.maxStars?.value ?? it.maxStars) : 5,
        starSize: (it?.starSize?.value ?? it?.starSize) ? Number(it.starSize?.value ?? it.starSize) : 18,
        starColor: it?.starColor?.value ?? it?.starColor ?? '#F5A623',
        iconSrc: it?.iconSrc?.value ?? it?.iconSrc ?? '',
        iconAlt: it?.iconAlt?.value ?? it?.iconAlt ?? '',
        href: it?.href?.value ?? it?.href ?? '',
      }));
    } else {
      normalized.items = [];
    }

    // coerce wrap value (radio may return object)
    const coerceBool = (v: any) => {
      if (v === true || v === 'true') return true;
      if (v === false || v === 'false') return false;
      if (v && typeof v === 'object' && 'value' in v) return v.value === true || v.value === 'true';
      return Boolean(v);
    };

    normalized.wrap = coerceBool(normalized.wrap ?? true);
    normalized.gap = Number(normalized.gap ?? 24);
    normalized.align = normalized.align ?? 'center';

    return <ReviewContainerClient {...normalized} />;
  },
};

export default ReviewContainerConfig;


