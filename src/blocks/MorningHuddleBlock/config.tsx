/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import MorningHuddleBlock, { MorningHuddleBlockProps } from './component.client';
import { buildImageUrl } from '@/lib/defaults';

export const MorningHuddleBlockConfig: Omit<
  ComponentConfig<MorningHuddleBlockProps, MorningHuddleBlockProps>,
  'type'
> = {
  label: 'Morning Huddle Block',

  fields: {
    eyebrow: {
      type: 'text',
      label: 'Eyebrow / Tag',
    },

    heading: {
      type: 'textarea',
      label: 'Heading',
    },

    description: {
      type: 'textarea',
      label: 'Description',
    },

    imageSrc: {
      type: 'media',
      mediaType: 'image',
      label: 'Dashboard Image',
    },

    imageAlt: {
      type: 'text',
      label: 'Image Alt Text',
    },

    buttonText: {
      type: 'text',
      label: 'Button Text',
    },

    buttonUrl: {
      type: 'text',
      label: 'Button URL',
    },

    backgroundColor: {
      type: 'text',
      label: 'Background Color (Tailwind class or hex/rgb)',
    },
  },

  defaultProps: {
    eyebrow: 'Practice Analytics',
    heading:
      'Start Your Day With The Most Productive\n15‑Minute Morning Huddle',
    description:
      'Our dedicated onboarding experts will work at your pace to get your team and practice up to speed and fully integrated with Adit\'s all‑in‑one software.',
    imageSrc:
      buildImageUrl('practice_analytics_video_ezgif_com_video_to_gif_converter_cc85c26835.gif'),
    imageAlt: 'Practice analytics morning huddle dashboard',
    buttonText: 'Schedule a Demo',
    buttonUrl: '/schedule-a-demo',
    backgroundColor: 'bg-[#E4F7FF]',
  },

  render: (data) => {
    const normalized: any = { ...data };

    // Handle imageSrc media object conversion
    if (
      normalized.imageSrc &&
      typeof normalized.imageSrc === 'object' &&
      'url' in normalized.imageSrc
    ) {
      normalized.imageSrc = normalized.imageSrc.url;
    }

    return <MorningHuddleBlock {...(normalized as MorningHuddleBlockProps)} />;
  },
};

export default MorningHuddleBlockConfig;
