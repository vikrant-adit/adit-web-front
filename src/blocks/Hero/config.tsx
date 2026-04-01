/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import HeroTyped, { HeroTypedProps } from './component.client';

export const HeroTypedConfig: Omit<
  ComponentConfig<HeroTypedProps, HeroTypedProps>,
  'type'
> = {
  label: 'Hero (Typed)',

  fields: {
    heading: {
      type: 'text',
      label: 'Heading',
    },

    lines: {
      type: 'array',
      label: 'Typed Lines',
      arrayFields: {
        text: { type: 'text', label: 'Line' },
      },
      getItemSummary: (it: any) => it?.text || 'Line',
    },

    typingSpeed: {
      type: 'number',
      label: 'Typing Speed (ms)',
    },

    delayAfterTyping: {
      type: 'number',
      label: 'Delay After Line (ms)',
    },

    isGlobal: {
      type: 'radio',
      label: 'Set as Global',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },

  defaultProps: {
    heading: 'All-in-one patient management software',
    lines: [
      { text: 'seamless workflows' },
      { text: 'faster practice growth' },
      { text: 'better patient care' },
    ],

    typingSpeed: 80,
    delayAfterTyping: 1200,
    isGlobal: false,
  },

  render: (data) => {
    /**
     * 🚨 STRAPI SAFE NORMALIZATION
     * Everything converted BEFORE reaching React
     */

    const toText = (v: any): string => {
      if (typeof v === 'string') return v;
      if (typeof v === 'number') return String(v);
      if (Array.isArray(v)) return v.join('');
      if (v && typeof v === 'object') return Object.values(v).join('');
      return '';
    };

    const toStringArray = (v: any): string[] => {
      if (Array.isArray(v)) {
        return v.map((x) => toText(x?.text ?? x)).filter(Boolean);
      }
      if (v && typeof v === 'object') {
        return Object.values(v)
          .map((x: any) => toText(x?.text ?? x))
          .filter(Boolean);
      }
      return [];
    };

    return (
      <HeroTyped
        heading={toText(data.heading)}
        // subtitle={toText(data.subtitle)}
        lines={toStringArray(data.lines)}
        // videoSrc={toText(data.videoSrc)}
        // buttonText={toText(data.buttonText)}
        // buttonUrl={toText(data.buttonUrl)}
        typingSpeed={Number(data.typingSpeed) || 80}
        delayAfterTyping={Number(data.delayAfterTyping) || 1200}
        isGlobal={Boolean(data.isGlobal)}
        // editable={data.editable}
      />
    );
  },
};

export default HeroTypedConfig;
