/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import SupportFeatures, { SupportFeaturesProps } from './component.client';

// Use uploaded file as default placeholder image

export const SupportFeaturesConfig: Omit<ComponentConfig<SupportFeaturesProps, SupportFeaturesProps>, 'type'> = {
  label: 'Support Features Grid',

  fields: {
    backgroundColor: {
      type: 'text',
      label: 'Background Color (Hex or Tailwind class)',
    },

    features: {
      type: 'array',
      label: 'Feature Cards',
      arrayFields: {
        title: { type: 'text', label: 'Title' },
        description: { type: 'textarea', label: 'Description' },
        role: { type: 'text', label: 'Role' },
        // media field - editor will return string or object
        image: { type: 'media', mediaType: 'image', label: 'Icon/Image' },
        imageAlt: { type: 'text', label: 'Alt Text' },
      },
      getItemSummary: (item: any) => item.title || item.imageAlt || 'Feature',
      min: 0,
      max: 50,
      // FIX: Commenting out defaultItemProps prevents the "Shared Reference" bug.
      // When this is an object, the editor often passes the SAME reference to every new item.
      // defaultItemProps: {
      //   title: 'New feature',
      //   description: 'Describe this feature...',
      //   image: DEFAULT_FEATURE_IMAGE,
      //   imageAlt: 'Feature icon',
      // },
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
    backgroundColor: 'transparent',
    features: [
      {
        id: 1,
        title: 'Reliable support',
        description: '24/7 support from our experienced team.',
        imageAlt: 'support',
      },
    ],
  },

  render: (data) => {
    // Deep clone the data to ensure we don't mutate the editor's internal state accidentally
    const normalized: any = JSON.parse(JSON.stringify(data));

    if (Array.isArray(normalized.features)) {
      normalized.features = normalized.features.map((it: any, index: number) => {
        const item = { ...it };

        // If editor returned a media object, normalize to a string path
        if (item?.image && typeof item.image === 'object') {
          item.image =
            item.image.url ||
            item.image.src ||
            item.image.data?.attributes?.url ||
            item.image.attributes?.url ||
            item.image;
        }

        // Ensure an id exists for React key stability
        // Using a combination of timestamp or random if ID is missing is safer than just index
        // but for display purposes, we ensure 'id' is a string.
        item.id = item.id ?? `feature-${index}-${Date.now()}`;

        // map to the component prop naming expected: imageSrc + imageAlt
        item.imageSrc = item.image ?? '';
        item.imageAlt = item.imageAlt ?? item.alt ?? '';

        return item;
      });
    } else {
      normalized.features = normalized.features || [];
    }

    return <SupportFeatures {...(normalized as SupportFeaturesProps)} />;
  },
};

export default SupportFeaturesConfig;

