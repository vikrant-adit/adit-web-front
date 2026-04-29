"use client";

import React, { useEffect, useMemo, useState } from "react";
import SafeHtml from "../common/SafeHtml";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const API_BASE = "https://adit.com/api/v1/press-release";
const FILES_BASE = "https://adit.com/storage/files/";

export type LocalizedString =
  | string
  | { en?: string; [k: string]: unknown }
  | null
  | undefined;

export type ImageObject = {
  id?: number | string;
  folder_id?: number | string;
  type?: string;
  name?: string;
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
  date?: string;
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
  slug?: LocalizedString;
};

function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

function getLocalizedString(input: LocalizedString): string | undefined {
  if (input == null) return undefined;
  if (typeof input === "string") return input;
  if (isObject(input)) {
    if (typeof input.en === "string") return input.en;
    for (const k of Object.keys(input)) {
      const v = (input as never)[k];
      if (typeof v === "string") return v;
    }
  }
  return undefined;
}

function pickLocalized(...vals: LocalizedString[]): string | undefined {
  for (const v of vals) {
    const str = getLocalizedString(v);
    if (str?.trim().length) return str;
  }
  return undefined;
}

function toTitle(item?: PressReleaseDetail | null): string {
  return pickLocalized(item?.title, item?.name) || "Untitled";
}

function toImage(item?: PressReleaseDetail | null): string | undefined {
  if (!item) return;

  const direct =
    item.featured_image ||
    item.image_url ||
    item.thumbnail ||
    item.media?.url ||
    item.images?.original ||
    item.images?.url;

  if (direct) return direct;

  if (typeof item.image === "string") return item.image;

  if (isObject(item.image)) {
    const obj = item.image;
    const url = obj.url || obj.original_url || obj.path;
    if (url)
      return url.startsWith("http")
        ? url
        : FILES_BASE + url.replace(/^\/+/, "");
    if (obj.name) return FILES_BASE + obj.name;
  }
}

function toDate(item?: PressReleaseDetail | null): Date | null {
  const d = item?.created_at || item?.date || item?.published_at;
  if (!d) return null;
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatDate(d: Date | null): string {
  if (!d) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

function toPublisher(item?: PressReleaseDetail | null): string {
  return pickLocalized(item?.publisher, item?.source) || "Adit";
}

function toBodyHtml(item?: PressReleaseDetail | null): string {
  return pickLocalized(
    item?.body,
    item?.content,
    item?.description,
    item?.excerpt
  ) || "";
}

const DEFAULT_SLUG =
  "synchrony-expands-dental-payment-offerings-with-adit-practice-management-software-partnership";

const PressReleaseDetails: React.FC = () => {
  const params = useParams();
  const slug = (params?.slug as string) || DEFAULT_SLUG;

  const [data, setData] = useState<PressReleaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_BASE}/${encodeURIComponent(slug)}`
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const item =
          (json?.pressRelease ?? json?.data ?? json) as PressReleaseDetail;

        if (!cancelled) setData(item);
      } catch {
        if (!cancelled) setError("Failed to load press release");
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
  const publisher = useMemo(() => toPublisher(data), [data]);
  const bodyHtml = useMemo(() => toBodyHtml(data), [data]);

  return (
    <div className="prd-root">
      <div className="prd-container">
        {/* Back */}
        <div className="prd-breadcrumb">
          <Link href="/press-release">
            ← Back to Press Releases
          </Link>
        </div>

        {loading && <p>Loading...</p>}

        {!loading && error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {!loading && !error && (
          <article>
            {dateStr && <div>{dateStr}</div>}
            <h1>{title}</h1>

            {publisher && <div>{publisher}</div>}

           {hero && (
  <Image
    src={hero}
    alt={title || "Image"}
    width={1200}
    height={600}
    className="prd-hero"
  />
)}

            {bodyHtml && (
              <SafeHtml html={bodyHtml} className="prd-body" />
            )}
          </article>
        )}
      </div>
    </div>
  );
};

export default PressReleaseDetails;