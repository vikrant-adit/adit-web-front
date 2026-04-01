// cardsContainer.config.tsx — JSON fallback version
'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import CardsContainer, { CardsContainerProps } from './compoent.client';

export const CardsContainerConfig: Omit<ComponentConfig<CardsContainerProps, CardsContainerProps>, 'type'> = {
label: 'Cards Container',
  fields: {
    title: { type: 'text', label: 'Section title' },
    items: {
      type: 'array',
      label: 'Cards',
      arrayFields: {
        id: { type: 'text', label: 'Card ID' },
        // logoSrc: { type: 'media', label: 'Logo' },
        headline: { type: 'text', label: 'Headline' },
        body: { type: 'textarea', label: 'Body' },
        // highlight: { type: 'boolean', label: 'Highlight' },
        ctaLabel: { type: 'text', label: 'CTA Label' },
        accent: { type: 'color', label: 'Accent Color' },
      },
    },
    showArrows: { type: 'number', label: 'Show navigation arrows' },
    gap: { type: 'number', label: 'Card gap (units)' },
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
    title: 'Practices switch to Adit because we deliver results!',
    // defaultProps can be a real array — builder will store it as JSON in editor
    items: [
      { id: '1', logoSrc: '/images/logo-ortho.png', headline: 'OrthoGrace ... 91%', body: 'with payment plans via Adit Pay', highlight: '91%', ctaLabel: 'Read More', accent: 'teal-400' },
      { id: '2', logoSrc: '/images/logo-dedicated.png', headline: 'Dedicated Dentistry grew to $1.6M', body: 'by making data-driven decisions', ctaLabel: 'Read More', accent: 'sky-400' },
    ],
    showArrows: true,
    gap: 6,
  },
  render: (data) => {
    // if 'items' comes in as JSON string, parse it
    const items = typeof data.items === 'string' ? JSON.parse(data.items) : data.items;
    return <CardsContainer {...data} items={items} />;
  },
};

export default CardsContainerConfig;
