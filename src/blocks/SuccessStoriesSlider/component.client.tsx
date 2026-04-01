'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { resolveImageUrl } from '@/lib/imageResolver';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export interface CaseStudyItem {
  image?: {
    src?: string;
    alt?: string;
  };
  description?: string;
  highlight?: string;
  linkText?: string;
  linkUrl?: string;
  accentColor?: string;
}

export interface CaseStudySliderProps {
  items?: CaseStudyItem[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
  isGlobal?: boolean;
  globalKey?: string;
}

const CaseStudySlider: React.FC<CaseStudySliderProps> = ({
  items = [],
  autoScroll = true,
  autoScrollInterval = 3500,
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🔁 Auto scroll
  useEffect(() => {
    if (!autoScroll || !containerRef.current) return;

    const el = containerRef.current;
    const timer = setInterval(() => {
      el.scrollBy({ left: 360, behavior: 'smooth' });

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [autoScroll, autoScrollInterval]);

  const scroll = (dir: 'left' | 'right') => {
    containerRef.current?.scrollBy({
      left: dir === 'left' ? -360 : 360,
      behavior: 'smooth',
    });
  };

  return (
    <section className={shouldGlow ? 'editor-global-glow' : ''}>
      <div className="relative max-w-[1300px] mx-auto px-3 sm:px-6 md:px-8">
        {/* Slider */}
        <div
          ref={containerRef}
          className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide py-4 sm:py-6"
        >
          {items.map((item, i) => {
            const hasImage = Boolean(item.image?.src);
            console.log('Rendering item', i, item);
            return (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] max-w-[280px] sm:max-w-[300px] md:max-w-[320px] snap-center bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg px-4 sm:px-6 py-6 sm:py-8 text-center flex flex-col justify-between"
              >
                {/* Image */}
                {hasImage ? (
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <Image
                      src={resolveImageUrl(item.image!.src)}
                      alt={item.image?.alt || 'Case Study Logo'}
                      width={160}
                      height={48}
                      unoptimized
                      className="object-contain max-h-10 sm:max-h-12"
                    />
                  </div>
                ) : (
                  <div className="h-10 sm:h-12 mb-3 sm:mb-4" />
                )}

                {/* Text */}
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  {item.description}{' '}
                  {item.highlight && (
                    <span className="font-semibold text-gray-900">
                      {item.highlight}
                    </span>
                  )}
                </p>

                {/* CTA */}
                <a
                  href={item.linkUrl || '#'}
                  className="inline-flex items-center justify-center gap-2 font-medium text-gray-900"
                >
                  {item.linkText || 'Read More'}
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                    style={{
                      backgroundColor: item.accentColor || '#3b82f6',
                    }}
                  >
                    →
                  </span>
                </a>

                {/* Accent line */}
                <div
                  className="h-1 w-full mt-6 rounded-full"
                  style={{
                    backgroundColor: item.accentColor || '#3b82f6',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-blue-400 flex items-center justify-center text-blue-500 hover:bg-blue-50"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-blue-400 flex items-center justify-center text-blue-500 hover:bg-blue-50"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySlider;
