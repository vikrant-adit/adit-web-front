'use client';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import CaseStudySlider, {
  CaseStudySliderProps,
} from './component.client';

export const CaseStudySliderConfig: Omit<
  ComponentConfig<CaseStudySliderProps, CaseStudySliderProps>,
  'type'
> = {
  label: 'Case Studies Slider',

  fields: {
    items: {
      type: 'array',
      label: 'Case Study Cards',
      arrayFields: {
        // ✅ FLAT media field (no object nesting)
        imageSrc: {
          type: 'media',
          mediaType: 'image',
          label: 'Logo Image',
        },
        imageAlt: {
          type: 'text',
          label: 'Image Alt Text',
        },

        description: { type: 'text', label: 'Description' },
        highlight: { type: 'text', label: 'Highlight Text' },
        linkText: { type: 'text', label: 'Link Text' },
        linkUrl: { type: 'text', label: 'Link URL' },
        accentColor: {
          type: 'text',
          label: 'Accent Color (hex)',
        },
      },

      getItemSummary: (it: any) =>
        it?.description?.slice(0, 30) || 'Case Study',
    },

    autoScroll: {
      type: 'radio',
      label: 'Auto Scroll',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    autoScrollInterval: {
      type: 'number',
      label: 'Auto Scroll Interval (ms)',
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
    autoScroll: true,
    autoScrollInterval: 3500,
    items: [
      {
        description:
          'Dedicated Dentistry grew to $1.6M in revenue by making data-driven decisions with',
        highlight: 'Practice Analytics',
        linkText: 'Read More',
        accentColor: '#0ea5e9',
      },
      {
        description:
          'Arnold Dentistry reduced administrative workload by 75% using',
        highlight: 'Adit VoIP',
        linkText: 'Read More',
        accentColor: '#f59e0b',
      },
    ],
  },

  /**
   * 🔁 Reconstruct image object ONCE
   * Clean, predictable, no deep nesting
   */
  render: (props: any) => {
    const items =
      Array.isArray(props.items)
        ? props.items.map((it: any) => ({
            ...it,
            image: it.imageSrc
              ? {
                  src: it.imageSrc,
                  alt: it.imageAlt || '',
                }
              : undefined,
          }))
        : [];

    return <CaseStudySlider {...props} items={items} />;
  },
};

export default CaseStudySliderConfig;
