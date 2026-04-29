/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import  Link  from "next/link";
import SafeHtml from "../../components/common/SafeHtml";
import { useEffect, useMemo, useRef, useState } from "react";
import SiteLayout from "@/components/layout/SiteLayout";

interface WebStoryItem {
  id: string | number;
  title: string;
  image?: string;
  url?: string;
  author?: string;
  description?: string;
  slug?:{en?:string};
  categories?: { id: number; category_title: string; category_slug: string }[];
}

interface WebStoryCategory {
  id: number;
  title: string;
  slug: string;
}

interface WebStoriesPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface WebStoriesResponse {
  data: [];
  categories?: {
    id: number;
    category_title: string;
    category_slug: string;
    parent_id?: number;
  }[];
  pagination?: WebStoriesPagination;
}

const WEBSTORIES_ENDPOINT = "https://adit.com/api/v1/webstories";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeItem = (raw:any): WebStoryItem => {
  const id =
    raw?.id ?? raw?.ID ?? raw?._id ?? Math.random().toString(36).slice(2);
  const title =
    raw?.title?.en ??
    raw?.title_en ??
    raw?.title?.rendered ??
    raw?.title ??
    raw?.name ??
    raw?.headline ??
    `Story ${id}`;
  const imageCandidate =
    raw?.image_url ??
    raw?.image ??
    raw?.cover ??
    raw?.thumbnail ??
    raw?.featured_image ??
    raw?.featuredImage ??
    raw?.poster ??
    raw?.media?.url ??
    raw?.featured_media?.source_url ??
    raw?.featured_media_url;
  const image = typeof imageCandidate === "string" ? imageCandidate : undefined;
  const urlCandidate =
    raw?.url ?? raw?.story_url ?? raw?.link ?? raw?.permalink ?? raw?.slug;
  const url = typeof urlCandidate === "string" ? urlCandidate : undefined;
  const author =
    raw?.author?.name ?? (typeof raw?.author === "string" ? raw.author : undefined);
  const descriptionCandidate =
    raw?.excerpt?.rendered ?? raw?.excerpt ?? raw?.description;
  const description =
    typeof descriptionCandidate === "string" ? descriptionCandidate : undefined;

  return {
    id,
    title,
    image,
    url,
    author,
    description,
    slug: raw?.slug, // ✅ keep slug from API
    categories: raw?.categories ?? [],
  };
};


export default function Stories() {
  const [allItems, setAllItems] = useState<WebStoryItem[]>([]); // ✅ store all fetched
  const [items, setItems] = useState<WebStoryItem[]>([]); // ✅ store filtered
  const [categories, setCategories] = useState<WebStoryCategory[]>([]);
  const [pagination, setPagination] = useState<WebStoriesPagination | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const buildUrl = (p: number) => {
    const url = new URL(WEBSTORIES_ENDPOINT);
    url.searchParams.set("page", String(p));
    return url.toString();
  };

  // ✅ Load API & keep master list
  useEffect(() => {
    const ac = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(buildUrl(page), {
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json: WebStoriesResponse | [] = await res.json();
        const itemsRaw = Array.isArray(json) ? json : json?.data ?? [];
        const itemsNorm = itemsRaw.map(normalizeItem);

        setAllItems((prev) =>
          page === 1 ? itemsNorm : [...prev, ...itemsNorm]
        );

        // ✅ only set categories on first page
        if (!Array.isArray(json)) {
          const catsRaw = json?.categories ?? [];
          if (page === 1) {
            setCategories(
              catsRaw.map((c) => ({
                id: c.id,
                title: c.category_title,
                slug: c.category_slug,
              }))
            );
          }
          setPagination(json?.pagination ?? null);
        }
      } catch (e:any) {
        if (e?.name === "AbortError") return;
        setError(e?.message ?? "Failed to load web stories");
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => ac.abort();
  }, [page]);

  // ✅ Filter items when category changes or when allItems updates
  useEffect(() => {
    if (category === "all") {
      setItems(allItems);
    } else {
      setItems(
        allItems.filter((item) =>
          item.categories?.some((c) => c.category_slug === category)
        )
      );
    }
  }, [allItems, category]);

  // ✅ Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading) {
          if (pagination && pagination.current_page < pagination.last_page) {
            setPage((p) => p + 1);
          }
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [pagination, loading]);

  const hasItems = useMemo(() => items.length > 0, [items]);

  const onSelectCategory = (slug: string) => {
    setCategory(slug); // ✅ triggers filtering via useEffect
  };

  return (
    <SiteLayout>
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-[#002D42] mb-6">Web Stories</h1>

      {loading && page === 1 && (
        <div className="text-gray-600">Loading web stories…</div>
      )}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && !hasItems && (
        <div className="text-gray-600">No stories available.</div> 
      )}

      <div className="flex flex-row gap-4">
        {/* Cards Grid */}
        {!error && hasItems && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-[70%]">
            {items.map((item:any) => {

              return (
             <Link key={item.id} href={'/stories/' + (item.slug.en ?? '')}>
                 <article
                  key={item.id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title || 'Image'}
                      className="rounded-xl w-full h-56 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="rounded-xl w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                      <img
                     src="https://media.istockphoto.com/id/1392500126/vector/label-with-demo-megaphone-marketing-announcement-online-marketing-concept-vector-stock.jpg?s=612x612&w=0&k=20&c=Uan70WpF-eW464PXXdLhobaJ_EfhSMZu3ETPx1W8yIw="
                      alt={item.title || 'Image'}
                      className="rounded-xl w-full h-56 object-cover"
                      loading="lazy"
                    />
                    </div>
                  )}

                  <div className="mt-4 flex-1 flex flex-col">
                    <h2 className="font-semibold text-lg text-[#002D42] line-clamp-2">
                      {item.title}
                    </h2>
                    {item.author && (
                      <div className="text-sm text-gray-500 mt-1">
                        By {item.author}
                      </div>
                    )}
                    {item.description && (
                      <SafeHtml html={item.description} className="text-sm text-gray-600 mt-2 line-clamp-3" />
                    )}

                    {/* ✅ Category tags below description */}
                    {item.categories?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.categories.map((cat:any) => (
                          <span
                            key={cat.id}
                            className="text-xs font-medium text-[#22A9E1] bg-[#E6F7FB] px-3 py-1 rounded-full"
                          >
                            {cat.category_title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
               </Link>
              );
            })}
          </div>
        )}

        {/* Sidebar - Categories */}
        <div className="mb-6 w-[30%]">
          <h2 className="text-xl font-bold text-[#002D42] mb-4">
            Browse topics
          </h2>
          <ul className="flex flex-col gap-2">
            <li key="all">
              <button
                className={`w-full text-left flex items-center gap-2 text-sm hover:text-[#22a9e1] transition ${
                  category === "all"
                    ? "font-semibold text-[#22a9e1]"
                    : "text-gray-700"
                }`}
                onClick={() => onSelectCategory("all")}
              >
                <span className="text-[#22a9e1]">&rsaquo;</span> All
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  className={`w-full text-left flex items-center gap-2 text-sm hover:text-[#22a9e1] transition ${
                    category === c.slug
                      ? "font-semibold text-[#22a9e1]"
                      : "text-gray-700"
                  }`}
                  onClick={() => onSelectCategory(c.slug)}
                >
                  <span className="text-[#22a9e1]">&rsaquo;</span> {c.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ✅ Loading indicator stays below cards */}
      {loading && page > 1 && (
        <div className="text-center py-4 text-gray-600">
          Loading more stories…
        </div>
      )}

      {/* ✅ Single Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-10" />
    </div>
    </SiteLayout>
  );
}
