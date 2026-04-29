/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import SelectableCards, { SelectableCardsProps } from './component.client';

type Item = { id?: string | number; label?: string };

export const SelectableCardsConfig: Omit<
  ComponentConfig<SelectableCardsProps, SelectableCardsProps>,
  'type'
> = {
  label: 'Selectable Cards Grid',
  fields: {
    items: {
      type: 'array',
      label: 'Cards',
      arrayFields: {
        id: { type: 'text', label: 'ID (optional)' },
        label: { type: 'textarea', label: 'Label (HTML allowed)' },
      },
      getItemSummary: (it: Item) => {
        if (!it?.label) return 'Card';
        if (it.label.length > 30) return it.label.slice(0, 28) + '…';
        return it.label;
      },
      max: 24,
    },
    columns: { type: 'number', label: 'Columns (desktop)' },
    gap: { type: 'number', label: 'Gap between cards (px)' },
    radius: { type: 'text', label: 'Card radius (px or tailwind e.g. rounded-xl)' },
    background: { type: 'text', label: 'Card background (hex or tailwind class)' },
    textColor: { type: 'text', label: 'Text color (hex or tailwind class)' },
    hoverBg: { type: 'text', label: 'Hover background (hex or tailwind class)' },
    selectedBg: { type: 'text', label: 'Selected background (hex or tailwind class)' },
    selectedTextColor: { type: 'text', label: 'Selected text color (hex or tailwind class)' },
    multiple: {
  type: 'radio',
  label: 'Allow multiple selection',
  options: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
},
    initialSelected: {
      type: 'text',
      label: 'Initial selected index(es) (comma separated e.g. 0,2)',
    },
  },

  defaultProps: {
    items: [
      { id: '1', label: 'I want to reduce claim denials and increase approvals' },
      { id: '2', label: 'I want to accelerate the collections process' },
      { id: '3', label: 'I want to improve patient satisfaction' },
      { id: '4', label: 'I want to spend less time on the phone' },
      { id: '5', label: 'I want to optimize staff productivity' },
      { id: '6', label: 'I want up-to-date information in patient files' },
    ],
    columns: 3,
    gap: 20,
    radius: '12px',
    background: '#ffffff',
    textColor: '#06263a',
    hoverBg: '#f1faff',
    selectedBg: '#06b6d4',
    selectedTextColor: '#ffffff',
    multiple: true,
    initialSelected: null,
  },

  render: (data) => {
  const normalized: any = { ...data };

  // normalize items shape: support { label }, { label: { value } }, legacy shapes
  if (Array.isArray(normalized.items)) {
    normalized.items = normalized.items.map((it: any) => ({
      id: it?.id ?? it?.value ?? it?.id?.value ?? null,
      label: it?.label?.value ?? it?.label ?? it?.value?.label ?? '',
    }));
  } else {
    normalized.items = [];
  }

  // helper: coerce boolean-like values returned by radio/select
  const coerceBool = (v: any) => {
    if (v === true || v === 'true') return true;
    if (v === false || v === 'false') return false;
    if (v && typeof v === 'object' && 'value' in v) {
      const vv = v.value;
      return vv === true || vv === 'true';
    }
    return Boolean(v);
  };

  // multiple may come as radio/select object — coerce to boolean
  normalized.multiple = coerceBool(normalized.multiple ?? false);

  // parse initialSelected if provided as CSV string, number, or array
  if (typeof normalized.initialSelected === 'string') {
    const arr = normalized.initialSelected
      .split(',')
      .map((s: string) => Number(s.trim()))
      .filter((n: number) => Number.isFinite(n));
    normalized.initialSelected = arr.length ? arr : null;
  } else if (typeof normalized.initialSelected === 'number') {
    normalized.initialSelected = [normalized.initialSelected];
  } else if (Array.isArray(normalized.initialSelected)) {
    // coerce entries to numbers if possible
    const arr = normalized.initialSelected
      .map((v: any) => (typeof v === 'object' && 'value' in v ? Number(v.value) : Number(v)))
      .filter((n: number) => Number.isFinite(n));
    normalized.initialSelected = arr.length ? arr : null;
  } else {
    normalized.initialSelected = null;
  }

  // numeric coercion with fallbacks
  normalized.columns = Number(normalized.columns ?? 3) || 3;
  normalized.gap = Number(normalized.gap ?? 24) || 24;

  // radius (allow object shapes or plain string)
  normalized.radius =
    typeof normalized.radius === 'string'
      ? normalized.radius
      : normalized.radius?.value ?? normalized.radius ?? '12px';

  // colors & style defaults (accept tailwind-class strings too)
  normalized.background = normalized.background ?? '#ffffff';
  normalized.textColor = normalized.textColor ?? '#06263a';
  normalized.hoverBg = normalized.hoverBg ?? '#f1faff';
  normalized.selectedBg = normalized.selectedBg ?? '#06b6d4';
  normalized.selectedTextColor = normalized.selectedTextColor ?? '#ffffff';

  return <SelectableCards {...normalized} />;
},

};

export default SelectableCardsConfig;


