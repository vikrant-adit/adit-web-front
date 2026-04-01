"use client";

import { useRef } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { resolveImageUrl } from "@/lib/imageResolver";

type FeatureStepRowProps = {
  step: number;
  tag: string;
  title: string;
  cards: {
    image: string | { url?: string };
    alt: string;
    caption: string;
    description?: string; // now HTML allowed
  }[];
  showArrows?: boolean;
};

export function FeatureStepRow({
  step,
  tag,
  title,
  cards,
  showArrows,
}: FeatureStepRowProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth
      : 0;
    el.scrollBy({
      left: dir === "left" ? -cardWidth * 3 : cardWidth * 3,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#003347] py-8">
      <div className="mx-auto max-w-6xl px-4 text-white">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <div className="text-[46px] font-extrabold leading-none text-[#0B526E]">
              {step}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#31B4FF]">
                {tag}
              </p>
              <h2 className="mt-1 text-[18px] font-extrabold leading-snug md:text-[20px]">
                {title}
              </h2>
            </div>
          </div>

          {showArrows && (
            <div className="hidden items-center gap-3 md:flex">
              <button
                onClick={() => scrollByCards("left")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0F617C] hover:bg-[#0F617C]"
              >
                ←
              </button>
              <button
                onClick={() => scrollByCards("right")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0F617C] hover:bg-[#0F617C]"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Cards scroll list */}
        <div
          ref={scrollRef}
          className="mt-6 flex gap-5 overflow-x-auto pb-2 scrollbar-hide md:snap-x md:snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cards.map((card,index) => {
            const imageUrl = resolveImageUrl(card.image);
            return (
            <div
              key={index}
              className="flex w-[260px] flex-shrink-0 snap-start flex-col md:w-[300px]"
            >
              <div className="relative overflow-hidden rounded-[22px] bg-white/5">
                <div className="relative h-56 w-full bg-white md:h-60">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={card.alt}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  ) : null}
                </div>
              </div>

              <p className="mt-3 text-[13px] leading-snug">{card.caption}</p>

              {/* 🔥 HTML Description */}
              {card.description && (
                <div
                  className="mt-2 text-[13px] leading-snug text-white/80"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(card.description),
                  }}
                />
              )}
            </div>
            );
          })}
        </div>

        {/* Mobile arrows */}
        {showArrows && (
          <div className="mt-4 flex justify-center gap-3 md:hidden">
            <button
              onClick={() => scrollByCards("left")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0F617C] hover:bg-[#0F617C]"
            >
              ←
            </button>
            <button
              onClick={() => scrollByCards("right")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0F617C] hover:bg-[#0F617C]"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
