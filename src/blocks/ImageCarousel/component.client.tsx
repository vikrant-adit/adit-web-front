/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';
import Image from 'next/image';
export type CarouselImage = {
  src?: string; // absolute url or relative (/uploads/..)
  alt?: string;
  caption?: string;
  href?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonNewTab?: boolean;
};

export interface ImageCarouselProps {
  id?: string;

  // content
  title?: string;
  subtitle?: string;

  images?: CarouselImage[];

  // appearance
  backgroundColor?: string; // Tailwind class like 'bg-white' OR css color '#fff'
  fontColor?: string; // css color or tailwind text-*
  titleColor?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleSize?: number; // px

  showIndex?: boolean; // show overlay index like "1 / 4"
  showDots?: boolean; // little dots under carousel
  autoplay?: boolean;
  autoplayInterval?: number; // ms
  maxHeight?: number; // px
  gap?: number; // px gap between items in scroll
    isGlobal?: boolean;
  globalKey?: string;
}

const isTailwindClass = (s?: string) => typeof s === 'string' && /^[a-z0-9:-]+$/i.test(s);

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
  showIndex = true,
  showDots = true,
  autoplay = false,
  autoplayInterval = 4000,
  maxHeight = 320,
  gap = 24,
  isGlobal
}: ImageCarouselProps) {
  const { shouldGlow } = useEditorGlow(isGlobal);
  
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // Drag state
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const lastPointerId = useRef<number | null>(null);

  // Autoplay (pauses during interactions)
  useEffect(() => {
    if (!autoplay || images.length <= 1) return;
    if (isInteracting) return;

    const t = setInterval(() => {
      const nextIdx = (current + 1) % images.length;
      scrollToIndex(nextIdx);
      setCurrent(nextIdx);
    }, autoplayInterval);

    return () => clearInterval(t);
  }, [autoplay, autoplayInterval, images.length, current, isInteracting]);

  // When user scrolls manually, update current index
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(container.children) as HTMLElement[];
        if (!children.length) return;
        const containerRect = container.getBoundingClientRect();
        let bestIdx = 0;
        let bestDiff = Infinity;
        children.forEach((ch, idx) => {
          const rect = ch.getBoundingClientRect();
          const diff = Math.abs(rect.left - containerRect.left);
          if (diff < bestDiff) {
            bestDiff = diff;
            bestIdx = idx;
          }
        });
        setCurrent(bestIdx);
      });
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // deterministic scroll to slide index
  const scrollToIndex = (idx: number) => {
    const container = trackRef.current;
    if (!container) return;
    const child = container.children[idx] as HTMLElement | undefined;
    if (!child) return;
    const containerRect = container.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    const left = childRect.left - containerRect.left + container.scrollLeft;
    container.scrollTo({ left, behavior: 'smooth' });
  };

  // dot click handler — non-invasive
  const onDotClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInteracting(true);
    scrollToIndex(idx);
    setCurrent(idx);
    window.setTimeout(() => setIsInteracting(false), 600);
  };

  // Pointer / drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    // stop propagation so global handlers won't react
    e.stopPropagation();

    const container = trackRef.current;
    if (!container) return;

    lastPointerId.current = e.pointerId;
    try {
      (e.target as Element).setPointerCapture?.(e.pointerId);
    } catch {
      /* ignore if capture fails */
    }

    dragging.current = true;
    setIsInteracting(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = container.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const container = trackRef.current;
    if (!container || !dragging.current) return;

    e.preventDefault();
    e.stopPropagation();

    const dx = e.clientX - dragStartX.current;
    container.scrollLeft = dragStartScroll.current - dx;
  };

  const endDrag = () => {
    if (!dragging.current) {
      setIsInteracting(false);
      return;
    }

    // attempt to release pointer capture if we stored a pointer id
    const container = trackRef.current;
    if (container && lastPointerId.current !== null) {
      try {
        container.releasePointerCapture?.(lastPointerId.current);
      } catch {
        // ignore if not supported
      }
    }

    dragging.current = false;
    lastPointerId.current = null;

    // snap to nearest child
    if (!container) {
      setIsInteracting(false);
      return;
    }
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) {
      setIsInteracting(false);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    let bestIdx = 0;
    let bestDiff = Infinity;
    children.forEach((ch, idx) => {
      const rect = ch.getBoundingClientRect();
      const diff = Math.abs(rect.left - containerRect.left);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIdx = idx;
      }
    });
    scrollToIndex(bestIdx);
    setCurrent(bestIdx);

    // restore interaction flag after transition
    window.setTimeout(() => setIsInteracting(false), 400);
  };

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    // pointerup / pointercancel handlers use the generic Event type to satisfy addEventListener signatures
    const onPointerUpOrCancel = (ev: Event) => {
      // stopPropagation to avoid global handlers
      ev.stopPropagation();
      endDrag();
    };

    // mouseleave should be a MouseEvent — we don't need the event object in endDrag, so call endDrag directly
    const onMouseLeave = (ev: MouseEvent) => {
      ev.stopPropagation();
      endDrag();
    };

    container.addEventListener('pointerup', onPointerUpOrCancel);
    container.addEventListener('pointercancel', onPointerUpOrCancel);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('pointerup', onPointerUpOrCancel);
      container.removeEventListener('pointercancel', onPointerUpOrCancel);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // css helpers
  const bgClass = isTailwindClass(backgroundColor) ? backgroundColor : '';
  const wrapperStyle: React.CSSProperties = !bgClass && backgroundColor ? { background: backgroundColor } : {};
  const titleStyle: React.CSSProperties = {
    color: titleColor && !isTailwindClass(titleColor) ? titleColor : undefined,
    fontSize: `clamp(20px, 4vw, ${titleSize}px)`,
    margin: 0,
    lineHeight: 1.1,
  };
  const subtitleStyle: React.CSSProperties = {
    color: isTailwindClass(fontColor) ? undefined : fontColor,
    margin: '6px 0 0 0',
    fontSize: 'clamp(12px, 2vw, 16px)',
    opacity: 0.9,
  };

  return (
    <div id={id} className={`image-carousel relative ${bgClass} ${shouldGlow ? 'editor-global-glow' : ''}`} style={{ ...wrapperStyle, paddingBottom: 8 }}>
      {/* Title area */}
      {(title || subtitle) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: titleAlign === 'left' ? 'flex-start' : titleAlign === 'right' ? 'flex-end' : 'center',
            padding: 'clamp(8px, 2vw, 16px) clamp(12px, 3vw, 24px)',
          }}
        >
          {title ? <h3 className="carousel-title" style={titleStyle}>{title}</h3> : null}
          {subtitle ? <div className="carousel-subtitle" style={subtitleStyle}>{subtitle}</div> : null}
        </div>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className={`carousel-track overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth ${dragging.current ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          display: 'flex',
          gap: `clamp(12px, ${gap * 0.5}px, ${gap}px)`,
          padding: 'clamp(12px, 2.5vw, 24px)',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          alignItems: 'center',
          userSelect: 'none',
          touchAction: 'pan-y', // allow vertical page scroll but capture horizontal pan
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        // stop propagation on clicks inside track to avoid global handlers
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {images.map((img, idx) => {
          const src = img?.src || '';
          const isLinked = !!img?.href || !!img?.buttonLink;
          return (
            <div
              key={idx}
              className="carousel-item"
              style={{
                flex: '0 0 auto',
                width: 'min(auto, auto)',
                maxWidth: '100%',
                scrollSnapAlign: 'start',
                borderRadius: 12,
                overflow: 'hidden',
                background: '#ffffff',
                boxShadow: '0 6px 18px rgba(2,6,23,0.08)',
                position: 'relative',
                maxHeight,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Index overlay */}
              
              {/* Image (linkable) */}
              {isLinked ? (
                <a
                  href={img!.href || img!.buttonLink || '#'}
                  target={img!.buttonNewTab ? '_blank' : undefined}
                  rel={img!.buttonNewTab ? 'noreferrer' : undefined}
                  onClick={(e) => {
                    // allow the link to work but prevent global handlers
                    e.stopPropagation();
                  }}
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ width: '100%', height: maxHeight, display: 'block', position: 'relative' }}>
                    <Image unoptimized src={`${process.env.STRAPI_API_FOR_IMAGES}${src}`} alt={img?.alt || `Slide ${idx + 1}`} width={800} height={320} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block'  }} />
                  </div>
                </a>
              ) : (
                <div style={{ width: '100%', height: maxHeight }}>
                  <Image unoptimized src={`${process.env.STRAPI_API_FOR_IMAGES}${src}`} alt={img?.alt || `Slide ${idx + 1}`} width={800} height={320} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              )}

              {/* caption + cta area */}
              <div style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  {img?.caption ? (
                    <div style={{ marginBottom: 6, color: isTailwindClass(fontColor) ? undefined : fontColor }}>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{img.caption}</div>
                    </div>
                  ) : null}
                </div>

                {/* keep CTA clickable but won't interfere with drag logic */}
                {img?.buttonText ? (
                  <div style={{ flex: '0 0 auto' }}>
                    <a
                      href={img.buttonLink || img.href || '#'}
                      target={img.buttonNewTab ? '_blank' : undefined}
                      rel={img.buttonNewTab ? 'noreferrer' : undefined}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="carousel-cta"
                      style={{
                        display: 'inline-block',
                        padding: '8px 14px',
                        borderRadius: 8,
                        background: isTailwindClass(fontColor) ? undefined : fontColor,
                        color: '#fff',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      {img.buttonText}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      {showDots && images.length > 1 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', padding: 8 }}>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => onDotClick(e, i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                border: 'none',
                background: i === current ? (isTailwindClass(fontColor) ? undefined : fontColor) : 'rgba(0,0,0,0.14)',
                opacity: i === current ? 1 : 0.6,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
