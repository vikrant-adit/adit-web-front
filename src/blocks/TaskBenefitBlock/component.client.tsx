'use client';

import { resolveImageUrl } from '@/lib/imageResolver';
import Image from 'next/image';
import React from 'react';

export type PBImage = {
  src?: string;
  alt?: string;
};

export type TasksBenefitsItem = {
  title: string;
  description: string;

  // icon image from picker
  iconImage?: PBImage;

  // styling - accepts both Tailwind classes (e.g. "bg-amber-50") or color values (e.g. "#FEF3C7", "rgb(254, 243, 199)")
  bgColor?: string;
  iconBgColor?: string;
};

export type TasksBenefitsGridProps = {
  heading?: string;
  items?: TasksBenefitsItem[];
};

const DEFAULT_ITEMS: TasksBenefitsItem[] = [
  {
    title: 'Save time',
    description: 'by automating follow-ups and recurring workflows',
    bgColor: 'bg-amber-50',
    iconBgColor: 'bg-amber-500',
    iconImage: {
      src: '',
      alt: 'Clock Icon',
    },
  },
  {
    title: 'Boost team accountability',
    description: 'with clear ownership, due dates, and visibility into every task',
    bgColor: 'bg-emerald-50',
    iconBgColor: 'bg-emerald-500',
    iconImage: {
      src: '',
      alt: 'Rocket Icon',
    },
  },
];
// Helper to determine if a color string is a Tailwind class or a color value
const isTailwindClass = (color: string): boolean => {
  return color?.startsWith('bg-') || color?.startsWith('text-') || color?.startsWith('ring-');
};

// Helper to extract style object from color value
const getColorStyle = (color: string): React.CSSProperties | undefined => {
  if (!color || isTailwindClass(color)) return undefined;
  return { backgroundColor: color };
};
export default function TasksBenefitsGrid(props: Readonly<TasksBenefitsGridProps>) {
  const heading = props.heading ?? "Here is what Adit’s Tasks does for your practice";
  const items = props.items?.length ? props.items : DEFAULT_ITEMS;

  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            {heading}
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => {
            const bgValue = item.bgColor ?? 'bg-slate-50';
            const iconBgValue = item.iconBgColor ?? 'bg-slate-900';
            const bgTailwind = isTailwindClass(bgValue) ? bgValue : '';
            const bgStyle = getColorStyle(bgValue);
            const iconBgTailwind = isTailwindClass(iconBgValue) ? iconBgValue : '';
            const iconBgStyle = getColorStyle(iconBgValue);

            return (
              <div
                key={`${item.title}-${idx}`}
                className={[
                  'relative overflow-visible rounded-3xl px-6 pb-8 pt-12 shadow-sm',
                  'ring-1 ring-black/5',
                  'transition-transform duration-200 hover:-translate-y-1',
                  bgTailwind,
                ].join(' ')}
                style={bgStyle}
              >
                {/* Icon Bubble */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={[
                      'grid h-16 w-16 place-items-center rounded-full',
                      'ring-4 ring-white shadow-md',
                      iconBgTailwind,
                    ].join(' ')}
                    style={iconBgStyle}
                  >
                    {item.iconImage?.src ? (
                      <Image
                        src={resolveImageUrl(item.iconImage.src)}
                        alt={item.iconImage.alt || item.title|| 'Image'}
                        className="h-8 w-8 object-contain"
                        loading="lazy"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <span className="text-xs font-semibold text-white">
                        Icon
                      </span>
                    )}
                  </div>
                </div>

                {/* Text */}
                <div className="text-center">
               

                  <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
                    <strong>{item.title} </strong> {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
