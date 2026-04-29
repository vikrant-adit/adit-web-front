/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import AllStepsBlock, { AllStepsBlockProps } from './component.client';
import { buildImageUrl } from '@/lib/defaults';

export const AllStepsBlockConfig: Omit<
  ComponentConfig<AllStepsBlockProps, AllStepsBlockProps>,
  'type'
> = {
  label: 'All Steps Block',

  fields: {
    steps: {
      type: 'array',
      label: 'Feature Steps',
      arrayFields: {
        step: {
          type: 'number',
          label: 'Step Number',
        },

        tag: {
          type: 'text',
          label: 'Feature Tag',
        },

        title: {
          type: 'text',
          label: 'Step Title',
        },

        cards: {
          type: 'array',
          label: 'Feature Cards',
          arrayFields: {
            image: {
              type: 'media',
              mediaType: 'image',
              label: 'Card Image',
            },

            alt: {
              type: 'text',
              label: 'Image Alt Text',
            },

            caption: {
              type: 'textarea',
              label: 'Card Caption',
            },
          },
        },
      },
    },

    backgroundColor: {
      type: 'text',
      label: 'Background Color (Tailwind class or hex/rgb)',
    },
    tagColor: {
  type: 'text',
  label: 'Tag Color (Tailwind class or hex)',
},

titleColor: {
  type: 'text',
  label: 'Title Color (Tailwind class or hex)',
},

captionColor: {
  type: 'text',
  label: 'Caption Color (Tailwind class or hex)',
},

titleFontSize: {
  type: 'text',
  label: 'Title Font Size (Tailwind classes)',
},

captionFontSize: {
  type: 'text',
  label: 'Caption Font Size (Tailwind classes)',
},

  },

  defaultProps: {
    steps: [
      {
        step: 1,
        tag: 'Feature Tag',
        title: 'Feature Title',
        cards: [
          {
            image: buildImageUrl('placeholder.png'),
            alt: 'Feature image',
            caption: 'Feature description',
          },
        ],
      },
    ],
    backgroundColor: 'bg-white',
    
  },

  render: (data) => {
    const normalized: any = { ...data };

    // Handle image media object conversion for all steps
    if (Array.isArray(normalized.steps)) {
      normalized.steps = normalized.steps.map((step: any) => {
        const normalizedStep = { ...step };
        if (Array.isArray(normalizedStep.cards)) {
          normalizedStep.cards = normalizedStep.cards.map((card: any) => {
            const normalizedCard = { ...card };
            if (
              normalizedCard.image &&
              typeof normalizedCard.image === 'object' &&
              'url' in normalizedCard.image
            ) {
              normalizedCard.image = normalizedCard.image.url;
            }
            return normalizedCard;
          });
        }
        return normalizedStep;
      });
    }

    return <AllStepsBlock {...(normalized as AllStepsBlockProps)} />;
  },
};

export default AllStepsBlockConfig;
