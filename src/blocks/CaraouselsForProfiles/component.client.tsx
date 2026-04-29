/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { getStrapiImagesUrl, getStrapiApiUrl } from '@/lib/defaults';
import Image from 'next/image';

export type CarouselItem = {
  id?: string | number;
  text?: string;
  name?: string;
  role?: string;
  office?: string;
  image?: string;      // plain string only
  imageAlt?: string;
};

export interface CarouselProps {
  items?: CarouselItem[];
  isGlobal?: boolean;
  globalKey?: string;
};

const extractStringUrl = (value: any): string => {
  if (!value) return '';

  if (typeof value === 'string') return value;

  if (Array.isArray(value) && value.length > 0) {
    return extractStringUrl(value[0]);
  }

  if (typeof value === 'object') {
    return (
      value.url ||
      value.src ||
      value.data?.attributes?.url ||
      value.attributes?.url ||
      ''
    );
  }

  return '';
};

const resolveSrc = (input: any) => {
  const raw = extractStringUrl(input);

  if (!raw || typeof raw !== 'string') return '';

  if (/^https?:\/\//i.test(raw) || raw.startsWith("//")) {
    return raw;
  }

  const base = getStrapiImagesUrl() || getStrapiApiUrl();

  if (!base) return raw;

  if (raw.startsWith('/')) return `${base}${raw}`;

  return `${base}/${raw.replace(/^\/+/, '')}`;
};


export default function Carousel({ items = [] }: Readonly<CarouselProps>) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="w-full m-auto py-10 overflow-hidden">
      <div className="flex overflow-x-auto justify-center gap-8 px-4 pt-10 snap-x snap-mandatory">
        {safeItems.map((it, i) => {
const src = resolveSrc(it.image);
          const alt = it.imageAlt || it.name || 'avatar';

          return (
            <div
              key={it.id ?? i}
              className="relative max-w-[300px] min-w-[300px] snap-center bg-white rounded-2xl shadow p-8 text-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {src ? (
                <Image
  src={src}
  alt={alt || "Image"}
  width={88}
  height={88}
  className="w-22 h-22 rounded-full object-cover border-4 border-white shadow-md bg-white"
/>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-200 border-4 border-white shadow-md" />
                )}
              </div>

              <div className="mt-8">
                <div className="font-semibold text-[17px] text-slate-900">
                  {it.name}
                </div>
                <div className="text-[12px] font-bold text-gray-500 mb-4">
                  {it.role} <br></br>
                    {it.office}
                </div>
              
                <p className="text-black text-[12px] leading-relaxed">
                  {it.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
