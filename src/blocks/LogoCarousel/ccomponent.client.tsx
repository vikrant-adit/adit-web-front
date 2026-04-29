/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEditorGlow } from '@/hooks/useEditorGlow';
import { getStrapiImagesUrl } from '@/lib/defaults';

export type LogoCarouselItem = {
  id?: string | number;
  logo?: string; // already normalized to string in config.render
  alt?: string;
  href?: string;
};

export interface LogoCarouselProps {
  items?: LogoCarouselItem[];
  backgroundColor?: string;
  height?: string;
  showArrows?: boolean;
  autoScroll?: boolean;
  scrollSpeed?: number; // px per frame
  // New props for styling
  imageBorder?: string; 
  imageShadow?: string;
    isGlobal?: boolean;
  globalKey?: string;
}

const resolveLogoSrc = (logo?: string): string => {
  if (!logo) return '';
  if (logo.startsWith('http://') || logo.startsWith('https://')) return logo;
  return `${getStrapiImagesUrl() || ''}${logo}`;
};

const LogoCarousel: React.FC<LogoCarouselProps> = ({
  items = [],
  backgroundColor = '#E6F7FF',
  height = 'auto',
  showArrows = true,
  autoScroll = true,
  scrollSpeed = 0.5,
  // Default values
  imageBorder,
  imageShadow,
  isGlobal
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);
  
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const normalizedItems = (items || []).filter((it) => !!it.logo);
  // duplicate for infinite loop
  const loopItems = [...normalizedItems, ...normalizedItems];

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.1;
    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // 🔁 auto-scroll with seamless loop
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !autoScroll || loopItems.length === 0) return;

    let frameId: number | null = null;

    const step = () => {
      if (!container) return;

      if (!isHovering) {
        container.scrollLeft += scrollSpeed;

        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft = 0;
        }
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [autoScroll, scrollSpeed, isHovering, loopItems.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('touchstart', onEnter, { passive: true });
    container.addEventListener('touchend', onLeave, { passive: true });

    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('touchstart', onEnter);
      container.removeEventListener('touchend', onLeave);
    };
  }, []);

  if (!normalizedItems.length) return null;

  return (
    <div
      className={`w-full flex items-center justify-center ${shouldGlow ? 'editor-global-glow' : ''}`}
      style={{ backgroundColor, height }}
    >
      <div className="relative w-full max-w-6xl px-2 sm:px-4 py-3 sm:py-4 flex items-center">
        {/* Left arrow */}
        {showArrows && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="hidden md:flex items-center justify-center h-9 sm:h-10 w-9 sm:w-10 rounded-full border border-slate-700 bg-white/80 shadow-sm mr-2 sm:mr-4 shrink-0 z-10"
          >
            <span className="text-lg sm:text-xl leading-none">&#8592;</span>
          </button>
        )}

        {/* Scrollable logos */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-4 sm:gap-8 md:gap-12 no-scrollbar"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {loopItems.map((item, idx) => {
            const key = item.id ?? `${idx}-${item.logo}`;
            const src = resolveLogoSrc(item.logo);

            const imageNode = (
              <Image
                src={src}
                alt={item.alt || 'Integration logo'}
                width={60}
                height={48}
                className="h-8 sm:h-10 md:h-12 lg:h-12 w-auto object-contain block flex-shrink-0"
                style={{
                    border: imageBorder, 
                    boxShadow: imageShadow,
                    borderRadius: imageBorder || imageShadow ? '4px' : undefined,
                    padding: imageBorder || imageShadow ? '4px' : undefined,
                    backgroundColor: imageBorder || imageShadow ? 'white' : undefined
                }}
                unoptimized
              />
            );

            return (
              <div
                key={key}
                className="shrink-0 flex items-center justify-center"
              >
                {item.href ? (
                  <Link href={item.href} target="_blank">
                    {imageNode}
                  </Link>
                ) : (
                  imageNode
                )}
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        {showArrows && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="hidden md:flex items-center justify-center h-10 w-10 rounded-full border border-slate-700 bg-white/80 shadow-sm ml-4 shrink-0 z-10"
          >
            <span className="text-xl leading-none">&#8594;</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LogoCarousel;