'use client';

import React from 'react';
import { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import SearchFilterBlock, {
  SearchFilterBlockProps,
} from './component.client';

export const SearchFilterBlockConfig: Omit<
  ComponentConfig<SearchFilterBlockProps, SearchFilterBlockProps>,
  'type'
> = {
  label: 'Search & Filter',

  fields: {
    placeholder: {
      type: 'text',
      label: 'Search Placeholder',
    },

    showSearch: {
      type: 'text',
      label: 'Show Search Input',
    },

    showClear: {
      type: 'text',
      label: 'Show Clear Button',
    },

    debounceMs: {
      type: 'number',
      label: 'Debounce (ms)',
    },

    filters: {
      type: 'array',
      label: 'Filters',
      arrayFields: {
        key: {
          type: 'text',
          label: 'Filter Key',
        },
        label: {
          type: 'text',
          label: 'Filter Label',
        },
        options: {
          type: 'array',
          label: 'Options',
          arrayFields: {
            label: { type: 'text', label: 'Label' },
            value: { type: 'text', label: 'Value' },
          },
        },
      },
    },
  },

  defaultProps: {
    placeholder: 'Search...',
    showSearch: true,
    showClear: true,
    debounceMs: 300,
    filters: [],
  },

  render: (data) => <SearchFilterBlock {...data} />,
};

export default SearchFilterBlockConfig;
