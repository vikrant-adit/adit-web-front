'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import GlobalPromo, { GlobalPromoProps } from './component.client';

export const GlobalPromoConfig: ComponentConfig<GlobalPromoProps> = {
  label: 'Global Promo Banner',
  fields: {
    title: { type: 'text', label: 'Title' },
    offer: { type: 'text', label: 'Offer Label (e.g. Black Friday)' },
    message: { type: 'textarea', label: 'Message (HTML allowed)' },
    ctaText: { type: 'text', label: 'CTA Button Text' },
    ctaUrl: { type: 'text', label: 'CTA Link URL' },
    backgroundColor: { type: 'text', label: 'Background Color (e.g. #000 or tailwind)' },
    countdownDays: { type: 'number', label: 'Countdown (Days)' },
    position: {
      type: 'select',
      label: 'Position',
      options: [
        { label: 'Relative (Normal Flow)', value: 'relative' },
        { label: 'Absolute (Positioned)', value: 'absolute' },
        { label: 'Fixed (Sticky on top)', value: 'fixed' },
      ],
    },
    className: { type: 'text', label: 'Additional CSS Classes' },
    zIndex: { type: 'number', label: 'Z-index' },
    hiddenRoutes: { type: 'text', label: 'Hidden Routes (comma-separated, supports *)'}

  },
  defaultProps: {
    title: 'Free phones & VoIP for life',
    offer: 'Black Friday',
    message: 'when you sign up with <strong>Adit</strong>!',
    ctaText: 'Schedule a Demo',
    ctaUrl: '#',
    backgroundColor: '#296bc8ff',
    countdownDays: 20,
    position: 'relative',
    className: '',
    zIndex: 50,
    hiddenRoutes: '/login,/enterprise',
  },
  render: (data) => <GlobalPromo {...data} />,
};

export default GlobalPromoConfig;


