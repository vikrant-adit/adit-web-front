/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useMemo } from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import ReviewCard, { ReviewCardProps } from './component.client';

export const ReviewCardConfig: Omit<
  ComponentConfig<ReviewCardProps, ReviewCardProps>,
  'type'
> = {
  label: 'Review Card',
  fields: {
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'text', label: 'Subtitle' },
    rating: { type: 'number', label: 'Rating (e.g. 4.6)' },
    maxStars: { type: 'number', label: 'Max stars' },
    starSize: { type: 'number', label: 'Star size (px)' },
    starColor: { type: 'text', label: 'Star color (hex)' },
    iconSrc: { type: 'media', mediaType: 'image', label: 'Icon / Logo' },
    iconAlt: { type: 'text', label: 'Icon alt text' },
    href: { type: 'text', label: 'Link to reviews' },

    // NEW: control width/height separately
    iconWidth: { type: 'number', label: 'Icon width (px)' },
    iconHeight: { type: 'number', label: 'Icon height (px)' },
    // optional: constrain icon max width inside layout
    iconMaxWidth: { type: 'number', label: 'Icon max width (px)' },
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
    title: 'Capterra',
    subtitle: '4.6 rating',
    rating: 4.6,
    maxStars: 5,
    starSize: 18,
    starColor: '#F5A623',
    iconSrc: '',
    iconAlt: 'Logo',
    href: '',

    // NEW defaults
    iconWidth: 48,
    iconHeight: 48,
    iconMaxWidth: 80,
  },

  render: (data) => {
    // ensure unique key per instance to avoid shared image cache
    const uniqueKey = useMemo(() => crypto.randomUUID(), []);

    const normalized: any = { ...data };

    if (
      normalized.iconSrc &&
      typeof normalized.iconSrc === 'object' &&
      'url' in normalized.iconSrc
    ) {
      // append unique query param to differentiate each image reference
      normalized.iconSrc = `${normalized.iconSrc.url}?v=${uniqueKey}`;
    }

    if (
      normalized.rating &&
      typeof normalized.rating === 'object' &&
      'value' in normalized.rating
    ) {
      normalized.rating = normalized.rating.value;
    }

    if (typeof normalized.rating === 'string') {
      const n = Number(normalized.rating);
      normalized.rating = Number.isFinite(n) ? n : normalized.rating;
    }

    return <ReviewCard {...(normalized as ReviewCardProps)} />;
  },
};

export default ReviewCardConfig;


