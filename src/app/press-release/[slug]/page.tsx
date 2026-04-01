"use client";
import React, { useEffect, useMemo, useState } from "react";
import SafeHtml from "../../../components/common/SafeHtml";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";

// Detail page for a press release
// Fetches: https://adit.com/api/v1/press-release/{slug}
// Renders hero image, title, date, publisher and HTML body.

const API_BASE = "https://adit.com/api/v1/press-release";
const FILES_BASE = "https://adit.com/storage/files/";

// Support localized strings (e.g., { en: "..." })
export type LocalizedString =
  | string
  | { en?: string; [k: string]: unknown }
  | null
  | undefined;

export type ImageObject = {
  id?: number | string;
  folder_id?: number | string;
  type?: string;
  name?: string; // e.g., chiro-press-release-banner.png
  url?: string;
  original_url?: string;
  path?: string;
};

export type PressReleaseDetail = {
  id: number | string;
  title?: LocalizedString;
  name?: LocalizedString;
  excerpt?: LocalizedString;
  description?: LocalizedString;
  content?: LocalizedString;
  body?: LocalizedString;
  publisher?: LocalizedString;
  source?: LocalizedString;
  date?: string; // ISO
  published_at?: string;
  created_at?: string;
  url?: LocalizedString;
  link?: LocalizedString;
  featured_image?: string;
  image_url?: string;
  image?: string | ImageObject;
  thumbnail?: string;
  media?: { url?: string };
  images?: { original?: string; url?: string; thumbnail?: string };
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  page_schema?: string;
  slug?: LocalizedString;
  status?: Record<string, unknown>;
};

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
    if (str && str.trim().length) return str;
  }
  return undefined;
}

// function stripHtml(html?: string): string {
//   if (!html) return "";
//   const div = typeof window !== "undefined" ? document.createElement("div") : null;
//   if (div) {
//     div.innerHTML = html;
//     return (div.textContent || div.innerText || "").trim();
//   }
//   return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
// }

function toTitle(item?: PressReleaseDetail | null): string {
  if (!item) return "";
  return pickLocalized(item.title, item.name, item.meta_title) || "Untitled";
}

function toImage(item?: PressReleaseDetail | null): string | undefined {
  if (!item) return undefined;
  // Prioritize explicit string URLs
  const direct =
    item.featured_image ||
    item.image_url ||
    item.thumbnail ||
    item.media?.url ||
    item.images?.original ||
    item.images?.url ||
    item.images?.thumbnail;
  if (direct) return direct;

  // If image is string
  if (typeof item.image === "string") return item.image;

  // If image is object
  if (isObject(item.image)) {
    const obj = item.image as ImageObject;
    const url = obj.url || obj.original_url || obj.path;
    if (url)
      return url.startsWith("http")
        ? url
        : FILES_BASE + url.replace(/^\/+/, "");
    if (obj.name) return FILES_BASE + obj.name;
  }
  return undefined;
}

