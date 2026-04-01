/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import OnboardingBlock, { OnboardingBlockProps } from './component.client';

export const OnboardingBlockConfig: Omit<
  ComponentConfig<OnboardingBlockProps, OnboardingBlockProps>,
  'type'
> = {
  label: 'Onboarding Block',

  fields: {
    heading: {
      type: 'text',
      label: 'Heading',
    },
 description: {
      type: 'text',
      label: 'Description',
    },
    phases: {
      type: 'array',
      label: 'Onboarding Phases',
      arrayFields: {
        phase: {
          type: 'number',
          label: 'Phase Number',
        },

        title: {
          type: 'text',
          label: 'Phase Title',
        },

        duration: {
          type: 'text',
          label: 'Duration (e.g. "1–2 weeks")',
        },

        steps: {
          type: 'array',
          label: 'Phase Steps',
          arrayFields: {
            number: {
              type: 'number',
              label: 'Step Number',
            },

            title: {
              type: 'text',
              label: 'Step Title',
            },

            icon: {
              type: 'media',
              mediaType: 'image',
              label: 'Step Icon',
            },

            iconAlt: {
              type: 'text',
              label: 'Icon Alt Text',
            },

            bulletPoints: {
              type: 'array',
              label: 'Bullet Points',
              arrayFields: {
                value: {
                  type: 'textarea',
                  label: 'Bullet Point',
                },
              },
            },

            time: {
              type: 'text',
              label: 'Time Duration (e.g. "2.5 hours")',
            },
          },
        },
      },
    },

    // ===============================
    // COLOR CONTROLS
    // ===============================

    backgroundColor: {
      type: 'text',
      label: 'Section Background Color (hex/rgb)',
    },

    textColor: {
      type: 'text',
      label: 'Section Text Color',
    },

    phase1Bg: {
      type: 'text',
      label: 'Phase 1 Background',
    },

    phase1Border: {
      type: 'text',
      label: 'Phase 1 Border Color',
    },

    phase2Bg: {
      type: 'text',
      label: 'Phase 2 Background',
    },

    phase2Border: {
      type: 'text',
      label: 'Phase 2 Border Color',
    },

    stepCardBg: {
      type: 'text',
      label: 'Step Card Background',
    },

    stepTextColor: {
      type: 'text',
      label: 'Step Text Color',
    },

    badgeBg: {
      type: 'text',
      label: 'Badge Background Color',
    },

    accentColor: {
      type: 'text',
      label: 'Accent Color (bullets & time)',
    },
  },

  defaultProps: {
    heading: 'Our Onboarding Process',
    description:
  "Adit's streamlined onboarding process is separated into two phases.",
    phases: [
      {
        phase: 1,
        title: 'Core System Setup',
        duration: '1–2 weeks',
        steps: [
          {
            number: 1,
            title: 'Kickoff and Connect Phones',
            icon: 'http://localhost:1337/uploads/placeholder.png',
            iconAlt: 'Icon',
            bulletPoints: ['Action item 1', 'Action item 2'],
            time: '2.5 hours',
          },
        ],
      },
    ],

    // default colors
    backgroundColor: '#073B4C',
    textColor: '#ffffff',
    phase1Bg: 'rgba(37,168,224,0.2)',
    phase1Border: '#25A8E0',
    phase2Bg: 'rgba(39,198,139,0.3)',
    phase2Border: '#2DDC96',
    stepCardBg: '#ffffff',
    stepTextColor: '#032B4B',
    badgeBg: '#073B4C',
    accentColor: '#F97316',
  },

  render: (data) => {
    const normalized: any = { ...data };

    // Handle icon media object conversion
    if (Array.isArray(normalized.phases)) {
      normalized.phases = normalized.phases.map((phase: any) => {
        const normalizedPhase = { ...phase };

        if (Array.isArray(normalizedPhase.steps)) {
          normalizedPhase.steps = normalizedPhase.steps.map((step: any) => {
            const normalizedStep = { ...step };

            if (
              normalizedStep.icon &&
              typeof normalizedStep.icon === 'object' &&
              'url' in normalizedStep.icon
            ) {
              normalizedStep.icon = normalizedStep.icon.url;
            }

            // Normalize bulletPoints
            if (Array.isArray(normalizedStep.bulletPoints)) {
              normalizedStep.bulletPoints =
                normalizedStep.bulletPoints.map((bp: any) => {
                  if (typeof bp === 'object' && 'value' in bp) {
                    return bp.value;
                  }
                  return bp;
                });
            }

            return normalizedStep;
          });
        }

        return normalizedPhase;
      });
    }

    return <OnboardingBlock {...(normalized as OnboardingBlockProps)} />;
  },
};

export default OnboardingBlockConfig;
