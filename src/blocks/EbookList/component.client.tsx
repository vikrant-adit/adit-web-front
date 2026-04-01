/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/imageResolver";

export interface EbookListBlockProps {
  title?: string;
  limit?: number;
  fetchFromApi?: boolean;

  data?: any; // injected by PageBuilder
}

export default function EbookListBlock({
  title = "Guides for Dental Practice Growth",
  limit = 12,
  fetchFromApi = false,
  data,
}: EbookListBlockProps) {

  const [ebooks, setEbooks] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  /* --------------------------------------------
  Fetch normally
  --------------------------------------------- */
  async function fetchEbooks(query?: string) {

    let url =
      `${process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL}e-books` +
      `?populate=image` +
      `&pagination[limit]=${limit}`;

    if (query) {
      url += `&filters[title][$containsi]=${query}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOCAL_AUTH_TOKEN}`,
      },
    });

    const json = await res.json();

    setEbooks(json?.data || []);
  }

  /* --------------------------------------------
  API MODE
  --------------------------------------------- */
  useEffect(() => {

    if (!fetchFromApi) {
      fetchEbooks();
      return;
    }

    // read from page content
    const ebooksFromPage =
      data?.content?.ebooks ||
      data?.content?.relatedEbooks ||
      [];

    setEbooks(ebooksFromPage);

  }, [fetchFromApi, data]);

  /* --------------------------------------------
  SEARCH
  --------------------------------------------- */
  useEffect(() => {

    if (fetchFromApi) return;

    const delay = setTimeout(() => {
      fetchEbooks(search);
    }, 400);

    return () => clearTimeout(delay);

  }, [search, fetchFromApi]);

  return (
    <section className="py-12 px-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <h2 className="text-3xl font-semibold">
          {title}
        </h2>

        {!fetchFromApi && (
          <div className="relative">

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 pl-10 w-[250px]"
            />

            <span className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </span>

          </div>
        )}

      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-4 gap-6 ">

        {ebooks.map((ebook) => {

          const attr = ebook.attributes || ebook;
          const image = attr?.image?.url;

          return (
            <Link
              key={ebook.id}
              href={`/${attr.slug}`}
              className="group border rounded-xl p-4 hover:shadow-md transition overflow-hidden"
            >

              <div className="relative overflow-hidden rounded-lg h-[180px] mb-4">

                {image && (
                  <img
                    src={resolveImageUrl(image)}
                    alt={attr.title}
                    className="
                      w-full h-full object-cover
                      transition duration-500
                      group-hover:-translate-y-6
                    "
                  />
                )}

                {attr.description && (
                  <div
                    className="
                      absolute bottom-0 left-0 right-0
                      bg-white/95 backdrop-blur
                      p-3 text-sm text-gray-600
                      opacity-0 translate-y-4
                      transition duration-500
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      line-clamp-3
                    "
                  >
                    {attr.description}
                  </div>
                )}

              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {attr.title}
              </h3>

              <span className="text-blue-600 text-sm">
                Read More
              </span>

            </Link>
          );

        })}

      </div>

    </section>
  );
}