function toDate(item?: PressReleaseDetail | null): Date | null {
  if (!item) return null;
  const d = item.created_at || item.date || item.published_at;
  if (!d) return null;
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? null : dt;
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

// function toPublisher(item?: PressReleaseDetail | null): string {
//   if (!item) return "";
//   return pickLocalized(item.publisher, item.source) || "Adit";
// }

function toBodyHtml(item?: PressReleaseDetail | null): string {
  if (!item) return "";
  return (
    pickLocalized(item.body, item.content, item.description, item.excerpt) || ""
  );
}

const DEFAULT_SLUG =
  "synchrony-expands-dental-payment-offerings-with-adit-practice-management-software-partnership";

const PressReleaseDetails: React.FC = () => {
  const params = useParams<{ slug?: string }>();
  const slug = params?.slug || DEFAULT_SLUG;

  const [data, setData] = useState<PressReleaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/${encodeURIComponent(slug)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // API may return { pressRelease: {...} } or { data: {...} } or raw
        const item: PressReleaseDetail = (json?.pressRelease ??
          json?.data ??
          json) as PressReleaseDetail;
        if (!cancelled) setData(item);
      } catch (e: unknown) {
        if (!cancelled) {
          setError((e as Error)?.message || "Failed to fetch press releases");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const title = useMemo(() => toTitle(data), [data]);
  const hero = useMemo(() => toImage(data), [data]);
  const dateStr = useMemo(() => formatDate(toDate(data)), [data]);
//   const publisher = useMemo(() => toPublisher(data), [data]);
  const bodyHtml = useMemo(() => toBodyHtml(data), [data]);

  return (
 <SiteLayout>
    <div className="prd-root">
      <style>{`
        .prd-root { display:flex; justify-content:center; background:#fff; }
        .prd-container { width:100%; max-width: 1100px; padding: clamp(16px, 3vw, 32px); }
        .prd-breadcrumb { margin-bottom: 12px; }
        .prd-breadcrumb a { color:#0a2a3d; text-decoration:none; }
        .prd-breadcrumb a:hover { text-decoration:underline; }

        .prd-date { color:#1a2c38; font-size: 16px; margin-bottom: 6px; }
        .prd-title { color:#092a3d; font-weight: 800; letter-spacing:-0.02em; font-size: clamp(28px, 4.8vw, 48px); line-height:1.15; margin: 8px 0 14px; }
        .prd-meta { display:flex; gap: 12px; color:#234457; font-size:14px; margin-bottom: 18px; }
        .prd-dot { opacity:0.6; }

        .prd-hero { width:100%; object-fit:cover; border-radius: 16px; background:#eef2f6; box-shadow: 0 10px 24px rgba(0,0,0,0.06); margin: 0 0 18px; }

        .prd-body { color:#1a2c38; font-size: 18px; line-height: 1.7; }
        .prd-body h2, .prd-body h3 { color:#0a2a3d; margin-top: 1.2em; margin-bottom:0.4em; }
        .prd-body p { margin: 0.6em 0; }
        .prd-body i, .prd-body em { color:#234457; }
        .prd-body a { color:#0a7ec2; text-decoration: none; }
        .prd-body a:hover { text-decoration: underline; }
        .prd-body img { max-width:100%; height:auto; border-radius: 10px; }
        .prd-body ul, .prd-body ol { padding-left: 1.25em; }

        /* Skeleton */
        .sk-box { background: linear-gradient(90deg, #eef2f6 0%, #f6f9fc 50%, #eef2f6 100%); background-size:200% 100%; animation: prd-shimmer 1.4s linear infinite; border-radius: 12px; }
        .sk-title { height: 32px; width:85%; margin: 10px 0; }
        .sk-meta { height: 14px; width: 40%; margin: 10px 0; }
        .sk-hero { width:100%; aspect-ratio: 16 / 9; }
        .sk-line { height: 16px; margin: 10px 0; }
        @keyframes prd-shimmer { 0%{ background-position: 200% 0 } 100%{ background-position: -200% 0 } }
      `}</style>

      <div className="prd-container">
        <div className="prd-breadcrumb">
          <Link href="/press-release">← Back to Press Releases</Link>
        </div>

        {loading && (
          <div>
            <div className="sk-box sk-meta" />
            <div className="sk-box sk-title" />
            <div className="sk-box sk-hero" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="sk-box sk-line" key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <p role="alert" style={{ color: "#b00020" }}>
            Error: {error}
          </p>
        )}

        {!loading && !error && (
          <article>
            {dateStr && <div className="prd-date">{dateStr}</div>}
            <h1 className="prd-title">{title}</h1>
            {/* <div className="prd-meta">
              {publisher && <span>{publisher}</span>}
            </div> */}

            {hero && (
              <Image
                className="prd-hero"
                src={hero}
                alt={title || 'Image'}
                width={1020}
                height={1020}
                loading="eager"
              />
            )}

            {bodyHtml && (
              <div className="prd-body">
                <SafeHtml html={bodyHtml} className="prd-body" />
              </div>
            )}
          </article>
        )}
      </div>
    </div>
    </SiteLayout>
  );
};

export default PressReleaseDetails;
