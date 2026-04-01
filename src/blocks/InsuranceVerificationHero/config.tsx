/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import InsuranceVerificationClient, { InsuranceProps } from './component.config';

export const InsuranceVerificationConfig: Omit<ComponentConfig<InsuranceProps, InsuranceProps>, 'type'> = {
  label: 'Insurance Verification',
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow / small label' },
    title: { type: 'text', label: 'Title' },
    intro: { type: 'text', label: 'Intro / description' },
    ctaText: { type: 'text', label: 'CTA Text' },
    ctaLink: { type: 'text', label: 'CTA Link' },
    // image: { type: 'media', label: 'Main Image' }, // builder may use 'media' or 'image' depending on setup
    // logo: { type: 'media', label: 'Client Logo' },
    imageAlign: {
      type: 'radio',
      label: 'Image alignment',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },
    badgeText: { type: 'text', label: 'Badge Text (location)' },
    stats: {
      type: 'array',
      label: 'Stats (3 items)',
      arrayFields: {
        value: { type: 'text', label: 'Value' },
        label: { type: 'text', label: 'Label' },
      },
      getItemSummary: (it: any) => (it?.value ?? it ?? 'Stat'),
      max: 3,
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
    eyebrow: 'No more claim denials!',
    title: 'Insurance Verification',
    intro: 'Be prepared to verify patient coverage way before their appointments.',
    ctaText: 'Schedule A Demo',
    ctaLink: '#',
    image: { url: '/assets/insurance-hero.jpg', alt: 'family in a field' },
    logo: { url: '/assets/client-logo.png', alt: 'client logo' },
    imageAlign: 'right',
    badgeText: 'Tustin, California',
    stats: [
      { value: '30%', label: 'Production growth' },
      { value: '16 hours/week', label: 'Saved on insurance verifications' },
      { value: '18%', label: 'Collections boost' },
    ],
  },

  render: (data) => {
    // Normalize builder-returned shapes into the props our client expects
    const normalized: any = { ...data };

    // builder stores array items as { value } objects — convert to simple array
    if (Array.isArray(normalized.stats)) {
      normalized.stats = normalized.stats.map((it: any) => ({
        value: it?.value ?? it?.label ?? String(it ?? ''),
        label: it?.label ?? '',
      }));
    }

    // Some builders return media as { url } or { data: { attributes: { url } } }
    const normalizeAsset = (asset: any) => {
      if (!asset) return null;
      if (typeof asset === 'string') return { url: asset };
      if (asset?.url) return { url: asset.url, alt: asset.alt ?? undefined };
      if (asset?.data?.attributes?.url) return {
        url: asset.data.attributes.url,
        alt: asset.data.attributes.alternativeText ?? undefined,
      };
      return asset;
    };

    normalized.image = normalizeAsset(normalized.image);
    normalized.logo = normalizeAsset(normalized.logo);

    // coerce radio values into strings 'left'/'right' or the boolean flags if needed
    if (normalized.imageAlign && typeof normalized.imageAlign === 'object' && 'value' in normalized.imageAlign) {
      normalized.imageAlign = normalized.imageAlign.value;
    }

    return <InsuranceVerificationClient {...normalized} />;
  },
};

export default InsuranceVerificationConfig;
