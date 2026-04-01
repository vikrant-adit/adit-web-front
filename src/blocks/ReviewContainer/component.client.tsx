// blocks/ReviewContainer/component.client.tsx
'use client';
import React from 'react';
import ReviewCard from '../ReviewCard/component.client';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export type ReviewItem = {
  id?: string | number;
  title?: string;
  subtitle?: string;
  rating?: number;
  maxStars?: number;
  starSize?: number;
  starColor?: string;
  iconSrc?: string;
  iconAlt?: string;
  href?: string;
};

export type ReviewContainerProps = {
  items?: ReviewItem[];
  gap?: number; // px
  align?: 'left' | 'center' | 'right';
  wrap?: boolean; // allow wrapping on small screens
  editable?: boolean; // if container is rendered inside editor canvas
  isGlobal?: boolean;
  globalKey?: string;
};

export default function ReviewContainerClient({
  items = [],
  gap = 24,
  align = 'center',
  wrap = true,
  editable = false,
  isGlobal
}: ReviewContainerProps) {
  const { shouldGlow } = useEditorGlow(isGlobal);
  
  const justify =
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap,
    justifyContent: justify,
    alignItems: 'center',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    width: '100%',
  };

  return (
    <div className={`review-container ${shouldGlow ? 'editor-global-glow' : ''}`} style={containerStyle}>
      {(items || []).map((it, idx) => (
        <div key={it.id ?? `${idx}-${String(it.title).slice(0, 8)}`} style={{ flex: '0 0 auto' }}>
          {/* Pass editable flag to child so it can be interactive in editor */}
          <ReviewCard
            title={it.title}
            subtitle={it.subtitle}
            rating={typeof it.rating === 'number' ? it.rating : Number(it.rating ?? 0)}
            maxStars={it.maxStars ?? 5}
            starSize={it.starSize ?? 18}
            starColor={it.starColor ?? '#F5A623'}
            iconSrc={it.iconSrc ?? ''}
            iconAlt={it.iconAlt ?? it.title ?? 'Logo'}
            href={it.href ?? ''}
            editable={editable}
            // When interactive editing happens, ReviewCard will call onChange — but
            // we do not set a handler here. The page-builder UI will edit the item fields directly.
          />
        </div>
      ))}
    </div>
  );
}
