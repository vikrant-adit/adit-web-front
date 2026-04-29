/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { getStrapiApiUrl, getStrapiAuthToken } from "@/lib/defaults";

export interface EbookApiDataSourceBlockProps {
  collection?: string;
}

export default function EbookApiDataSourceBlock({
  collection = "e-books",
}: EbookApiDataSourceBlockProps) {

  useEffect(() => {

    async function loadData() {

      const slug = globalThis.location.pathname.replaceAll(/^\/|\/$/g, "");

    const url =
  `${getStrapiApiUrl()}/${collection}` +
  `?filters[slug][$eq]=${slug}` +
  `&populate[tabs][populate]=*` +
  `&populate[whyDownloadGuide][populate][features][populate]=icon`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getStrapiAuthToken()}`,
        },
      });

      const json = await res.json();

      const entry = json?.data?.[0];

      if (!entry) return;

   const data = entry.attributes || entry;

(globalThis as any).__PAGE_API_DATA__ = data;

globalThis.dispatchEvent(new Event("page-api-loaded"));

    }

    loadData();

  }, [collection]);

  return null;
}