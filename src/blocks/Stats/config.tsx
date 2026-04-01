/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import StatsClient, { StatsProps } from './component.client';

export const StatsConfig: Omit<ComponentConfig<StatsProps, StatsProps>, 'type'> = {
  label: 'Stats',
  fields: {
    items: {
      type: 'array',
      label: 'Stats Items',
      arrayFields: {
        label: { type: 'text', label: 'Label' },
        subLabel: { type: 'text', label: 'Sub Label' },
        value: { type: 'number', label: 'Value' },
        prefix: { type: 'text', label: 'Prefix' },
        suffix: { type: 'text', label: 'Suffix' },
        decimals: { type: 'number', label: 'Decimals' },
      },
      getItemSummary: (it: any) => it?.label?.value ?? it?.label ?? 'Stat',
      max: 12,
    },
    duration: { type: 'number', label: 'Count duration (ms)' },
    separator: {
      type: 'radio',
      label: 'Use thousands separator',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    gap: { type: 'number', label: 'Gap between items (px)' },

    // 🎨 new color fields
    numberColor: { type: 'text', label: 'Number Text Color (e.g. #06263a or text-blue-600)' },
    labelColor: { type: 'text', label: 'Label Text Color (e.g. #6b7280)' },
  },

  defaultProps: {
    items: [
      { label: 'Practices choose Adit', value: 5, suffix: 'K+', prefix: '', decimals: 0 },
      { label: 'Calls handled every month', value: 2.4, suffix: '', prefix: '', decimals: 0 },
      { label: 'Active users on Adit', value: 30, suffix: '+', prefix: '', decimals: 0 },
      { label: 'Confirmed appointments every month', value: 200, suffix: '+', prefix: '', decimals: 0 },
    ],
    duration: 1400,
    separator: true,
    align: 'center',
    gap: 48,
    numberColor: '#06263a',
    labelColor: '#6b7280',
  },

  render: (data) => {
    const normalized: any = { ...data };
    if (Array.isArray(normalized.items)) {
      normalized.items = normalized.items.map((it: any) => ({
        label: it?.label?.value ?? it?.label ?? '',
        subLabel: it?.subLabel?.value ?? it?.subLabel ?? '',
        value: Number(it?.value?.value ?? it?.value ?? 0),
        prefix: it?.prefix?.value ?? it?.prefix ?? '',
        suffix: it?.suffix?.value ?? it?.suffix ?? '',
        decimals: Number(it?.decimals?.value ?? it?.decimals ?? 0),
      }));
    } else {
      normalized.items = [];
    }

    const coerceBool = (v: any) => {
      if (v === true || v === 'true') return true;
      if (v === false || v === 'false') return false;
      if (v && typeof v === 'object' && 'value' in v) return v.value === true || v.value === 'true';
      return Boolean(v);
    };

    normalized.separator = coerceBool(normalized.separator ?? true);
    normalized.duration = Number(normalized.duration ?? 1200);
    normalized.gap = Number(normalized.gap ?? 48);
    normalized.align = normalized.align ?? 'center';

    // Pass new color props
    normalized.numberColor = normalized.numberColor ?? '#06263a';
    normalized.labelColor = normalized.labelColor ?? '#6b7280';

    return <StatsClient {...normalized} />;
  },
};

export default StatsConfig;


