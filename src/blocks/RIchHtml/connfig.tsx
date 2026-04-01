'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import RichHtml, { RichHtmlProps } from './component.client';

export const RichHtmlConfig: Omit<ComponentConfig<RichHtmlProps, RichHtmlProps>, 'type'> = {
  label: 'Custom HTML Block',
  fields: {
    html: {
      type: 'textarea', // ✅ use textarea (safe for raw HTML)
      label: 'HTML Content',
    //   description:
    //     'Paste or write custom HTML. Scripts are automatically sanitized (requires DOMPurify for best safety).',
    },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    className: {
      type: 'text',
      label: 'CSS Classes (optional)',
    //   description: 'Add Tailwind or custom classes to the container.',
    },
     isGlobal: {
      type: "text",
      label: "Set as Global",
    },

    globalKey: {
      type: "text",
      label: "Global Key",
    },
    // allowUnsafe: {
    //   type: 'boolean',
    //   label: 'Allow unsafe HTML (no sanitization)',
    //   description:
    //     '⚠️ Only enable for trusted internal content. This bypasses DOMPurify sanitization.',
    // },
  },
  defaultProps: {
//     html: `<div style="padding:8px">
//   <h3 style="margin:0 0 8px 0; color:#333;">Custom card content</h3>
//   <p style="margin:0;">You can include <strong>bold text</strong>, <a href="#">links</a>, or inline styles.</p>
// </div>`,
    align: 'left',
    className: '',
    allowUnsafe: false,
  },
  render: (data) => <RichHtml {...data} />,
};

export default RichHtmlConfig;
