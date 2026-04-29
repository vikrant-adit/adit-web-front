/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { KeyboardEvent } from 'react';
import Image from 'next/image';
import { useEditorGlow } from '@/hooks/useEditorGlow';
import { getStrapiImagesUrl } from '@/lib/defaults';

export interface ReviewCardProps {
  title?: string;
  subtitle?: string;
  rating?: number;
  maxStars?: number;
  starSize?: number;
  starColor?: string;
  iconSrc?: string;
  iconAlt?: string;
  href?: string;
  editable?: boolean;
  onChange?: (next: Partial<ReviewCardProps>) => void;

  // NEW: separate width & height control (px)
  iconWidth?: number;
  iconHeight?: number;

  // Backwards-compatible legacy prop (optional)
  iconSize?: number;

  // Optionally constrain icon max width inside flex layout
  iconMaxWidth?: number;
  isGlobal?: boolean;
  globalKey?: string;
}

/** simple star SVG generator; returns partial fill using gradient mask */
function StarSvg({ fill = 1, size = 20 }: Readonly<{ fill: number; size: number }>) {
  const baseId = React.useId();
  const id = `mask-${baseId.replaceAll(':', '')}`;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      <defs>
        <linearGradient id={id} x1="0%" x2="100%">
          <stop offset={`${Math.max(0, Math.min(100, fill * 100))}%`} stopColor="currentColor" />
          <stop
            offset={`${Math.max(0, Math.min(100, fill * 100))}%`}
            stopColor="transparent"
            stopOpacity="1"
          />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        stroke="currentColor"
        strokeWidth="0.6"
        d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.172L12 18.897 4.664 23.17l1.402-8.172L.132 9.209l8.2-1.192z"
      />
    </svg>
  );
}

function clamp(n: number, a = 0, b = 5) {
  return Math.max(a, Math.min(b, n));
}

export default function ReviewCard({
  title = 'Brand',
  subtitle = '4.6 rating',
  rating = 4.6,
  maxStars = 5,
  starSize = 18,
  starColor = '#F5A623',
  iconSrc = '',
  iconAlt = 'Logo',
  href = '',
  editable = false,
  onChange,
  // NEW props
  iconWidth,
  iconHeight,
  // legacy fallback
  iconSize = 48,
  iconMaxWidth = 80,
    isGlobal

}: ReviewCardProps) {
  const { shouldGlow } = useEditorGlow(isGlobal);
  
  // Use explicit width/height if provided, otherwise fall back to iconSize for compatibility
  const w = typeof iconWidth === 'number' ? iconWidth : iconSize;
  const h = typeof iconHeight === 'number' ? iconHeight : iconSize;

  const normalizedRating = clamp(Number(rating) || 0, 0, maxStars);

  const stars = Array.from({ length: maxStars }).map((_, i) => {
    const index = i + 1;
    const diff = normalizedRating - (index - 1);
    const fill = clamp(diff, 0, 1);
    return { index, fill };
  });

  const onStarKey = (e: KeyboardEvent, idx: number) => {
    if (!editable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange?.({ rating: idx });
    }
  };

  const showIcon = Boolean(iconSrc);
  const iconContainerStyle: React.CSSProperties = {
    width: w,
    height: h,
    minWidth: w,
    minHeight: h,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.round(Math.min(w, h) * 0.12),
    overflow: 'hidden',
    background: '#ffffff',
    // boxShadow: '0 1px 2px rgba(16,24,40,0.05)',
    padding: Math.max(2, Math.round(Math.min(w, h) * 0.08)),
  };

  let resolvedImageSrc = '';
  if (iconSrc) {
    if (iconSrc.startsWith('http')) {
      resolvedImageSrc = iconSrc;
    } else {
      resolvedImageSrc = `${getStrapiImagesUrl()}${iconSrc}`;
    }
  }

  const cardContent = (
    <article
      className={`review-card rounded-md border p-1 flex flex-col items-center  bg-white ${shouldGlow ? 'editor-global-glow' : ''}`}
      style={{ maxWidth: 420 }}
    >
      {/* Icon / logo column */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: iconMaxWidth }}>
        {showIcon ? (
          <div style={iconContainerStyle} className="flex-shrink-0">
            {typeof iconSrc === 'string' && iconSrc.startsWith('data:') ? (
              <Image
                src={`${getStrapiImagesUrl()}${iconSrc}`}
                alt={iconAlt || title|| 'Image'}
                width={80}
                height={80}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                unoptimized
              />
            ) : (
              // Use Next/Image with explicit width/height but let CSS size to container using width:100%/height:100%
              <Image
                src={resolvedImageSrc}
                alt={iconAlt || title|| 'Image'}
                width={w}
                height={h}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                unoptimized
              />
            )}
          </div>
        ) : (
          <div style={{ ...iconContainerStyle, background: '#f8fafc', color: '#94a3b8' }} aria-hidden>
            <svg
              width={Math.round(Math.min(w, h) * 0.6)}
              height={Math.round(Math.min(w, h) * 0.6)}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 2l2.09 6.26L20 9.27l-5 3.73L16.18 20 12 16.9 7.82 20 9 13 4 9.27l5.91-.01L12 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content column */}
      <div style={{ flex: 1 }}>
        <div className="flex items-start flex-col justify-between">
          <div style={{ flex: '1 1 auto' }}>
           
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
          <span
  aria-label={`Rating: ${normalizedRating} out of ${maxStars}`}
  className="inline-flex items-center gap-1"
  style={{ color: starColor }}
>
              {stars.map((s) => (
                <button
                  key={s.index}
                  onClick={() => editable && onChange?.({ rating: s.index })}
                  onKeyDown={(e) => onStarKey(e, s.index)}
                  title={`${s.index} star${s.index > 1 ? 's' : ''}`}
                  tabIndex={editable ? 0 : -1}
                  aria-pressed={Math.round(normalizedRating) === s.index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 0,
                    padding: 0,
                    margin: 0,
                    cursor: editable ? 'pointer' : 'default',
                    color: starColor,
                  }}
                >
                  <StarSvg fill={s.fill} size={starSize} />
                </button>
              ))}
            </span>

            <div className="text-sm text-slate-700" style={{ minWidth: 36, textAlign: 'right' }}>
              {Number(normalizedRating).toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
      {cardContent}
    </a>
  ) : (
    cardContent
  );
}
