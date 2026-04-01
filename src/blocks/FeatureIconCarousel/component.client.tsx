'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { resolveImageUrl } from '@/lib/imageResolver';

export type PBImage = {
  src?: string;
  alt?: string;
};

export type FeatureIconCarouselItem = {
  title: string;
  iconImage?: PBImage;
  iconAlt?: string;
};

export interface FeatureIconCarouselProps {
  items?: FeatureIconCarouselItem[];
  showArrows?: boolean;
  backgroundColor?: string;
  cardBorderColor?: string;
  iconColor?: string;
}

const DEFAULT_ITEMS: FeatureIconCarouselItem[] = [
  { title: 'Reminder' },
  { title: 'Patient Recall' },
  { title: 'Adit Pay' },
  { title: 'Practice Analytics' },
  { title: 'Health Score' },
  { title: 'Digital Marketing' },
];

const isTailwindColorClass = (value?: string) =>
  Boolean(value && (value.startsWith('bg-') || value.startsWith('border-') || value.startsWith('text-')));

const getColorStyle = (
  value: string | undefined,
  property: 'backgroundColor' | 'borderColor' | 'color'
): React.CSSProperties | undefined => {
  if (!value || isTailwindColorClass(value)) return undefined;
  return { [property]: value };
};

const FeatureIconCarousel: React.FC<FeatureIconCarouselProps> = ({
  items = DEFAULT_ITEMS,
  showArrows = true,
  backgroundColor = 'bg-white',
  cardBorderColor = 'border-sky-200',
  iconColor = 'text-slate-800',
}) => {
  const list = items?.length ? items : DEFAULT_ITEMS;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sectionBgClass = isTailwindColorClass(backgroundColor) ? backgroundColor : '';
  const sectionBgStyle = getColorStyle(backgroundColor, 'backgroundColor');

  const cardBorderClass = isTailwindColorClass(cardBorderColor) ? cardBorderColor : '';
  const cardBorderStyle = getColorStyle(cardBorderColor, 'borderColor');

  const iconColorClass = isTailwindColorClass(iconColor) ? iconColor : '';
  const iconColorStyle = getColorStyle(iconColor, 'color');

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 2);
  };

  useEffect(() => {
    updateScrollState();
    const onResize = () => updateScrollState();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [list.length]);

  const handleScroll = () => updateScrollState();

  const scrollByAmount = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(220, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  const cards = useMemo(
    () =>
      list.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className={[
            'snap-start shrink-0',
            'w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]',
            'rounded-3xl border bg-white',
            'px-4 py-6 sm:px-5 sm:py-7',
            'shadow-[0_6px_18px_rgba(15,23,42,0.08)]',
            cardBorderClass,
          ]
            .filter(Boolean)
            .join(' ')}
          style={cardBorderStyle}
        >
          <div className="mx-auto grid h-12 w-12 place-items-center sm:h-14 sm:w-14">
            {item.iconImage?.src ? (
              <Image
                src={resolveImageUrl(item.iconImage.src)}
                alt={item.iconAlt || item.title || 'Image'}
                width={56}
                height={56}
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                loading="lazy"
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-10 w-10 sm:h-12 sm:w-12 ${iconColorClass}`}
                style={iconColorStyle}
                aria-hidden
              >
                <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.66-6.66-2.12 2.12M8.46 15.54l-2.12 2.12M16.95 16.95l-2.12-2.12M8.46 8.46 6.34 6.34" />
                <circle cx="12" cy="12" r="3.5" />
              </svg>
            )}
          </div>
          <p className="mt-4 text-center text-sm font-semibold text-slate-900 sm:text-base">
            {item.title}
          </p>
        </div>
      )),
    [list, cardBorderClass, cardBorderStyle, iconColorClass, iconColorStyle]
  );

  return (
    <section className={sectionBgClass} style={sectionBgStyle}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative py-6 sm:py-8">
          {showArrows && (
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByAmount(-1)}
              disabled={!canScrollLeft}
              className={[
                'hidden sm:grid place-items-center',
                'absolute left-0 top-1/2 -translate-y-1/2',
                'h-10 w-10 rounded-full border border-slate-200 bg-white',
                'shadow-md transition opacity-80 hover:opacity-100',
                'disabled:opacity-40 disabled:cursor-not-allowed',
              ].join(' ')}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {showArrows && (
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByAmount(1)}
              disabled={!canScrollRight}
              className={[
                'hidden sm:grid place-items-center',
                'absolute right-0 top-1/2 -translate-y-1/2',
                'h-10 w-10 rounded-full border border-slate-200 bg-white',
                'shadow-md transition opacity-80 hover:opacity-100',
                'disabled:opacity-40 disabled:cursor-not-allowed',
              ].join(' ')}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-2 sm:px-12"
          >
            {cards}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureIconCarousel;
