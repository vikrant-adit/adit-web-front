'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import AllStepsSection, { AllStepsSectionProps } from './component.client';

export const AllStepsSectionConfig: Omit<
  ComponentConfig<AllStepsSectionProps, AllStepsSectionProps>,
  'type'
> = {

  label: 'All Steps Section',
  fields: {
    steps: {
      type: 'array',
      label: 'Steps',
      arrayFields: {
        step: {
          type: 'number',
          label: 'Step Number',
        },
        tag: {
          type: 'text',
          label: 'Tag / Category',
        },
        title: {
          type: 'text',
          label: 'Step Title',
        },
        showArrows: {
          type: 'text',
          label: 'Show Navigation Arrows',
        },
        cards: {
          type: 'array',
          label: 'Cards',
          arrayFields: {
            image: {
              type: 'media',
              mediaType: 'image',
              label: 'Card Image',
            },
            alt: {
              type: 'text',
              label: 'Alt Text',
            },
            caption: {
              type: 'text',
              label: 'Card Caption',
            },
            description: {
              type: 'textarea',
              label: 'Card Description',
            },
          },
        },
      },
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
    steps: [
      {
        step: 1,
        tag: 'Feature Tag',
        title: 'Step Title',
        cards: [
          {
            image: '',
            alt: 'Alt text',
            caption: 'Card caption goes here',
          },
        ],
      },
    ],
  },


  render: (data) => <AllStepsSection {...data} />,
};

export default AllStepsSectionConfig;


