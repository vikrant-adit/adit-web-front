/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import LogoCarousel, { LogoCarouselProps } from './ccomponent.client';

export const LogoCarouselConfig: Omit<
  ComponentConfig<LogoCarouselProps, LogoCarouselProps>,
  'type'
> = {
  label: 'Logo Carousel',

  fields: {
    backgroundColor: {
      type: 'text',
      label: 'Background color (e.g. #E6F7FF)',
    },
    height: {
      type: 'text',
      label: 'Section height (e.g. auto, 120px)',
    },
    showArrows: {
      type: 'text', // Using 'text' as 'boolean' wasn't in your snippet, but switch to 'boolean' if supported
      label: 'Show navigation arrows (true/false)',
    },
    // New Fields
    imageBorder: {
        type: 'text',
        label: 'Image Border (CSS, e.g. "1px solid #ccc")',
    },
    imageShadow: {
        type: 'text',
        label: 'Image Box Shadow (CSS, e.g. "0 4px 6px rgba(0,0,0,0.1)")',
    },
    items: {
      type: 'array',
      label: 'Logos',
      arrayFields: {
        logo: {
          type: 'media',
          mediaType: 'image',
          label: 'Logo image',
        },
        alt: { type: 'text', label: 'Alt text' },
        href: { type: 'text', label: 'Link URL (optional)' },
      },
      getItemSummary: (it: any) => it?.alt || it?.href || 'Logo',
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
    backgroundColor: '#E6F7FF',
    height: 'auto',
    showArrows: true,
    items: [
      {
        logo: '/uploads/tracker.svg',
        alt: 'Tracker',
      }
    ],
  },

  render: (data) => {
    const normalized: any = { ...data };

    // 🔥 normalize media object -> string url
    if (Array.isArray(normalized.items)) {
      normalized.items = normalized.items.map((it: any) => {
        const item = { ...it };
        if (item?.logo && typeof item.logo === 'object') {
          item.logo =
            item.logo.url ||
            item.logo.src ||
            item.logo.data?.attributes?.url ||
            item.logo.attributes?.url ||
            item.logo;
        }
        return item;
      });
    } else {
      normalized.items = normalized.items || [];
    }

    return <LogoCarousel {...(normalized as LogoCarouselProps)} />;
  },
};

export default LogoCarouselConfig;

