'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { SlideItem } from './config';

export type AditSliderProps = {
  id?: string;
  slides?: SlideItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  className?: string;
};

/* ------------------------------------------------------------ */
/* Helper for CMS / builder data                                 */
/* ------------------------------------------------------------ */
const getText = (v: any): string => {
  if (!v) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  if (typeof v === 'object') {
    return v.text || v.value || v.title || v.name || '';
  }
  return '';
};

const AditSlider: React.FC<AditSliderProps> = ({
  slides = [],
  autoplay = true,
  autoplayInterval = 7000,
  showDots = true,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const [index, setIndex] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);

  /* ------------------------------------------------------------ */
  /* Normalize slides                                             */
  /* ------------------------------------------------------------ */
  const slidesArr = useMemo<SlideItem[]>(() => {
    if (Array.isArray(slides)) return slides;
    if (slides && typeof slides === 'object') return Object.values(slides);
    return [];
  }, [slides]);

  const slideCount = slidesArr.length;

  /* ------------------------------------------------------------ */
  /* Infinite loop slides (React-safe clones)                     */
  /* ------------------------------------------------------------ */
  const renderedSlides = useMemo(() => {
    if (slideCount === 0) return [];
    return [
      slidesArr[slideCount - 1],
      ...slidesArr,
      slidesArr[0],
    ];
  }, [slidesArr, slideCount]);

  /* ------------------------------------------------------------ */
  /* Autoplay                                                     */
  /* ------------------------------------------------------------ */
  useEffect(() => {
    if (!autoplay || slideCount <= 1) return;

    timerRef.current = globalThis.setInterval(() => {
      setIndex((i) => i + 1);
    }, autoplayInterval) as unknown as number;

    return () => {
      if (timerRef.current) {
        globalThis.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoplay, autoplayInterval, slideCount]);

  /* ------------------------------------------------------------ */
  /* Infinite jump handling                                       */
  /* ------------------------------------------------------------ */
  useEffect(() => {
    if (!renderedSlides.length) return;

    if (index === renderedSlides.length - 1) {
      setTimeout(() => {
        setEnableTransition(false);
        setIndex(1);
      }, 500);
    }

    if (index === 0) {
      setTimeout(() => {
        setEnableTransition(false);
        setIndex(renderedSlides.length - 2);
      }, 500);
    }
  }, [index, renderedSlides.length]);

  useEffect(() => {
    if (!enableTransition) {
      requestAnimationFrame(() => setEnableTransition(true));
    }
  }, [enableTransition]);

  /* ------------------------------------------------------------ */
  /* Render                                                       */
  /* ------------------------------------------------------------ */
  return (
    <div
      className={`relative bg-white rounded-3xl border border-orange-200 shadow-md overflow-hidden ${className}`}
    >
      {/* SLIDES */}
      <div
        ref={trackRef}
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: enableTransition
            ? 'transform 500ms ease-out'
            : 'none',
        }}
      >
        {renderedSlides.map((s, i) => (
          <article
            key={`${s?.id ?? 'slide'}-${i}`}
            className="shrink-0 w-full p-6 md:p-10 box-border"
          >
            <header className="mb-4">
              <h3 className="text-xl font-semibold text-slate-900">
                {getText(s?.author)}
              </h3>
              <p className="text-sm text-sky-700">
                {getText(s?.org)}
              </p>
            </header>

            <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-8">
              {getText(s?.content)}
            </p>

            <footer>
              <span className="text-sm font-semibold text-slate-700">
                {s?.rating ? '★'.repeat(Number(s.rating)) : 'Capterra'}
              </span>
            </footer>
          </article>
        ))}
      </div>

      {/* DOTS */}
      {showDots && slideCount > 1 && (
        <div className="flex justify-center gap-3 py-4 bg-orange-50">
          {slidesArr.map((s, i) => {
            const active = (index - 1 + slideCount) % slideCount === i;
            return (
              <button
                key={s?.id ? `dot-${s.id}` : `dot-${i}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i + 1)}
                className={`w-3 h-3 rounded-full border transition-colors ${
                  active
                    ? 'bg-orange-400 border-orange-400'
                    : 'bg-orange-100 border-orange-300'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AditSlider;
