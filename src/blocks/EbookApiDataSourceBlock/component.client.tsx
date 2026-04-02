/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

export interface EbookApiDataSourceBlockProps {
  collection?: string;
}

export default function EbookApiDataSourceBlock({
  collection = "e-books",
}: EbookApiDataSourceBlockProps) {

  useEffect(() => {

    async function loadData() {

      const slug = window.location.pathname.replace(/^\/|\/$/g, "");

    const url =
  `${process.env.STRAPI_API}${collection}` +
  `?filters[slug][$eq]=${slug}` +
  `&populate[tabs][populate]=*` +
  `&populate[whyDownloadGuide][populate][features][populate]=icon`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_AUTH_TOKEN}`,
        },
      });

      const json = await res.json();

      const entry = json?.data?.[0];

      if (!entry) return;

   const data = entry.attributes || entry;

(window as any).__PAGE_API_DATA__ = data;

window.dispatchEvent(new Event("page-api-loaded"));

    }

    loadData();

  }, [collection]);

  return null;
}