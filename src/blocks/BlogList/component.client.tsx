/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/imageResolver";

export interface BlogListBlockProps {
  title?: string;
  limit?: number;
  fetchFromApi?: string;
  data?: any;
}

export default function BlogListBlock({
  title = "Latest Blogs",
  limit = 9,
  fetchFromApi = "false",
  data,
}: BlogListBlockProps) {

  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState<any[]>([
    { name: "All", slug: "all" },
  ]);

  const [topics, setTopics] = useState<any[]>([
    { name: "All", slug: "all" },
  ]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTopic, setActiveTopic] = useState("all");

  /* --------------------------------------------
  FETCH BLOGS (MAIN FILTER LOGIC)
  --------------------------------------------- */
  async function fetchBlogs(
    query?: string,
    category?: string,
    topic?: string
  ) {
    let url =
      `${process.env.STRAPI_API}blogs?populate=*`;

    if (query) {
      url += `&filters[title][$containsi]=${query}`;
    }

    if (category && category !== "all") {
      url += `&filters[categories][slug][$eq]=${category}`;
    }

    if (topic && topic !== "all") {
      url += `&filters[topics][slug][$eq]=${topic}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_AUTH_TOKEN}`,
      },
    });

    const json = await res.json();
    setBlogs(json?.data || []);
  }

  /* --------------------------------------------
  FETCH CATEGORIES
  --------------------------------------------- */
  async function fetchCategories() {
    try {
      const res = await fetch(
        `${process.env.STRAPI_API}blog-categories`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_AUTH_TOKEN}`,
          },
        }
      );

      const json = await res.json();

      const apiCategories =
        json?.data?.map((c: any) => ({
          name: c?.attributes?.name || c?.name,
          slug: c?.attributes?.slug || c?.slug,
        })) || [];

      setCategories([{ name: "All", slug: "all" }, ...apiCategories]);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  }

  /* --------------------------------------------
  FETCH TOPICS
  --------------------------------------------- */
  async function fetchTopics() {
    try {
      const res = await fetch(
        `${process.env.STRAPI_API}blog-topics`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_AUTH_TOKEN}`,
          },
        }
      );

      const json = await res.json();

      const apiTopics =
        json?.data?.map((t: any) => ({
          name: t?.attributes?.name || t?.name,
          slug: t?.attributes?.slug || t?.slug,
        })) || [];

      setTopics([{ name: "All", slug: "all" }, ...apiTopics]);
    } catch (err) {
      console.error("Error fetching topics", err);
    }
  }

  /* --------------------------------------------
  INIT
  --------------------------------------------- */
  useEffect(() => {
    if (fetchFromApi === "false") {
      fetchCategories();
      fetchTopics();
      fetchBlogs(); // initial load
    } else {
      const blogsFromPage =
        data?.content?.blogs ||
        data?.content?.relatedBlogs ||
        [];

      setBlogs(blogsFromPage);
    }
  }, [fetchFromApi]);

  /* --------------------------------------------
  FILTER TRIGGER (SEARCH + CATEGORY + TOPIC)
  --------------------------------------------- */
  useEffect(() => {
    if (fetchFromApi === "true") return;

    const delay = setTimeout(() => {
      fetchBlogs(search, activeCategory, activeTopic);
    }, 400);

    return () => clearTimeout(delay);
  }, [search, activeCategory, activeTopic]);

  /* --------------------------------------------
  FORMAT DATE
  --------------------------------------------- */
  function formatDate(dateStr?: string) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <section className="py-12 px-6 md:px-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <h2 className="text-3xl font-semibold">{title}</h2>

        {fetchFromApi === "false" && (
          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 pl-10 w-full"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </span>
          </div>
        )}
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-3 mb-8">
        <span className="font-medium text-gray-700">Categories:</span>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => {
              setActiveCategory(cat.slug);
            }}
            className={`
              px-4 py-1.5 rounded-lg text-sm
              ${
                activeCategory === cat.slug
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-4 gap-8">

        {/* BLOG GRID */}
        <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => {
            const attr = blog.attributes || blog;
            const image = attr?.coverImage?.url;

            return (
              <Link
                key={blog.id}
                href={`/${attr.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="h-[200px] overflow-hidden">
                  {image && (
                    <img
                      src={resolveImageUrl(image)}
                      alt={attr.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-5">
                  <div className="text-sm text-gray-500 mb-2">
                    📅 {formatDate(attr.publishedAt)}
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {attr.title}
                  </h3>

                  {attr.description && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {attr.description}
                    </p>
                  )}

                  <span className="text-blue-600 text-sm font-medium">
                    Read more
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* SIDEBAR - TOPICS */}
        <div className="hidden lg:block">
          <div className="bg-blue-50 p-5 rounded-xl">
            <h4 className="font-semibold mb-4 text-blue-700">
              Browse Topics
            </h4>

            <ul className="space-y-2 text-sm text-gray-700">
              {topics.map((topic) => (
                <li
                  key={topic.slug}
                  className={`
                    cursor-pointer hover:text-blue-600
                    ${
                      activeTopic === topic.slug
                        ? "text-blue-600 font-medium"
                        : ""
                    }
                  `}
                  onClick={() => setActiveTopic(topic.slug)}
                >
                  • {topic.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}