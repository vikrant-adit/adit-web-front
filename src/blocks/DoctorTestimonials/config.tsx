/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import DoctorTestimonials, {
  DoctorTestimonialsProps,
} from './component.client';

export const DoctorTestimonialsConfig: ComponentConfig<
  DoctorTestimonialsProps,
  DoctorTestimonialsProps
> = {
  label: 'Doctor Testimonials (Video)',

  fields: {
    heading: { type: 'text', label: 'Heading' },
    background: { type: 'text', label: 'Background Color' },

    items: {
      type: 'array',
      label: 'Testimonials',
      arrayFields: {
        name: { type: 'text', label: 'Name' },
        title: { type: 'text', label: 'Title' },
        website: { type: 'text', label: 'Website' },
        quote: { type: 'textarea', label: 'Quote' },
        videoUrl: { type: 'text', label: 'Video URL (mp4)' },
        videoThumbnail: { type: 'media', mediaType: 'image', label: 'Thumbnail' },
        avatar: { type: 'media', mediaType: 'image', label: 'Avatar' },
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
    heading: 'What our doctors have to say',
    background: '#e9f9ff',
    items: [],
  },

  render: (props) => <DoctorTestimonials {...props} />,
};

export default DoctorTestimonialsConfig;