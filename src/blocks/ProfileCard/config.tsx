/* TeamCarousel.config.tsx */
'use client';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import TeamCarousel, { TeamCarouselProps } from './component.client';

export const TeamCarouselConfig: Omit<ComponentConfig<TeamCarouselProps, TeamCarouselProps>, 'type'> = {
  label: 'Team Carousel (clean)',
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow' },
    title: { type: 'text', label: 'Title' },
    items: {
      type: 'array',
      label: 'Members',
      arrayFields: {
        id: { type: 'text', label: 'ID' },
        image: { type: 'media', mediaType: 'image', label: 'Image' },
        name: { type: 'text', label: 'Name' },
        role: { type: 'text', label: 'Role' },
      },
      defaultItemProps: { id: '', image: '', name: '', role: '' },
    },
    columns: { type: 'number', label: 'Columns (md+)' },
    gap: { type: 'number', label: 'Gap (px)' },
    circleSize: { type: 'text', label: 'Avatar size classes (e.g. w-36 h-36)' },
    padding: { type: 'text', label: 'Padding (tailwind classes)' },
    background: { type: 'text', label: 'Background (tailwind class)' },
    className: { type: 'text', label: 'Additional classes'},
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
    eyebrow: '',
    title: 'Our Team',
    items: [
      { id: '1', image: '/mnt/data/48ddabdd-8eaf-45ba-9038-0fb404961999.png', name: 'Dr. Grant Smith', role: 'Prairie Village Dentist' },
      { id: '2', image: '/mnt/data/48ddabdd-8eaf-45ba-9038-0fb404961999.png', name: 'Dr. Ben Donn', role: 'Word Of Mouth Dentistry' },
      { id: '3', image: '/mnt/data/48ddabdd-8eaf-45ba-9038-0fb404961999.png', name: 'Yvette Medellin', role: 'Dental Practice Administrator' },
    ],
    columns: 3,
    gap: 40,
    circleSize: 'w-36 h-36',
    padding: 'py-12 px-6',
    background: 'bg-[#f4fbff]',
    className: '',
  },
  render: (data) => <TeamCarousel {...data} />,
};

export default TeamCarouselConfig;


