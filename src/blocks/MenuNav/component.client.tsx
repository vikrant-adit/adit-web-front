/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";

// ----------------------------
// Types
// ----------------------------
export type MenuItem = {
  id?: string | number;
  label: string;
  targetId: string;
};

export type MenuNavProps = {
  id?: string;
  items?: MenuItem[];
  background?: string;
  padding?: string;
  textColor?: string;
  activeTextColor?: string;
  pillBg?: string;
  pillPadding?: string;
  gap?: number;
  offset?: number;
  sticky?: boolean;
  className?: string;
};

// ----------------------------
// Utility Helpers
// ----------------------------
const twLike = (v?: string) =>
  typeof v === "string" &&
  /^[a-z0-9-:\/]+$/i.test(v) &&
  !v.startsWith("#") &&
  !v.startsWith("rgb");

const TAILWIND_SPACE: Record<string, string> = {
  px: "1px",
  "0": "0rem",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
};

function computePaddingValue(pad?: string) {
  if (!pad) return undefined;
  if (/px|rem|%/.test(pad)) return pad; // raw css

  const parts = pad.trim().split(/\s+/);
  const values: Record<string, string> = {};

  for (const p of parts) {
    const [token, key] = p.includes("-") ? p.split("-") : [p, ""];
    const val = TAILWIND_SPACE[key];
    if (!val) continue;

    if (token === "p") values.all = val;
    if (token === "px") values.x = val;
    if (token === "py") values.y = val;
    if (token === "pt") values.t = val;
    if (token === "pr") values.r = val;
    if (token === "pb") values.b = val;
    if (token === "pl") values.l = val;
  }

  const top = values.t ?? values.y ?? values.all;
  const bottom = values.b ?? values.y ?? values.all;
  const left = values.l ?? values.x ?? values.all;
  const right = values.r ?? values.x ?? values.all;

  if (!top && !right && !bottom && !left) return undefined;
  return `${top ?? 0} ${right ?? 0} ${bottom ?? top ?? 0} ${left ?? right ?? 0}`;
}

// -----------------------------------------------------------
// Main Component
// -----------------------------------------------------------
const MenuNav: React.FC<MenuNavProps> = ({
  id = "menu-nav",
  items = [],
  background = "bg-sky-600",
  padding = "py-3",
  textColor = "text-white",
  activeTextColor = "text-sky-800",
  pillBg = "bg-white",
  pillPadding = "15px 25px",
  gap = 36,
  offset = 0,
  sticky = true,
  className = "",
}) => {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.targetId ?? null);
  const [navHeight, setNavHeight] = useState(120);
  const [dynamicTop, setDynamicTop] = useState(0);

  const obsRef = useRef<IntersectionObserver | null>(null);
  const lastScroll = useRef(0);
  const ticking = useRef(false);

  // Motion preferences
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => setReducedMotion(mq.matches);
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  // Smooth Navbar Animation (fixed your issue)
  const navTransition = reducedMotion ? "none" : "top 240ms ease";

  // Measure navbar height
  useEffect(() => {
    const measure = () => {
      const el =
        document.querySelector(".navbar") ||
        document.querySelector("#navbar") ||
        document.querySelector("header");

      if (el instanceof HTMLElement) {
        const h = Math.ceil(el.getBoundingClientRect().height);
        if (h > 0) setNavHeight(h);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll Direction Handler (UP = reveal, DOWN = hide)
  useEffect(() => {
    lastScroll.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const prev = lastScroll.current;

        if (y > prev) {
          // scrolling down
          setDynamicTop(0);
        } else if (y < prev) {
          // scrolling up
          setDynamicTop(navHeight+60);
        }

        lastScroll.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navHeight+60]);

  // ScrollTo section
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    setDynamicTop(0);

    window.scrollTo({
      top: window.scrollY + el.getBoundingClientRect().top - offset,
      behavior: "smooth",
    });

    setActiveId(id);
  };

  // Intersection Observer (active section sync)
  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.targetId))
      .filter(Boolean) as HTMLElement[];

    if (!targets.length) return;

    obsRef.current?.disconnect();

    obsRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          const id = visible[0].target.id;
          setActiveId(id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    targets.forEach((t) => obsRef.current?.observe(t));
    return () => obsRef.current?.disconnect();
  }, [items, offset]);

  // Prepare styles
  const pillPaddingValue = computePaddingValue(pillPadding);
  const pillBgIsTw = twLike(pillBg);
  const textIsTw = twLike(textColor);
  const activeTextIsTw = twLike(activeTextColor);

  return (
    <nav
      id={id}
      role="navigation"
      aria-label="Section menu"
      className={`${sticky ? "sticky z-40" : ""} ${background} ${padding} ${className} hidden md:block`}
      style={{
        top: sticky ? dynamicTop : undefined,
        transition: navTransition,
        boxShadow: sticky ? "0 1px 0 rgba(0,0,0,0.08)" : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        <ul
          className="flex items-center whitespace-nowrap justify-center  px-2 sm:px-0"
          style={{ gap }}
        >
          {items.map((it) => {
            const isActive = activeId === it.targetId;

            const pillStyle: React.CSSProperties = {
              // padding: pillPaddingValue,
              padding:'10px 20px',
              borderRadius: "100px",
              backgroundColor: pillBgIsTw
                ? undefined
                : isActive
                ? pillBg
                : "transparent",
              transition: reducedMotion
                ? "none"
                : "background-color 200ms ease, transform 200ms ease",
              transform: isActive ? "scale(1.04)" : "scale(1)",
            }; 

            const textStyle: React.CSSProperties = {
              transition: reducedMotion ? "none" : "color 180ms ease",
              color: !textIsTw ? textColor : undefined,
              ...(isActive && !activeTextIsTw ? { color: activeTextColor } : {}),
            };

            return (
              <li key={it.targetId}>
                <button
                  type="button"
                  onClick={() => scrollToId(it.targetId)}
                  aria-current={isActive ? "true" : undefined}
                  className="inline-flex items-center justify-center rounded-full select-none"
                  style={{ background: "transparent", cursor: "pointer" }}
                >
                  <span
                    className={`${isActive && pillBgIsTw ? pillBg : ""}`}
                    style={pillStyle}
                  >
                    <span
                      className={`${
                        isActive
                          ? activeTextIsTw
                            ? activeTextColor
                            : ""
                          : textIsTw
                          ? textColor
                          : ""
                      }`}
                      style={textStyle}
                    >
                      {it.label}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default MenuNav;
