/* eslint-disable @typescript-eslint/no-explicit-any */
/* TeamCarousel.component.client.tsx */
'use client';
import { useEditorGlow } from '@/hooks/useEditorGlow';
import { resolveImageUrl } from '@/lib/imageResolver';
import Image from 'next/image';
import React from 'react';

export type TeamMember = {
  id?: string | number;
  image?: string | { url?: string; src?: string; alt?: string } | null;
  name?: string;
  role?: string;
};

export type TeamCarouselProps = {
  eyebrow?: string;
  title?: string;
  items?: TeamMember[];
  columns?: number;
  gap?: number;
  circleSize?: string; // tailwind classes e.g. 'w-36 h-36'
  padding?: string; // tailwind classes
  background?: string; // tailwind class
  className?: string;
  allowScrollOnMobile?: boolean;
  isGlobal?: boolean;
  globalKey?: string;
};

function resolveImage(image: any): { src: string | null; alt?: string } {
  if (!image) return { src: null };
  if (typeof image === 'string') return { src: image };
  if (typeof image === 'object') {
    const src = image.url ?? image.src ?? null;
    const alt = image.alt ?? image.alternativeText ?? undefined;
    if (src) return { src, alt };
  }
  return { src: null };
}

const TeamCarousel: React.FC<TeamCarouselProps> = ({
  eyebrow = '',
  title = '',
  items = [],
  columns = 3,
  gap = 40,
  circleSize = 'w-36 h-36',
  padding = 'py-12 px-6',
  background = 'bg-[#f4fbff]',
  className = '',
  allowScrollOnMobile = true,
  isGlobal
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);
  
  const safeItems = Array.isArray(items) ? items : [];

  // desktop width per card as percentage (simple)
  const cols = Math.max(1, Number(columns) || 1);
  const cardPercent = `${Math.floor(100 / cols)}%`;

  const outerBorder = 'ring-8 ring-sky-100'; // subtle thick ring like your UI

  return (
    <section className={`${background} ${padding} ${className} ${shouldGlow ? 'editor-global-glow' : ''}`} role="region" aria-label="Team">
      <div className="max-w-7xl mx-auto">
        {(eyebrow || title) && (
          <header className="mb-6 md:mb-8 lg:mb-10 text-center">
            {eyebrow && <div className="text-xs sm:text-sm uppercase tracking-wider text-slate-500 mb-2">{eyebrow}</div>}
            {title && <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900">{title}</h3>}
          </header>
        )}

        {/* Container: scrollable on small screens, grid-like on md+ */}
        <div className={`${allowScrollOnMobile ? 'overflow-x-auto' : ''}`}>
          <div
            className={`flex ${allowScrollOnMobile ? 'px-3 sm:px-4' : ''} flex-wrap md:flex-wrap justify-center`}
            style={{
              gap: `clamp(16px, 3vw, ${gap}px)`,
              paddingTop: 6,
              flexWrap: allowScrollOnMobile ? 'nowrap' : 'wrap',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            {safeItems.map((member, idx) => {
              const { src, alt } = resolveImage(member?.image ?? null);
              const cardStyle: React.CSSProperties = allowScrollOnMobile
                ? { minWidth: 180, flex: '0 0 auto', padding: 6 }
                : { flex: `0 0 ${cardPercent}`, maxWidth: cardPercent, boxSizing: 'border-box', padding: 6 };

              return (
                <div key={member?.id ?? `${idx}-${member?.name ?? 'member'}`} style={cardStyle} className="flex flex-col items-center text-center">
                  <div className={`rounded-full overflow-hidden ${circleSize} ${outerBorder} mb-2 sm:mb-3 md:mb-4`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'clamp(100px, 20vw, 144px)', height: 'clamp(100px, 20vw, 144px)' }}>
                    {src ? (
                      <Image src={resolveImageUrl(src)} alt={alt ?? member?.name ?? `member-${idx}`} className="w-full h-full object-cover block" loading="lazy" width={200} height={200} unoptimized/>
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-sm text-slate-500">No image</div>
                    )}
                  </div>

                  <div className="text-slate-900 font-semibold text-sm sm:text-base md:text-lg lg:text-xl">{member?.name}</div>
                  <div className="text-sky-500 text-xs sm:text-sm mt-0.5 sm:mt-1">{member?.role}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;
