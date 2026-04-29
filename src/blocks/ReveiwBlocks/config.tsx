// File: reviews-config.tsx
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import ReviewsWidget,{ReviewsWidgetProps} from './component.client';

export type ReviewItem = {
  id?: string | number;
  source?: string;
  name?: string;
  date?: string;
  rating?: number;
  comment?: string;
};



const ReviewsWidgetConfig: Omit<ComponentConfig<ReviewsWidgetProps, ReviewsWidgetProps>, 'type'> = {
  label: 'Reviews Widget',
  fields: {
    reviews: {
      type: 'array',
      label: 'Reviews',
    //   options: { min: 1 },
      arrayFields: {
        source: { type: 'text', label: 'Source (google/facebook)' },
        name: { type: 'text', label: 'Reviewer name' },
        date: { type: 'text', label: 'Date' },
        rating: { type: 'number', label: 'Rating (1-5)' },
        comment: { type: 'textarea', label: 'Comment' },
      },
    },
    maxHeight: { type: 'text', label: 'Max height (CSS)',  },
    showHeader: { type: 'text', label: 'Show header (total + avg)'},
    showPoweredBy: { type: 'text', label: 'Show Powered by' },
    className: { type: 'text', label: 'Custom classes' },
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
    reviews: [
      {
        id: 'r1',
        source: 'google',
        name: 'Veronica Freitas',
        date: 'Wed Feb 08 2023',
        rating: 5,
        comment: '(No comment for this reviewer)',
      },
      {
        id: 'r2',
        source: 'google',
        name: 'Ashkan Alizadeh',
        date: 'Thu Jul 07 2022',
        rating: 5,
        comment:
          'I have been using Adit for over 6 months and I waited before I write this review. I enjoy using Adit since it seamlessly integrates with my practice management software. It is a platform that combines everything from the VOIP phone system, appointment confirmation, online reputation management, patient form management, patient payment solution, marketing, and finally analytics...',
      },
    ],
    maxHeight: '360px',
    showHeader: true,
    showPoweredBy: true,
    className: '',
  },
  render: (data) => <ReviewsWidget {...data} />,
};

export default ReviewsWidgetConfig;




