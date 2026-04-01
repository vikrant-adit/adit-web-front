// File: MenuNav.config.tsx
'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import MenuNav, { MenuNavProps } from './component.client';

// type MenuItem = { label?: string; targetId?: string };

export const MenuNavConfig: ComponentConfig<MenuNavProps> = {
  label: 'MenuNav (anchor menu)',
  fields: {
    id: { type: 'text', label: 'Nav ID (html id)' },
    items: {
      type: 'array',
      label: 'Menu items',
      arrayFields: {
        label: { type: 'text', label: 'Label' },
        targetId: { type: 'text', label: 'Target element id' },
      },
      defaultItemProps: { label: '', targetId: '' },
    },
    background: { type: 'text', label: 'Background (Tailwind class or color)' },
    padding: { type: 'text', label: 'Padding (Tailwind classes)'},
    textColor: { type: 'text', label: 'Text color (Tailwind or hex)' },
    activeTextColor: { type: 'text', label: 'Active text color (Tailwind or hex)'},
    pillBg: { type: 'text', label: 'Pill background (Tailwind or hex)' },
    pillPadding: { type: 'text', label: 'Pill padding classes (e.g. px-6 py-2)' },
    gap: { type: 'number', label: 'Gap between items (px)'},
    offset: { type: 'number', label: 'Scroll offset (px)'},
    sticky: { type: 'text', label: 'Make nav sticky' },
    className: { type: 'text', label: 'Additional classes' },
  },

  defaultProps: {
    id: 'menu-nav',
    items: [
      { label: 'Website Design', targetId: 'website-design' },
      { label: 'SEO', targetId: 'seo' },
      { label: 'Email Marketing', targetId: 'email-marketing' },
      { label: 'Google Ads', targetId: 'google-ads' },
      { label: 'Meta Ads', targetId: 'meta-ads' },
      { label: 'Online Review Generation', targetId: 'online-review-generation' },
    ],
    background: 'bg-sky-600',
    padding: 'py-3',
    textColor: 'text-white',
    activeTextColor: 'text-sky-800',
    pillBg: '#ffffff',
    pillPadding: 'px-6 py-2',
    gap: 36,
    offset: 0,
    sticky: true,
    className: '',
  },

  render: (props) => <MenuNav {...props} />,
};

export default MenuNavConfig;


