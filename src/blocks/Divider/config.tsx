'use client';
import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import Divider, { DividerProps } from './component.client';

export const DividerConfig: Omit<ComponentConfig<DividerProps, DividerProps>, 'type'> = {
  label: 'Divider Line',

  fields: {
    color: {
      type: 'text',
      label: 'Line Color (e.g. #000 or red)',
    },

    thickness: {
      type: 'number',
      label: 'Thickness (px)',
    },

    width: {
      type: 'text',
      label: 'Width (e.g. 100%, 50%, 200px)',
    },

    positionVertical: {
      type: 'select',
      label: 'Vertical Position',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },

    positionHorizontal: {
      type: 'select',
      label: 'Horizontal Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },

    styleType: {
      type: 'select',
      label: 'Line Style',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ],
    },

    marginTop: {
      type: 'number',
      label: 'Margin Top (px)',
    },

    marginBottom: {
      type: 'number',
      label: 'Margin Bottom (px)',
    },

    // 🆕 Padding controls
    paddingTop: {
      type: 'number',
      label: 'Padding Top (px)',
    },

    paddingBottom: {
      type: 'number',
      label: 'Padding Bottom (px)',
    },

    paddingLeft: {
      type: 'number',
      label: 'Padding Left (px)',
    },

    paddingRight: {
      type: 'number',
      label: 'Padding Right (px)',
    },

    // Label
    label: {
      type: 'text',
      label: 'Label Text (optional)',
    },

    labelColor: {
      type: 'text',
      label: 'Label Color',
    },

    labelSize: {
      type: 'number',
      label: 'Label Font Size (px)',
    },

    labelGap: {
      type: 'number',
      label: 'Gap Between Line & Label (px)',
    },

    // Global settings
    isGlobal: {
      type: "text",
      label: "Set as Global",
    },

    globalKey: {
      type: "text",
      label: "Global Key",
    },
  },

  defaultProps: {
    color: '#d1d5db',
    thickness: 1,
    width: '100%',

    positionVertical: 'center',
    positionHorizontal: 'center',

    styleType: 'solid',

    marginTop: 20,
    marginBottom: 20,

    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,

    label: '',
    labelColor: '#374151',
    labelSize: 14,
    labelGap: 8,
  },

  render: (props) => <Divider {...props} />,
};

export default DividerConfig;