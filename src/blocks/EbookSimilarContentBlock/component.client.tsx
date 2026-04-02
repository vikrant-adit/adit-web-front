/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/imageResolver";

export interface SimilarEbooksBlockProps {
  title?: string;
  limit?: number;
  excludeSlug?: string;
  fetchFromApi?: string;
  items?: any;
  data?: any;
}

export default function SimilarEbooksBlock({
  title = "Similar Content",
  limit = 4,
  excludeSlug,
  fetchFromApi = "false",
  items = [],
}: SimilarEbooksBlockProps) {
const scrollRef = useRef<HTMLDivElement>(null);

const scroll = (dir: "left" | "right") => {
  if (!scrollRef.current) return;

  const scrollAmount = 300;
  scrollRef.current.scrollBy({
    left: dir === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};
const [ebooks, setEbooks] = useState<any[]>(items);
const [loading, setLoading] = useState(true);

useEffect(() => {
  let ignore = false;

  const loadEbooks = async () => {

    /* ---------------------------------------------
    USE STATIC ITEMS
    --------------------------------------------- */
    if (fetchFromApi !== "true") {
      if (!ignore) {
        setEbooks(items || []);
        setLoading(false);
      }
      return;
    }

    /* ---------------------------------------------
    FETCH FROM STRAPI
    --------------------------------------------- */
    try {
      // console.log("Fetching similar ebooks with params:", { excludeSlug });
      const url =
        `${process.env.STRAPI_API}e-books` +
        `?populate=image` +
        `&pagination[limit]=${limit}` +
        (excludeSlug ? `&filters[slug][$ne]=${excludeSlug}` : "");

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_AUTH_TOKEN}`,
        },
      });

      const json = await res.json();

      if (!ignore) {
        setEbooks(json?.data || []);
      }

    } catch (err) {
      console.error("Ebook fetch failed", err);
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  };

  loadEbooks();

  return () => {
    ignore = true;
  };

}, [fetchFromApi, limit, excludeSlug]);
  return (
    <section className="py-12 px-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">{title}</h2>

        <Link
          href="/ebooks"
          className="text-blue-600 font-medium"
        >
          View All
        </Link>
      </div>

      {/* Cards */}
{/* Cards */}
{ebooks?.length > 0 ? (
  <div className="relative">

    {/* Left Arrow */}
    <button
      onClick={() => scroll("left")}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center"
    >
      ←
    </button>

    {/* Scroll Container */}
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-auto scroll-smooth px-12 no-scrollbar"
    >
      {ebooks.map((ebook) => {
        const attr = ebook.attributes || ebook;
        const image = attr?.image?.url;

        return (
          <Link
            key={ebook.id}
            href={`/${attr.slug}`}
            className="w-[300px] min-w-[300px] md:w-[340px] md:min-w-[340px] flex-shrink-0 border rounded-xl p-4 hover:shadow-lg transition bg-white"
          >
            {/* Fixed Image Box */}
            <div className="w-full h-[200px] md:h-[220px] mb-4 overflow-hidden rounded-lg bg-gray-100">
              {image && (
                <img
                  src={resolveImageUrl(image)}
                  alt={attr.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Fixed Height Content */}
            <div className="h-[60px]">
              <h3 className="font-semibold text-lg line-clamp-2">
                {attr.title}
              </h3>
            </div>

            <span className="text-blue-600 text-sm">
              Read More
            </span>
          </Link>
        );
      })}
    </div>

    {/* Right Arrow */}
    <button
      onClick={() => scroll("right")}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center"
    >
      →
    </button>

  </div>
) : (
  <div className="text-gray-400 text-sm">
    No ebooks available
  </div>
)}

    </section>
  );
}