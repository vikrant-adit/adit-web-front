'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';
import Image from 'next/image';
import { getStrapiImagesUrl } from '@/lib/defaults';

export type CarouselImage = {
  src?: string;
  alt?: string;
  caption?: string;
  href?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonNewTab?: boolean;
};

export interface ImageCarouselProps {
  id?: string;
  title?: string;
  subtitle?: string;
  images?: CarouselImage[];
  backgroundColor?: string;
  fontColor?: string;
  titleColor?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleSize?: number;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  maxHeight?: number;
  gap?: number;
  isGlobal?: boolean;
}

const isTailwindClass = (s?: string) =>
  typeof s === 'string' && /^[a-z0-9:-]+$/i.test(s);

const getImageSrc = (src?: string) => {
  if (!src) return '';
  return `${getStrapiImagesUrl()}${src}`;
};

const getImageKey = (img: CarouselImage, idx: number) =>
  img.src || img.href || `carousel-${idx}`;

export default function ImageCarousel({
  id = 'image-carousel',
  title = '',
  subtitle = '',
  images = [],
  backgroundColor = 'transparent',
  fontColor = '#0f172a',
  titleColor,
  titleAlign = 'center',
  titleSize = 28,
  showDots = true,
  autoplay = false,
  autoplayInterval = 4000,
  maxHeight = 320,
  gap = 24,
  isGlobal,
}: Readonly<ImageCarouselProps>) {
  const { shouldGlow } = useEditorGlow(isGlobal);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const safeImages = useMemo(() => (Array.isArray(images) ? images : []), [images]);

  // ---------- SCROLL ----------
  const scrollToIndex = (idx: number) => {
    const container = trackRef.current;
    if (!container) return;

    const child = container.children[idx] as HTMLElement;
    if (!child) return;

    const offset =
      child.offsetLeft - container.offsetLeft;

    container.scrollTo({ left: offset, behavior: 'smooth' });
  };

  // ---------- AUTOPLAY ----------
  useEffect(() => {
    if (!autoplay || safeImages.length <= 1 || isInteracting) return;

    const t = setInterval(() => {
      const next = (current + 1) % safeImages.length;
      scrollToIndex(next);
      setCurrent(next);
    }, autoplayInterval);

    return () => clearInterval(t);
  }, [autoplay, autoplayInterval, safeImages.length, current, isInteracting]);

  // ---------- DOT CLICK ----------
  const handleDotClick = (idx: number) => {
    setIsInteracting(true);
    scrollToIndex(idx);
    setCurrent(idx);

    globalThis.setTimeout(() => setIsInteracting(false), 500);
  };

  // ---------- ACCESSIBILITY ----------
  const handleKeyNav = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDotClick(idx);
    }
  };

  // ---------- STYLES ----------
  const bgClass = isTailwindClass(backgroundColor) ? backgroundColor : '';
  const wrapperStyle = bgClass ? {} : { background: backgroundColor };

  const titleStyle = {
    color: titleColor,
    fontSize: `clamp(20px, 4vw, ${titleSize}px)`,
  };

  let alignItems = 'center';
  if (titleAlign === 'left') {
    alignItems = 'flex-start';
  } else if (titleAlign === 'right') {
    alignItems = 'flex-end';
  }

  // ---------- RENDER ----------
  return (
    <div
      id={id}
      className={`image-carousel ${bgClass} ${
        shouldGlow ? 'editor-global-glow' : ''
      }`}
      style={wrapperStyle}
    >
      {(title || subtitle) && (
        <div style={{ alignItems }}>
          {title && <h3 style={titleStyle}>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}

      <div
        ref={trackRef}
        className="carousel-track flex overflow-x-auto"
        style={{ gap }}
      >
        {safeImages.map((img, idx) => {
          const src = getImageSrc(img.src);
          const key = getImageKey(img, idx);

          return (
            <div key={key} className="carousel-item">
              <Image
                src={src}
                alt={img.alt || `Slide ${idx + 1}`}
                width={800}
                height={320}
                style={{ objectFit: 'cover', width: '100%' }}
              />
            </div>
          );
        })}
      </div>

      {showDots && safeImages.length > 1 && (
        <div className="flex justify-center gap-2 p-2">
          {safeImages.map((img, i) => {
            const key = getImageKey(img, i);
            return (
              <button
                key={`dot-${key}`}
                type="button"
                onClick={() => handleDotClick(i)}
                onKeyDown={(e) => handleKeyNav(e, i)}
                aria-label={`Go to slide ${i + 1}`}
                className="w-2 h-2 rounded-full"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}