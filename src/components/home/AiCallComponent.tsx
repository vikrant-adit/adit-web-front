/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

type Card = {
  id: number;
  title: string;
  subtitle?: string;
  image?: string; // optional thumbnail path
};

const baseImage = (name: string) =>
  (process.env.STRAPI_API_FOR_IMAGES ?? "").replace(
    /\/$/,
    ""
  ) +
  (process.env.STRAPI_API_FOR_IMAGES
    ? `/uploads/${name}`
    : `/assets/${name}`);

const defaultCards: Card[] = [
  {
    id: 1,
    title: "Never miss another booking",
    subtitle:
      "Easily re-engage patients who didn't book and understand where booking opportunities are slipping through.",
    image: baseImage("/never_miss_another_booking_99f1be085d.webp"),
  },
  {
    id: 2,
    title: "Full transcripts without replays",
    subtitle:
      "Eliminate call replays — review conversations instantly, skip to key moments, and get context.",
    image: baseImage("/full_transcripts_without_replays_4012ae9988.webp"),
  },
  {
    id: 3,
    title: "Call scoring for smarter coaching",
    subtitle:
      "Spot training opportunities and performance issues quickly without having to listen to every call.",
    image: baseImage(
      "/track_emotions_and_intent_automatically_4dd10d2001.webp"
    ),
  },
  {
    id: 4,
    title: "Insights and trends dashboard",
    subtitle:
      "Make smarter, data-driven decisions that improve team efficiency and increase revenue.",
    image: baseImage("/leads_dashboard_for_every_opportunity_e030bb9fb7.webp"),
  },
  {
    id: 5,
    title: "Recover missed opportunities",
    subtitle:
      "Identify missed appointments and follow-up automatically to recover lost revenue.",
    image: baseImage("/follow_up_tasks_are_auto_generated_8cf50f40fe.webp"),
  },
  {
    id: 6,
    title: "Conversion & opportunity tracking",
    subtitle:
      "Track conversions across channels and drill into which campaigns drive booked patients.",
    image: baseImage("/insights_and_trends_dashboard_7b15cd2965.webp"),
  },
  {
    id: 7,
    title: "Real-time performance metrics",
    subtitle:
      "Live dashboards let managers track staff performance and call outcomes in real time.",
    image: baseImage("/insights_and_trends_dashboard_7b15cd2965.webp"),
  },
  {
    id: 8,
    title: "Automated follow-ups & reminders",
    subtitle:
      "Reduce no-shows with automated calls/texts and personalized follow-up sequences.",
    image: baseImage("/call_summaries_auto_post_in_the_ehr_4591c012d1.webp"),
  },
];

export default function AiCallComponent({
  cards = defaultCards,
  visible = 2,
}: {
  cards?: Card[];
  visible?: number;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const calc = () => {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft + el.clientWidth + 1 < el.scrollWidth);
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    const onScroll = () => {
      calc();
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [cards]);

  const scrollByPage = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.9, el.clientWidth);
    const target =
      dir === "left" ? el.scrollLeft - amount : el.scrollLeft + amount;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByPage("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByPage("right");
      }
    };
    el.addEventListener("keydown", onKey as any);
    return () => el.removeEventListener("keydown", onKey as any);
  }, []);

  const bgUrl =
    (process.env.STRAPI_API_FOR_IMAGES ?? "").replace(
      /\/$/,
      ""
    ) + "/uploads/home_adit_ai_section_bgimg_0d2d0650f3.webp";

  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url("${bgUrl}")`,
      }}
      aria-label="AI call intelligence section"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-transparent to-slate-900/60 pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-8 gap-6">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-4xl flex text-center font-extrabold text-white">
                Supercharge your front desk with{" "}
                <img
                  src="http://localhost:1337/uploads/adit_ai_colored_icon_0d3302310d.webp"
                  alt=""
                  width={40}
                  className="mx-4"
                />{" "}
                call intelligence
              </h2>
              <p className="mt-2 text-sm text-center text-slate-200 max-w-5xl ">
                Every call counts! Adit AI recovers missed bookings, automates
                follow-ups, flags unhappy patients, and scores staff performance
                so you capture every opportunity and deliver better patient
                experiences.
              </p>
             <Link href="/call-intelligence" className="btn-primary">
  Discover Call Intelligence
</Link>
            </div>
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            tabIndex={0}
            className="relative overflow-x-auto no-scrollbar focus:outline-none"
            style={{ WebkitOverflowScrolling: "touch" }}
            aria-label="AI call features carousel"
          >
            <div className="flex gap-6 items-stretch py-4">
              {cards.map((c) => {
                const displayNum = String(c.id).padStart(2, "0");
                return (
                  <article
                    key={c.id}
                    className="relative flex-shrink-0 w-[45%] rounded-[22px] border border-[#25a8e0cc] bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-white p-8 shadow-xl overflow-visible"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={c.title}
                  >
                    <div className="flex gap-6">
                      {/* Left big number */}
                      <div className="flex-shrink-0 flex items-start">
                        <div className="text-3xl font-bold leading-none text-sky-400/95 opacity-70">
                          {displayNum}
                        </div>
                      </div>

                      {/* Right content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl  font-bold">{c.title}</h3>
                        <p className="mt-3 text-m text-slate-200 max-w-prose line-clamp-4">
                          {c.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Overlapping screenshots in bottom-left */}

                    <div className="w-[100%]  rounded-lg shadow-2xl overflow-hidden">
                      <img
                        src={c.image}
                        alt={`${c.title} screenshot`|| 'Image'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Arrows BELOW the cards */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByPage("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border bg-white/8 hover:bg-white/14 transition ${
                !canScrollLeft ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByPage("right")}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border bg-white/8 hover:bg-white/14 transition ${
                !canScrollRight ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
