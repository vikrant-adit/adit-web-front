/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import ResultsBlock, { ResultsBlockProps } from './component.client';

export const ResultsBlockConfig: Omit<ComponentConfig<ResultsBlockProps, ResultsBlockProps>, 'type'> =
  {
    label: 'Results Block',

    fields: {
      heading: {
        type: 'text',
        label: 'Heading',
      },

      caseCards: {
        type: 'array',
        label: 'Results Block  Cards',
        arrayFields: {
          imageSrc: {
            type: 'media',
            mediaType: 'image',
            label: 'Card Image',
          },

          imageAlt: {
            type: 'text',
            label: 'Image Alt Text',
          },

          title: {
            type: 'textarea',
            label: 'Card Title',
          },

          stats: {
            type: 'array',
            label: 'Statistics',
            arrayFields: {
              value: { type: 'text', label: 'Value' },
              label: { type: 'text', label: 'Label' },
              subLabel: { type: 'text', label: 'Sub Label' },
            },
          },

          buttonText: {
            type: 'text',
            label: 'Button Text',
          },

          buttonLink: {
            type: 'text',
            label: 'Button Link',
          },
        },
      },

      backgroundColor: {
        type: 'text',
        label: 'Background Color (Tailwind class or hex/rgb)',
      },
    },

    defaultProps: {
      heading: 'Eye‑Opening Results With Adit',
      caseCards: [
        {
          imageSrc: 'http://localhost:1337/uploads/case_study_placeholder.png',
          imageAlt: 'Case study',
          title: 'Sample case study result',
          stats: [
            { value: '20X', label: 'Boost in', subLabel: 'online reviews' },
            { value: '4+', label: 'Systems', subLabel: 'replaced' },
            { value: '90%', label: 'Reduction in', subLabel: 'voicemail volume' },
          ],
          buttonText: 'Read More',
        },
      ],
      backgroundColor: 'bg-[#F4FBFF]',
    },

    render: (data) => {
      const normalized: any = { ...data };

      // Handle image media object conversion for case cards
      if (Array.isArray(normalized.caseCards)) {
        normalized.caseCards = normalized.caseCards.map((card: any) => {
          const normalizedCard = { ...card };
          if (
            normalizedCard.imageSrc &&
            typeof normalizedCard.imageSrc === 'object' &&
            'url' in normalizedCard.imageSrc
          ) {
            normalizedCard.imageSrc = normalizedCard.imageSrc.url;
          }
          return normalizedCard;
        });
      }

      return <ResultsBlock {...(normalized as ResultsBlockProps)} />;
    },
  };

export default ResultsBlockConfig;
