/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import ImageCarousel, { ImageCarouselProps } from './component.client';

// Use the screenshot user provided as default slide (local path)
const DEFAULT_IMAGE_PATH = '/mnt/data/4a40d4a3-baba-486e-b58f-b9816139a797.png';



export const ImageCarouselConfig: Omit<ComponentConfig<ImageCarouselProps, ImageCarouselProps>, 'type'> = {
  label: 'Image Carousel',
  fields: {
    // title + subtitle above carousel
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'text', label: 'Subtitle' },
    titleColor: { type: 'text', label: 'Title color (css or Tailwind)' },
    titleAlign: { type: 'select', label: 'Title alignment', options: [{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }] },
    titleSize: { type: 'number', label: 'Title size (px)' },

    images: {
      type: 'array',
      label: 'Slides (images)',
      arrayFields: {
        src: { type: 'media', mediaType: 'image', label: 'Image' },
        alt: { type: 'text', label: 'Alt text' },
        caption: { type: 'text', label: 'Caption / Title' },
        href: { type: 'text', label: 'Wrap image with link (href)' },
        buttonText: { type: 'text', label: 'Button text (optional)' },
        buttonLink: { type: 'text', label: 'Button link (optional)' },
        buttonNewTab: { type: 'text', label: 'Open button/link in new tab' },
      },
      getItemSummary: (it: any) => it?.caption || it?.alt || 'Slide',
      min: 0,
      max: 20,
      defaultItemProps: {
        src: '',
        alt: '',
        caption: '',
        href: '',
        buttonText: '',
        buttonLink: '',
        buttonNewTab: false,
      },
    },

    // appearance
    backgroundColor: { type: 'text', label: 'Background color (Tailwind class or CSS color)',  },
    fontColor: { type: 'text', label: 'Font color (CSS or Tailwind text-*)' },

    // controls
    showIndex: { type: 'text', label: 'Show slide index (1 / N)', },
    showDots: { type: 'text', label: 'Show pagination dots' },

    autoplay: { type: 'text', label: 'Autoplay' },
    autoplayInterval: { type: 'number', label: 'Autoplay interval (ms)' },

    maxHeight: { type: 'number', label: 'Max slide height (px)' },
    gap: { type: 'number', label: 'Gap between slides (px)' },
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
    title: 'Workflow automations designed for enterprise scalability',
    subtitle: 'Digital forms + patient cards + online scheduling + reminders + Adit Pay',
    titleColor: '#ffffff',
    titleAlign: 'center',
    titleSize: 28,
    images: [
      {
        src: DEFAULT_IMAGE_PATH,
        alt: 'slide 1',
        caption: 'Enterprise-grade digital patient forms',
        href: '',
        buttonText: '',
        buttonLink: '',
        buttonNewTab: false,
      },
      {
        src: DEFAULT_IMAGE_PATH,
        alt: 'slide 2',
        caption: 'Increase new patient flow with online scheduling',
        href: '',
        buttonText: '',
        buttonLink: '',
        buttonNewTab: false,
      },
    ],
    backgroundColor: 'transparent',
    fontColor: '#0f172a',
    showIndex: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 4000,
    maxHeight: 320,
    gap: 24,
  },

  render: (data) => {
    const normalized: any = { ...data };

    // Normalize media objects in images -> src string
    if (Array.isArray(normalized.images)) {
      normalized.images = normalized.images.map((it: any) => {
        const item = { ...it };
        if (item?.src && typeof item.src === 'object') {
          item.src =
            item.src.url ||
            item.src.src ||
            item.src.data?.attributes?.url ||
            item.src.attributes?.url ||
            item.src;
        }
        return item;
      });
    } else {
      normalized.images = normalized.images || [];
    }

    return <ImageCarousel {...(normalized as ImageCarouselProps)} />;
  },
};

export default ImageCarouselConfig;


