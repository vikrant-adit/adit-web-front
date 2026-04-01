/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';

export type StatItem = { value: string; label: string };
import { useEditorGlow } from '@/hooks/useEditorGlow';
import Image from 'next/image';
export interface InsuranceProps {
  eyebrow?: string;
  title?: string;
  intro?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: { url: string; alt?: string } | null;
  logo?: { url: string; alt?: string } | null;
  imageAlign?: 'right' | 'left';
  badgeText?: string;
  stats?: StatItem[] | string; // builder might provide JSON or string
  editable?: boolean;
    isGlobal?: boolean;
  globalKey?: string;
}

/**
 * InsuranceVerification — client-rendered visual component with Tailwind CSS.
 * editable prevents navigation (builder canvas).
 */
const InsuranceVerification: React.FC<InsuranceProps> = ({
  eyebrow,
  title = 'Insurance Verification',
  intro = 'Be prepared to verify patient coverage way before their appointments.',
  ctaText = 'Schedule A Demo',
  ctaLink = '#',
  image = null,
  logo = null,
  imageAlign = 'right',
  badgeText = '',
  stats,
  editable = false,
    isGlobal,
}) => {
  // Normalize stats if passed as JSON/string
  let normalizedStats: StatItem[] = [
    { value: '30%', label: 'Production growth' },
    { value: '16 hours/week', label: 'Saved on insurance verifications' },
    { value: '18%', label: 'Collections boost' },
  ];
const { shouldGlow } = useEditorGlow(isGlobal);

  try {
    if (Array.isArray(stats)) {
      normalizedStats = stats as StatItem[];
    } else if (typeof stats === 'string') {
      const parsed = JSON.parse(stats);
      if (Array.isArray(parsed)) normalizedStats = parsed;
    } else if (stats && typeof stats === 'object') {
      const arr = (stats as any).map?.((it: any) => ({
        value: it?.value ?? it?.label ?? String(it),
        label: it?.label ?? '',
      }));
      if (Array.isArray(arr)) normalizedStats = arr;
    }
  } catch {
    // fallback: keep defaults
  }

  const isImageRight = imageAlign === 'right';

  return (
    <section className={`w-full py-12 px-6 md:px-12 ${shouldGlow ? 'editor-global-glow' : ''}`} data-component="insurance_verification">
      <div
        className={`max-w-7xl mx-auto grid gap-8 items-center md:grid-cols-2 ${
          isImageRight ? 'md:grid-cols-2' : 'md:grid-cols-2'
        }`}
      >
        {/* LEFT: content */}
        <div className="space-y-4 md:pr-8">
          {eyebrow && (
            <div className="inline-block bg-white/60 backdrop-blur-sm px-3 py-1 rounded text-sm font-semibold text-sky-800">
              {eyebrow}
            </div>
          )}

          {title && (
            <h2 className="text-4xl md:text-5xl font-extrabold text-sky-600 leading-tight">
              {title}
            </h2>
          )}

          {intro && <p className="text-lg text-slate-700 max-w-xl">{intro}</p>}

          <div className="mt-6">
            <a
              href={ctaLink || '#'}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition"
              onClick={(e) => {
                if (editable) e.preventDefault();
              }}
            >
              {ctaText}
            </a>
          </div>
        </div>

        {/* RIGHT: card */}
        <div className={`flex justify-center ${isImageRight ? 'md:justify-end' : 'md:justify-start'}`}>
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* top image */}
            {image?.url ? (
              <div className="h-56 md:h-64 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={image.url}
                  alt={image.alt ?? 'hero'}
                  width={500}
                  height={256}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="h-56 md:h-64 w-full bg-slate-100 rounded-t-2xl" />
            )}

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-28 h-12 flex items-center">
                  {logo?.url ? (
                    <img src={logo.url} alt={logo.alt ?? 'logo'} className="max-w-full max-h-12 object-contain" />
                  ) : (
                    <div className="text-sm text-slate-400">Logo</div>
                  )}
                </div>

                {badgeText && (
                  <div className="ml-auto inline-flex items-center gap-2 bg-sky-500 text-white px-3 py-2 rounded-lg text-sm shadow-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="1.5" />
                    </svg>
                    <span className="whitespace-nowrap">{badgeText}</span>
                  </div>
                )}
              </div>

              <p className="text-slate-700 mb-6">
                Adit&apos;s Insurance Verification helped <strong>Sandi E Silva, DDS, Inc.</strong> save 16 hours a week and grow 30%.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                {normalizedStats.slice(0, 3).map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                      {s.value}
                    </div>
                    <div className="text-sm md:text-base text-slate-500 mt-2">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceVerification;
