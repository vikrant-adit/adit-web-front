'use client';
import React from 'react';
import Image from 'next/image';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export type CardProps = {
  id?: string;
  logoSrc?: string;
  headline?: string;
  body?: string;
  highlight?: string;
  ctaLabel?: string;
  accent?: string; // e.g. 'teal-400' or '#F4B400'
  isGlobal?: boolean;
  globalKey?: string;
};

const Card: React.FC<CardProps> = ({
  logoSrc,
  headline = 'Card headline',
  body = 'Short supporting text goes here.',
  highlight,
  ctaLabel = 'Read More',
  accent = 'amber-400',
  isGlobal
}) => {
  // small helper to create outline color class safely (fallback to amber-400)
  const underlineClass = accent ? `bg-${accent}` : 'bg-amber-400';
const { shouldGlow } = useEditorGlow(isGlobal);

  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
    <div className="w-full sm:w-72 md:w-80 lg:w-96 bg-white rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-start justify-between min-h-[240px] sm:min-h-[260px]">
      <div className="w-full">
        {logoSrc && (
          <div className="mb-3 sm:mb-4">
            {/* Use next/image in your real project; using <img> keeps this simple */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image unoptimized src={logoSrc} alt="logo" width={120} height={48} className="max-h-10 sm:max-h-12 object-contain" />
          </div>
        )}

        <h3 className="text-base sm:text-lg font-semibold text-slate-800 leading-snug mb-2">
          {headline.split(highlight ? highlight : '').map((part, i, arr) => {
            // render highlighted segment if highlight exists
            if (!highlight) return part;
            // reconstruct with highlight bolded
            if (i === 0) return part;
            return <span key={i} className="font-semibold">{highlight}</span>;
          })}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">{body}</p>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className={`h-1 w-full rounded-full ${underlineClass}`} style={{ maxWidth: '80%' }} />
        <button
          className="ml-4 flex items-center justify-center h-9 w-9 rounded-full bg-amber-500 text-white text-sm"
          aria-label={ctaLabel}
        >
          ➜
        </button>
      </div>
    </div>
    </div>
  );
};

export default Card;
