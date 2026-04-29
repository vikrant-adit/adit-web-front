'use client';
import Image from "next/image";
import React, { useEffect,  useRef, useState } from "react";
import Link from "next/link";
import { resolveImageUrl } from '@/lib/imageResolver';
import SiteLayout from "@/components/layout/SiteLayout";

const API_URL = "https://adit.com/api/v1/press-releases";

export type LocalizedString =
  | string
  | { en?: string; [k: string]: unknown }
  | null
  | undefined;

export type PressReleaseItem = {
  id: number | string;
  title?: LocalizedString;
  name?: LocalizedString;
  date?: string;
  published_at?: string;
  created_at?: string;
  excerpt?: LocalizedString;
  description?: LocalizedString;
  content?: LocalizedString;
  body?: LocalizedString;
  slug?:{en:string} ;
  url?: LocalizedString;
  link?: LocalizedString;
  image?: string;
  image_url?: string;
  featured_image?: string;
  thumbnail?: string;
  media?: { url?: string };
  status?: Record<string, string | number | boolean>;
  source?: LocalizedString;
  publisher?: LocalizedString;
  images?: { original?: string; url?: string; thumbnail?: string };
};

export type PressReleasesResponse = {
  current_page: number;
  data: PressReleaseItem[];
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
};
           const skeletonKeys = ["sk-1", "sk-2", "sk-3"];

function stripHtml(html?: string): string {
  if (!html) return "";
  const div =
    globalThis.window === undefined ? null : document.createElement("div");
  if (div) {
    div.innerHTML = html;
    return (div.textContent || div.innerText || "").trim();
  }
  return html
.replaceAll(/<[^<>]*>/g, " ")    .replaceAll(/\s+/g, " ")
    .trim();
}

function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

function getLocalizedString(input: LocalizedString): string | undefined {
  if (input == null) return undefined;
  if (typeof input === "string") return input;
  if (isObject(input)) {
  const en = input.en;
  if (typeof en === "string") return en;
  for (const k of Object.keys(input)) {
    if (typeof input[k] === "string") return input[k];
  }
}
  return undefined;
}

function pickLocalized(...vals: LocalizedString[]): string | undefined {
  for (const v of vals) {
    const str = getLocalizedString(v);
    if (str !== undefined && str !== null && String(str).trim().length > 0)
      return str;
  }
  return undefined;
}

function toExcerpt(item: PressReleaseItem, maxLen = 220): string {
  const raw =
    pickLocalized(item.excerpt, item.description, item.content, item.body) ||
    "";
  const txt = stripHtml(raw);
  if (txt.length <= maxLen) return txt;
  const cut = txt.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).concat("…");
}

function toImage(item: PressReleaseItem): string | undefined {
  return (
    item.featured_image ||
    item.image_url ||
    item.image ||
    item.thumbnail ||
    item.media?.url ||
    item.images?.original ||
    item.images?.url ||
    item.images?.thumbnail
  );
}

function toDate(item: PressReleaseItem): Date | null {
  const d = item.date || item.published_at || item.created_at;
  if (!d) return null;
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatDate(d: Date | null): string {
  if (!d) return "";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return d.toISOString().split("T")[0];
  }
}

function toTitle(item: PressReleaseItem): string {
  return pickLocalized(item.title, item.name) || "Untitled";
}

function toHref(item: PressReleaseItem): string | undefined {
  return pickLocalized(item.url, item.link);
}

function toPublisher(item: PressReleaseItem): string {
  return pickLocalized(item.publisher, item.source) || "Adit";
}

function isEnglishEnabled(
  status?: Record<string, string | number | boolean>
): boolean {
  if (!status) return true;
  const v = status["en"];
  if (v === undefined || v === null) return true;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v === 1;
  if (typeof v === "string") return v === "1" || v.toLowerCase() === "true";
  return true;
}

