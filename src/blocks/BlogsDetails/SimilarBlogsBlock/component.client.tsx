"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/imageResolver";

export interface SimilarBlogsBlockProps {
  title?: string;
  limit?: number;
  excludeSlug?: string;
  fetchFromApi?: string;
  items?: any[];
}

export default function SimilarBlogsBlock({
  title = "Similar Blogs",
  limit = 3,
  excludeSlug,
  fetchFromApi = "true",
  items = [],
}: SimilarBlogsBlockProps) {

  const [blogs, setBlogs] = useState<any[]>(items);

  async function fetchBlogs() {
    let url =
      `${process.env.STRAPI_API}blogs` +
      `?populate=coverImage` +
      `&pagination[limit]=${limit}`;

    if (excludeSlug) {
      url += `&filters[slug][$ne]=${excludeSlug}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_AUTH_TOKEN}`,
      },
    });

    const json = await res.json();
    setBlogs(json?.data || []);
  }

  useEffect(() => {
    if (fetchFromApi === "true") {
      fetchBlogs();
    }
  }, [fetchFromApi, excludeSlug]);

  if (!blogs.length) return null;

  return (
    <section className="py-12 px-6 md:px-10">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => {
          const attr = blog.attributes || blog;
          const image = attr?.coverImage?.url;

          return (
            <Link
              key={blog.id}
              href={`/${attr.slug}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden"
            >
              {image && (
                <img
                  src={resolveImageUrl(image)}
                  alt={attr.title}
                  className="w-full h-[180px] object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="font-semibold line-clamp-2">
                  {attr.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}