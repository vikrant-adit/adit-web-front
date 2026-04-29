/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

type Slide = {
  bg: string;
  title?: string;
  subtitle?: string;
  cta?: { text: string; href: string };
};

const LOGO_URL =
  "https://stories.adit.com/integrating-advanced-optometry-software-into-your-practice/assets/3.png";

const SLIDE_DURATION_MS = 8000;

const defaultSlides: Slide[] = [
  {
    bg: "https://stories.adit.com/integrating-advanced-optometry-software-into-your-practice/assets/2.jpeg",
    title: "Integrating Advanced \nOptometry Software Into Your Practice",
  },
  {
    bg: "https://stories.adit.com/integrating-advanced-optometry-software-into-your-practice/assets/4.jpeg",
    title: "Are you still managing appointments and forms manually?",
    subtitle:
      "As a modern optometry provider, integrating the best optometry software into your practice is no longer optional, it's essential.",
  },
  {
    bg: "https://stories.adit.com/integrating-advanced-optometry-software-into-your-practice/assets/5.jpeg",
    title: "Why your practice needs optometry software",
    subtitle:
      "From appointment scheduling and reminders to billing and patient forms, juggling these tasks manually is both time-consuming and error-prone. We’ve got you!",
  },
  {
    bg: "https://stories.adit.com/integrating-advanced-optometry-software-into-your-practice/assets/6.jpeg",
    title: "What makes Adit the best optometry software?",
    subtitle:
      "Unlike generic systems that require clunky integrations, Adit is purpose-built to serve eye care practices.",
  },
  {
    bg: "https://stories.adit.com/integrating-advanced-optometry-software-into-your-practice/assets/7.jpeg",
    title: "Adit is the best optometry software",
    subtitle: "Because it simplifies every aspect of running a practice.",
  },
  {
    bg: "https://stories.adit.com/integrating-advanced-optometry-software-into-your-practice/assets/8.jpeg",
    title: "Ready to future-proof your practice?",
    cta: {
      text: "Read More",
      href: "https://adit.com/the-future-of-eye-care-integrating-advanced-optometry-software-into-your-practice",
    },
  },
];

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function parseAmpStoryToSlides(ampHtml: string): Slide[] {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(ampHtml, "text/html");

    const pages = Array.from(doc.querySelectorAll("amp-story-page"));

    const slides: Slide[] = [];

    for (const page of pages) {
      const bgImg =
        page.querySelector('amp-story-grid-layer[template="fill"] amp-img') ||
        page.querySelector("amp-img");

      const bg = bgImg?.getAttribute("src") || "";

      const title =
        page.querySelector("h1, h2")?.textContent?.trim() || undefined;

      const subtitle =
        page.querySelector("h3")?.textContent?.trim() || undefined;

      const aEl = page.querySelector("a[href]");
      const href = aEl?.getAttribute("href") || undefined;
      const text = aEl?.textContent?.trim() || title;

      const slide: Slide = { bg, title, subtitle };

      if (href && text) {
        slide.cta = { text, href };
      }

      if (bg) slides.push(slide);
    }

    return slides.length ? slides : defaultSlides;
  } catch (e) {
    console.error("AMP parse failed", e);
    return defaultSlides;
  }
}

const WebStory: React.FC = () => {
  const searchParams = useSearchParams();

  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = slides.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % total) + total) % total),
    [total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useInterval(() => {
    if (!paused) next();
  }, SLIDE_DURATION_MS);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") setPaused((p) => !p);
    };

    globalThis.addEventListener("keydown", onKey);
    return () => globalThis.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const progressPct = useMemo(
    () => ((index + 1) / total) * 100,
    [index, total],
  );

  const slide = slides[index];

  // Fetch AMP story
  useEffect(() => {
    if (!searchParams) return;

    const source = searchParams.get("source");
    if (!source) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(source);
        const text = await res.text();

        const parsed = parseAmpStoryToSlides(text);

        if (!cancelled) {
          setSlides(parsed);
          setIndex(0);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Failed to load story");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  // ✅ FIX: removed nested ternary
  let footerText: string;
  if (loading) {
    footerText = "Loading...";
  } else if (error) {
    footerText = error;
  } else {
    footerText = `${index + 1} / ${total}`;
  }

  return (
<div
  className="ws-root"
  role="switch"
  aria-label="Web Story Player"
  aria-checked={!paused}
  tabIndex={0}
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => setPaused(false)}
  onFocus={() => setPaused(true)}
  onBlur={() => setPaused(false)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPaused((prevState) => !prevState);
    }
  }}
>
  <div className="ws-stage">
    <div
      className="ws-slide"
      style={{ backgroundImage: `url(${slide.bg})` }}
    >
      <Image
        className="ws-logo"
        src={LOGO_URL}
        alt="Logo"
        width={120}
        height={40}
        priority
      />

      <div className="ws-overlay">
        {slide.title && <h2 className="ws-title">{slide.title}</h2>}
        {slide.subtitle && (
          <p className="ws-subtitle">{slide.subtitle}</p>
        )}
        {slide.cta && (
          <a
            className="ws-cta"
            href={slide.cta.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {slide.cta.text}
          </a>
        )}
      </div>

      <div className="ws-controls">
        <button
          type="button"
          className="ws-hotspot left"
          onClick={prev}
          aria-label="Previous slide"
        />
        <button
          type="button"
          className="ws-hotspot right"
          onClick={next}
          aria-label="Next slide"
        />
      </div>
    </div>
  </div>

  <div className="ws-progress">
    <span style={{ width: `${progressPct}%` }} />
  </div>

  <div className="ws-footer">{footerText}</div>
</div>
  );
};

export default WebStory;