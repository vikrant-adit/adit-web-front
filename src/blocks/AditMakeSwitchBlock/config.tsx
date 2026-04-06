/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import AditMakeSwitchBlock, { AditMakeSwitchBlockProps } from './component.client';

export const AditMakeSwitchBlockConfig: Omit<
  ComponentConfig<AditMakeSwitchBlockProps, AditMakeSwitchBlockProps>,
  'type'
> = {
  label: 'Adit Make Switch Block',

  fields: {
    heading: {
      type: 'text',
      label: 'Heading',
    },

    description: {
      type: 'textarea',
      label: 'Description',
    },

    benefits: {
      type: 'array',
      label: 'Benefit Cards',
      arrayFields: {
        icon: {
          type: 'media',
          mediaType: 'image',
          label: 'Icon',
        },

        iconAlt: {
          type: 'text',
          label: 'Icon Alt Text',
        },

        title: {
          type: 'text',
          label: 'Benefit Title',
        },

        text: {
          type: 'textarea',
          label: 'Benefit Description',
        },
      },
    },

    backgroundColor: {
      type: 'text',
      label: 'Background Color (Tailwind class or hex/rgb)',
    },

    iconBackgroundColor: {
      type: 'text',
      label: 'Icon Background Color (Tailwind class or hex/rgb)',
    },
  },

  defaultProps: {
    heading: 'Adit Makes Switching Simple And Easy!',
    description:
      'Our dedicated onboarding team will get your practice up to speed with perfect clarity, providing personalized support every step of the way. No headaches, no strain—just a seamless integration at your own pace.',
    benefits: [
      {
        icon: `${process.env.STRAPI_API_FOR_IMAGES}/uploads/placeholder.png`,
        iconAlt: 'Benefit icon',
        title: 'Dedicated Onboarding and Unlimited Trainings',
        text: 'You have goals; our job is to help you reach them.',
      },
    ],
    backgroundColor: 'bg-white',
    iconBackgroundColor: 'bg-[#00A6E8]',
  },

  render: (data) => {
    const normalized: any = { ...data };

    // Handle icon media object conversion for benefits
    if (Array.isArray(normalized.benefits)) {
      normalized.benefits = normalized.benefits.map((benefit: any) => {
        const normalizedBenefit = { ...benefit };
        if (
          normalizedBenefit.icon &&
          typeof normalizedBenefit.icon === 'object' &&
          'url' in normalizedBenefit.icon
        ) {
          normalizedBenefit.icon = normalizedBenefit.icon.url;
        }
        return normalizedBenefit;
      });
    }

    return <AditMakeSwitchBlock {...(normalized as AditMakeSwitchBlockProps)} />;
  },
};

export default AditMakeSwitchBlockConfig;
