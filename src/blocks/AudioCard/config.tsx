import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import AudioCard, { AudioCardProps } from './component.client';

export const AudioCardConfig: Omit<
  ComponentConfig<AudioCardProps, AudioCardProps>,
  'type'
> = {
  label: 'Audio / Podcast Card',

  fields: {
    title: {
      type: 'text',
      label: 'Title',

    },

    date: {
      type: 'text',
      label: 'Date',

    },

    duration: {
      type: 'text',
      label: 'Duration',
    },

    speaker: {
      type: 'text',
      label: 'Speaker / Description',
    },

    audioUrl: {
      type: 'text',
      label: 'Audio URL',
    },

    cover: {
      type: 'object',
      label: 'Image',
      objectFields: {
        src: { type: 'media', mediaType: 'image', label: 'Image File' },
        alt: { type: 'text', label: 'Alt Text' },
      },
    },
  },

  defaultProps: {
    title: 'Understanding dental marketing – Part II',
    date: '13 December 2021',
    duration: '34:25',
    speaker: 'Fahad Hashimi – Vice President of Demand Generation',
  },
    render: (data) => <AudioCard {...data} />,

};
