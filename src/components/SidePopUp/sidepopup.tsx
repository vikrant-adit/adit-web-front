'use client';

import { useEffect, useState } from 'react';
import { resolveImageUrl } from '@/lib/imageResolver';

type Promo = {
  id: number;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  active?: boolean;
  delayMs?: number;
  backgroundImg?: any;
  promoImage?: any;
};

type Props = {
  apiUrl: string;
  fallbackDelay?: number;
};

const getMediaUrl = (media?: any) => {
  if (!media) return undefined;
  if (media.url) return media.url; // flattened
  if (media.data?.attributes?.url) return media.data.attributes.url; // strapi default
  return undefined;
};

export default function SidePopupPromo({
  apiUrl,
  fallbackDelay = 1000,
}: Props) {
  const [promo, setPromo] = useState<Promo | null>(null);
  const [visible, setVisible] = useState(false);

  /* ===================== FETCH ===================== */
  useEffect(() => {
    let alive = true;

    const fetchPromo = async () => {
      try {
        const headers: Record<string, string> = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        if (process.env.STRAPI_API_AUTH_TOKEN) {
          headers.Authorization = `Bearer ${process.env.STRAPI_API_AUTH_TOKEN}`;
        }

        const resp = await fetch(
          `${apiUrl}side-popup-promo?filters[active][$eq]=true&populate=*`,
          { headers }
        );

        if (!resp.ok) return;

        const json = await resp.json();
        const data = json?.data?.[0]; // collection type

        if (alive && data?.active) {
          setPromo(data);
        }
      } catch (e) {
        console.warn('[SidePopupPromo] fetch failed', e);
      }
    };

    fetchPromo();
    return () => {
      alive = false;
    };
  }, [apiUrl]);

  /* ===================== DELAY ===================== */
  useEffect(() => {
    if (!promo) return;

    const delay = promo.delayMs ?? fallbackDelay;
    const t = setTimeout(() => setVisible(true), delay);

    return () => clearTimeout(t);
  }, [promo, fallbackDelay]);

  if (!promo) return null;

  const bgUrl = getMediaUrl(promo.backgroundImg);
  const cardImgUrl = getMediaUrl(promo.promoImage);

  /* ===================== RENDER ===================== */
  return (
    <div
      className={`fixed left-0 bottom-0 z-[9999]
      w-full md:w-[540px] h-auto md:h-[180px] rounded-none md:rounded-r-2xl shadow-2xl
      transition-transform duration-500 ease-out
      ${visible ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:-translate-x-full'}
      overflow-hidden p-4 md:p-0`}
    >
      {/* Background */}
      {bgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${resolveImageUrl(bgUrl)})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/30" />

      {/* Close */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 md:top-0 md:right-0 z-20
        h-8 w-8 md:h-9 md:w-9 rounded-md bg-orange-500
        text-black text-lg font-bold
        hover:bg-orange-400"
        aria-label="Close popup"
      >
        ×
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row h-full items-center gap-3 md:gap-6 px-4 md:px-6 py-4 md:py-0 text-white">
        {/* Promo Image */}
        {cardImgUrl && (
          <img
            src={resolveImageUrl(cardImgUrl)}
            alt=""
            className="h-[80px] md:h-[110px] w-auto rounded-lg"
          />
        )}

        {/* Text */}
        <div className="flex-1">
          {promo.title && (
            <h2 className="text-lg md:text-[28px] font-bold leading-tight text-orange-400">
              {promo.title}
            </h2>
          )}

          {promo.subtitle && (
            <p className="text-sm md:text-lg mt-1">{promo.subtitle}</p>
          )}

          {promo.ctaText && (
            <a
              href={promo.ctaUrl || '#'}
              className="inline-block mt-2 md:mt-4 rounded-full
              bg-orange-500 px-6 md:px-8 py-2 md:py-3
              text-sm md:text-base font-semibold text-black
              hover:bg-orange-400 transition"
            >
              {promo.ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
