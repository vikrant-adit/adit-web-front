'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import Card, { CardProps } from './component.client';

export const CardConfig: Omit<ComponentConfig<CardProps, CardProps>, 'type'> = {
  label: 'Testimonial Card',
  fields: {
    logoSrc: { type: 'text', label: 'Logo URL' },
    headline: { type: 'text', label: 'Headline' },
    body: { type: 'textarea', label: 'Body' },
    highlight: { type: 'text', label: 'Highlight (exact substring to emphasize)' },
    ctaLabel: { type: 'text', label: 'CTA label' },
    accent: { type: 'text', label: 'Accent (Tailwind color e.g. teal-400 or hex)' },
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
    logoSrc: '/images/sample-logo.svg',
    headline: 'Arnold Dentistry reduced administrative workload by 75%',
    body: 'using Adit VoIP',
    highlight: '75%',
    ctaLabel: 'Read More',
    accent: 'amber-400',
  },
  render: (data) => <Card {...data} />,
};

export default CardConfig;


