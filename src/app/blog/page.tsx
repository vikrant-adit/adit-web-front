'use client';
import { useEffect, useState, useRef, useCallback } from "react";
import DOMPurify from "dompurify";
import Link from "next/link"; 
import { ChevronRight, Loader2 } from "lucide-react";
import { apiUrl } from "../../lib/config";
import Image from "next/image";
import { resolveImageUrl } from '@/lib/imageResolver';
import SiteLayout from "@/components/layout/SiteLayout";

type NewsArticle = {
  id: number;
  title: { en: string };
  slug: { en: string };
  author: string;
  date: string;
  body: { en: string };
  image: { url: string; alt_attribute_translated?: string };
};

type Categories = {
  id: number;
  category_meta_title: string;
  category_slug: string;
  category_title: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch articles function (NOT in dependency array below)
  const fetchArticles = useCallback(
    async (currentPage: number, reset = false) => {
      try {
        if (currentPage === 1) setLoading(true);
        else setLoadingMore(true);
        
        let url = apiUrl(`news?page=${currentPage}`);
        const params: string[] = [];
        
        if (debouncedSearch)
          params.push(`search=${encodeURIComponent(debouncedSearch)}`);
        if (selectedCategory)
          params.push(`category_slug=${encodeURIComponent(selectedCategory)}`);
        if (selectedAuthor)
          params.push(`author=${encodeURIComponent(selectedAuthor)}`);
        if (params.length > 0) url += `&${params.join("&")}`;

        const res = await fetch(url);
        const data = await res.json();
        const fetchedArticles = data.data || [];

        setArticles((prev) =>
          reset ? fetchedArticles : [...prev, ...fetchedArticles]
        );

        setCategories(data.categories || []);
        setAuthors(data.authors || []);
        setHasMore(fetchedArticles.length > 0);

        if (currentPage === 1) setLoading(false);
        else setLoadingMore(false);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [debouncedSearch, selectedCategory, selectedAuthor]
  );

  // ✅ FIX: Reset and fetch when filters change
  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
    fetchArticles(1, true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // ✅ Don't include fetchArticles in dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, selectedCategory, selectedAuthor]);

  // ✅ Fetch next page when page changes (skip page 1 because handled above)
  useEffect(() => {
    if (page > 1) {
      fetchArticles(page, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Infinite scroll observer
  const lastArticleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loadingMore, hasMore]
  );

  return (
 <SiteLayout>
    <div className="max-w-7xl mx-auto p-4 flex gap-7 flex-row justify-center">
      <div className="max-w-5xl">
        <h1 className="text-4xl font-semibold">The Adit Blog</h1>

        {/* Search field */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Show loading or articles */}
        {loading && page === 1 ? (
          <div className="flex items-center justify-center p-4 text-blue-500">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <p className="text-center p-4 text-gray-600">No news available.</p>
        ) : (
          articles.map((article, index) => {
            const isLast = index === articles.length - 1;
            return (
              <div
                key={article.id}
                ref={isLast ? lastArticleRef : null}
                className="bg-white shadow-lg rounded-2xl p-3 mb-2 flex"
              >
                <div className="leftimg w-[30%]">
                  <Link
                    href={`/blog/${article.slug.en}`}
                    className="block rounded-2xl"
                  >
                    {article.image?.url && (
                      <Image
                       src={resolveImageUrl(`/uploads/istockphoto_1392500126_612x612_49e8a39689.jpg`)}
                      alt={
                          article.image.alt_attribute_translated ||
                          article.title.en
                        }
                        width={400}
                        height={300}
                        className="rounded-xl mb-4"
                        unoptimized
                      />
                    )}
                  </Link>
                </div>

                <div className="righttext w-[70%]">
                  <Link
                    href={`/blog/${article.slug.en}`}
                    className="block rounded-2xl"
                  >
                    <h1 className="text-2xl font-bold mb-2 hover:text-[#FC8B12]">
                      {article.title.en}
                    </h1>
                  </Link>

                  <div
                    className="prose prose-lg max-w-none line-clamp-5"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(article.body.en || ""),
                    }}
                  />

                  <p className="text-lg text-gray-500 mb-4 flex justify-between w-[100%]">
                    <span>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span>{article.author}</span>
                  </p>
                </div>
              </div>
            );
          })
        )}

        {loadingMore && (
          <div className="flex items-center justify-center p-4 text-blue-500">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="max-w-xs">
        <h1 className="text-2xl font-semibold mb-4">View by Author</h1>
        <div className="flex flex-wrap gap-2">
          {authors.map((author) => (
            <div key={author} className="w-full flex items-center gap-2">
              <Image
                className="w-[20%] rounded-full"
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                alt="profile picture"
                width={50}
                height={50}
              />
              <button
                className={`px-4 py-2 rounded-xl border ${
                  selectedAuthor === author
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setSelectedAuthor(selectedAuthor === author ? null : author)
                }
              >
                {author}
              </button>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-semibold mb-4 mt-6">Browse topics</h1>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.category_slug
                  ? null
                  : category.category_slug
              )
            }
            className={`cursor-pointer w-full flex items-center p-2 rounded-lg ${
              selectedCategory === category.category_slug
                ? "bg-blue-100 font-bold"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="text-[#FC8B12]" />
            <span>{category.category_title}</span>
          </div>
        ))}
      </div>
    </div>
    </SiteLayout>
  );
}