async function fetchList(page = 1): Promise<PressReleasesResponse> {
  const res = await fetch(`${API_URL}?page=${page}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as PressReleasesResponse;
}



const PressRelease: React.FC = () => {
  const [items, setItems] = useState<PressReleaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [enriching, setEnriching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const meta = await fetchList(currentPage);
        if (cancelled) return;

        setLastPage(meta.last_page);
        setNextUrl(meta.next_page_url);

        const baseItems = (meta.data || []).filter((it) =>
          isEnglishEnabled(it.status)
        );

        setItems((prev) =>
          currentPage === 1 ? baseItems : [...prev, ...baseItems]
        );
      } catch (e: unknown) {
  if (!cancelled) {
    setError((e as Error)?.message || "Failed to fetch press releases");
  }
} finally {
        if (!cancelled) {
          setLoading(false);
          setEnriching(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  // Infinite scroll observer
  useEffect(() => {
    if (!observerRef.current) return;
    const el = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextUrl && currentPage < lastPage) {
          setCurrentPage((p) => p + 1);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [nextUrl, currentPage, lastPage]);

  return (
 <SiteLayout>
    <div className="pr-root">
      <style>{`
        .pr-root {
          width: 100%;
          display: flex;
          justify-content: center;
          background: #fff;
        }
        .pr-container {
          width: 100%;
          max-width: 1200px;
          padding: clamp(16px, 3vw, 32px);
        }
        .pr-title {
          color: #092a3d;
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: clamp(28px, 5vw, 48px);
          line-height: 1.1;
          margin: 8px 0 24px;
        }
        .pr-list { display: grid; gap: clamp(24px, 4vw, 40px); }

        .pr-item {
          display: grid;
          grid-template-columns: minmax(240px, 420px) 1fr;
          gap: clamp(16px, 3vw, 28px);
          align-items: start;
        }
        @media (max-width: 900px) {
          .pr-item { grid-template-columns: 1fr; }
        }
        .pr-thumb {
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 18px;
          object-fit: cover;
          background: #eef2f6;
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
        }
        .pr-content { color: #0a2a3d; }
        .pr-heading {
          margin: 0 0 10px;
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: clamp(20px, 3.6vw, 36px);
          line-height: 1.2;
        }
        .pr-heading a { color: inherit; text-decoration: none; }
        .pr-heading a:hover { text-decoration: underline; }

        .pr-excerpt {
          color: #234457;
          font-size: clamp(14px, 2.2vw, 20px);
          line-height: 1.6;
          margin: 0 0 14px;
        }
        .pr-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #234457;
          font-size: 14px;
        }
        .pr-publisher { opacity: 0.9; }

        /* Skeletons */
        .sk-item { display: grid; grid-template-columns: minmax(240px, 420px) 1fr; gap: 24px; }
        @media (max-width: 900px) { .sk-item { grid-template-columns: 1fr; } }
        .sk-box { background: linear-gradient(90deg, #eef2f6 0%, #f6f9fc 50%, #eef2f6 100%); background-size: 200% 100%; animation: pr-shimmer 1.4s linear infinite; border-radius: 14px; }
        .sk-thumb { width:100%; aspect-ratio:16 / 10; border-radius: 18px; }
        .sk-line { height: 16px; margin: 8px 0; }
        .sk-line.lg { height: 22px; width: 80%; }
        .sk-line.md { width: 95%; }
        .sk-line.sm { width: 60%; }
        @keyframes pr-shimmer { 0%{ background-position: 200% 0 } 100%{ background-position: -200% 0 } }

        .pr-pagination { display: flex; gap: 10px; margin-top: 24px; align-items: center; }
        .pr-btn { padding: 8px 12px; border-radius: 8px; background: #0a2a3d; color: #fff; border: none; cursor: pointer; }
        .pr-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
        .pr-pageinfo { color: #234457; font-size: 14px; }
      `}</style>

      <div className="pr-container">
        <h1 className="pr-title">Press Releases</h1>

        {items.length === 0 && loading && (
          <div className="pr-list" aria-busy>

{skeletonKeys.map((key) => (
  <div className="sk-item" key={key}>
    <div className="sk-box sk-thumb" />
    <div>
      <div className="sk-box sk-line lg" />
      <div className="sk-box sk-line md" />
      <div className="sk-box sk-line md" />
      <div className="sk-box sk-line sm" />
    </div>
  </div>
))}
          </div>
        )}

        {error && (
          <p role="alert" style={{ color: "#b00020" }}>
            Error: {error}
          </p>
        )}

        {items.length > 0 && (
          <div className="pr-list">
            {items.map((it) => {
              const img = toImage(it);
              const title = toTitle(it);
              const href = toHref(it);
              const excerpt = toExcerpt(it);
              const dateStr = formatDate(toDate(it));
              const publisher = toPublisher(it);
              return (
                <article key={it.id} className="pr-item">
                  {img ? (
                    <Image
                      className="pr-thumb"
                      src={resolveImageUrl(`/uploads/istockphoto_1392500126_612x612_49e8a39689.jpg`)}
                      alt={title || 'Image'}
                      width={420}
                      height={420}
                      loading="lazy"
                      unoptimized
                    />
                  ) : (
                    <div className="sk-box sk-thumb" aria-hidden />
                  )}
                  <div className="pr-content">
                    <Link href={`/press-release/${it.slug?.en}`} className="block">
                      <h2 className="pr-heading">
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {title}
                          </a>
                        ) : (
                          title
                        )}
                      </h2>
                    </Link>
                    {excerpt && <p className="pr-excerpt">{excerpt}</p>}
                    <div className="pr-meta">
                      <span>{dateStr}</span>
                      <span className="pr-publisher">{publisher}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Intersection observer target */}
        <div ref={observerRef} style={{ height: "1px" }} />
        {(loading || enriching) && (
          <p style={{ textAlign: "center" }}>Loading more…</p>
        )}
      </div>
    </div>
    </SiteLayout>
  );
};

export default PressRelease;
