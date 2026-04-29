/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { resolveImageUrl } from "@/lib/imageResolver";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface Card {
  image?: any;
  alt?: string;
  description?: string;
}

interface Section {
  index?: number;
  title?: string;
  subtitle?: string;
  benefit?: string;
  cards?: Card[] | Record<string, Card>;
}

export interface CallIntelBLockProps {
  items?: Section[];
  isGlobal?: string;
  globalKey?: string;
}

export default function CallIntelBLock({ items }: Readonly<CallIntelBLockProps>) {
  const safeItems = useMemo(() => {
    return Array.isArray(items) ? items : [];
  }, [items]);

  if (safeItems.length === 0) return null;

  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCounts, setVisibleCounts] = useState<Record<number, number>>({});

  /* ============================
      Responsive Visible Count
  ============================ */
  useEffect(() => {
    const updateCounts = () => {
      const width = window.innerWidth;
      let count = 3;
      if (width < 640) count = 1;
      else if (width < 1024) count = 2;

      const newCounts: Record<number, number> = {};
      safeItems.forEach((_, i) => {
        newCounts[i] = count;
      });

      setVisibleCounts(newCounts);
    };

    updateCounts();
    window.addEventListener("resize", updateCounts);
    return () => window.removeEventListener("resize", updateCounts);
  }, [safeItems]);

  const scroll = (sectionIndex: number, direction: "left" | "right") => {
    const container = scrollRefs.current[sectionIndex];
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 px-4">
        {safeItems.map((item, sectionIndex) => {
          // ✅ Normalize cards safely
          let cards: Card[] = [];

          if (Array.isArray(item.cards)) {
            cards = item.cards;
          } else if (item.cards) {
            cards = Object.values(item.cards);
          }

          const visibleCount = visibleCounts[sectionIndex] ?? 3;
          const shouldShowArrows = cards.length > visibleCount;

          return (
            <div
              key={item.title ?? sectionIndex}
              className="border border-[#25A8E0] rounded-2xl p-6 md:p-10 transition hover:shadow-2xl bg-slate-900/20"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="text-6xl md:text-8xl font-semibold text-white/20">
                  {String(item.index ?? sectionIndex + 1).padStart(2, "0")}
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Benefit */}
              <div className="bg-[#00131F]/50 rounded-xl p-4 md:p-6 mb-6 border-y border-[#25A8E0]/30">
                <p className="text-center text-white text-base md:text-lg">
                  <span className="text-orange-400 font-semibold">
                    Benefit:
                  </span>{" "}
                  {item.benefit}
                </p>

                {/* Slider */}
                <div className="relative mt-8">
                  {shouldShowArrows && (
                    <>
                      <button
                        onClick={() => scroll(sectionIndex, "left")}
                        className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        onClick={() => scroll(sectionIndex, "right")}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  <div
                    ref={(el) => {
                      if (el) scrollRefs.current[sectionIndex] = el;
                    }}
                    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-4"
                  >
                    {cards.map((card, i) => {
                      const imgPath =
                        typeof card?.image === "string"
                          ? card.image
                          : resolveImageUrl(card?.image) || "";

                      return (
                        <div
                          key={`${card.alt ?? "card"}-${i}`}
                          className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[420px] flex-shrink-0 bg-white/5 rounded-xl p-4 backdrop-blur border border-white/10"
                        >
                          {imgPath && (
                            <div className="relative w-full aspect-video mb-4">
                              <Image
                                src={imgPath}
                                alt={card?.alt || "Card image"}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          )}

                          <p className="text-white text-center text-sm md:text-base">
                            {card?.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}