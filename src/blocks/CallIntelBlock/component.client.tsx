"use client";

import { resolveImageUrl } from "@/lib/imageResolver";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Card {
  image?: {
    url?: string;
  };
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
  isGlobal?: boolean;
  globalKey?: string;
}

export default function CallIntelBLock({ items }: CallIntelBLockProps) {
  if (!items || items.length === 0) return null;

  const scrollRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [visibleCounts, setVisibleCounts] = useState<Record<number, number>>(
    {}
  );

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
      items.forEach((_, i) => {
        newCounts[i] = count;
      });

      setVisibleCounts(newCounts);
    };

    updateCounts();
    window.addEventListener("resize", updateCounts);
    return () => window.removeEventListener("resize", updateCounts);
  }, [items]);

  /* ============================
     Scroll Handler
  ============================ */
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
    <section className="w-full bg-cover bg-center">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {items.map((item, sectionIndex) => {
          const cards = Array.isArray(item.cards) ? item.cards : [];

          const visibleCount = visibleCounts[sectionIndex] ?? 3;
          const shouldShowArrows = cards.length > visibleCount;

          return (
            <div
              key={sectionIndex}
              className="
                border border-[#25A8E0]
                rounded-2xl
                p-6 md:p-10
                transition hover:shadow-2xl
              "
            >
              {/* ================= Header ================= */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="text-6xl md:text-8xl font-semibold text-white">
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

              {/* ================= Benefit ================= */}
              <div className="bg-[#00131F]/50 rounded-xl p-4 md:p-6 mb-6">
                <p
                  className="
                    text-center text-white
                    text-base md:text-lg
                    bg-[linear-gradient(90deg,_rgba(223,246,255,0)_0%,_#25A8E0_51%,_rgba(223,246,255,0)_100%)]
                  "
                >
                  <span className="text-orange-400 font-semibold">
                    Benefit:
                  </span>{" "}
                  {item.benefit}
                </p>

                {/* ================= Cards Slider ================= */}
                <div className="relative mt-6">
                  {/* Left Arrow */}
                  {shouldShowArrows && (
                    <button
                      onClick={() => scroll(sectionIndex, "left")}
                      className="
                        absolute left-0 top-1/2 -translate-y-1/2
                        z-10
                        w-10 h-10
                        rounded-full
                        border border-white/30
                        bg-black/40
                        backdrop-blur
                        flex items-center justify-center
                        text-white
                        hover:bg-black/60
                        transition
                      "
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}

                  {/* Right Arrow */}
                  {shouldShowArrows && (
                    <button
                      onClick={() => scroll(sectionIndex, "right")}
                      className="
                        absolute right-0 top-1/2 -translate-y-1/2
                        z-10
                        w-10 h-10
                        rounded-full
                        border border-white/30
                        bg-black/40
                        backdrop-blur
                        flex items-center justify-center
                        text-white
                        hover:bg-black/60
                        transition
                      "
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {/* Scroll Container */}
                  <div
                   ref={(el) => {
  scrollRefs.current[sectionIndex] = el;
}}
                    className="
                      flex gap-6
                      overflow-x-auto
                      scroll-smooth
                      no-scrollbar
                      px-12
                    "
                  >
                    {cards.map((card, cardIndex) => {
                      const imageUrl = card?.image;

                      return (
                        <div
                          key={cardIndex}
                          className="
                            min-w-[280px]
                            sm:min-w-[320px]
                            md:min-w-[360px]
                            lg:min-w-[420px]
                            flex-shrink-0
                            bg-white/5
                            rounded-xl
                            p-4
                            backdrop-blur
                          "
                        >
                          {imageUrl && (
                            <Image
                              src={resolveImageUrl(imageUrl)}
                              alt={card?.alt || ""}
                              width={1200}
                              height={600}
                              className="w-full h-auto object-contain mb-4"
                            />
                          )}

                          <p className="text-white text-center text-sm md:text-base">
                            {card?.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* ================= End Slider ================= */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}