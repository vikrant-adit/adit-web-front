'use client';
import { useEffect, useState, useRef, useCallback } from "react";
import Link  from "next/link";
import { Search } from "lucide-react";
import { apiUrl } from "../../lib/config";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
type Ebook = {
  id: number;
  title: { en: string };
  slug: { en: string };
  summary: { en: string };
  image: { url: string; alt_attribute_translated?: string };
};

const Ebooks = () => {
  const [allEbooks, setAllEbooks] = useState<Ebook[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCardRef = useRef<HTMLDivElement | null>(null);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchEbooks = useCallback(
    async (url?: string, reset = false) => {
      try {
        setLoadingMore(true);
        let fetchUrl = url ?? apiUrl("ebooks");

        // Add search parameter only for initial requests
        if (debouncedSearch && !url) {
          fetchUrl += `?search=${encodeURIComponent(debouncedSearch)}`;
        }

        const res = await fetch(fetchUrl);
        const data = await res.json();
        const fetchedEbooks: Ebook[] = data.data || [];

        setAllEbooks((prev) =>
          reset ? fetchedEbooks : [...prev, ...fetchedEbooks]
        );

        setNextPageUrl(data.next_page_url || null);
        setHasMore(!!data.next_page_url);
      } catch (err) {
        console.error("Failed to fetch ebooks:", err);
      } finally {
        setLoadingMore(false);
      }
    },
    [debouncedSearch]
  );

  // Reset and fetch when search changes
  useEffect(() => {
    setAllEbooks([]);
    setNextPageUrl(null);
    setHasMore(true);
    fetchEbooks(undefined, true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [debouncedSearch, fetchEbooks]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || !nextPageUrl) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          fetchEbooks(nextPageUrl);
        }
      },
      { threshold: 1 }
    );

    if (lastCardRef.current) {
      observerRef.current.observe(lastCardRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [nextPageUrl, hasMore, fetchEbooks, loadingMore]);

  return (
    <SiteLayout>
    <div className="max-w-full flex flex-col gap-7 justify-center">
      {/* Header + Search */}
      <div className="mb-6 flex items-center justify-between p-5">
        <h1 className="text-4xl font-bold text-[#002D42]">
          Guides for Dental Practice Growth
        </h1>
        <div className="flex items-center p-2 border rounded-xl bg-white shadow-sm">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="p-0 border-none outline-none flex-grow text-gray-700"
          />
        </div>
      </div>

      {/* Grid of ebooks */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 w-[90%] mx-auto">
        {allEbooks.map((ebook, index) => {
          const isLast = index === allEbooks.length - 1;
          return (
            <div
              key={`${ebook.id}-${index}`}
              ref={isLast ? lastCardRef : null}
              className="group bg-white rounded-2xl shadow hover:shadow-lg transition p-3 flex flex-col overflow-hidden relative"
            >
              {/* Image Container */}
              <div className="relative rounded-xl overflow-hidden h-48 transition-all duration-300 group-hover:h-12">
                <Image
                  src="https://media.istockphoto.com/id/1392500126/vector/label-with-demo-megaphone-marketing-announcement-online-marketing-concept-vector-stock.jpg?s=612x612&w=0&k=20&c=Uan70WpF-eW464PXXdLhobaJ_EfhSMZu3ETPx1W8yIw="
                  alt={ebook.image.alt_attribute_translated ?? ebook.title.en}
                  loading="lazy"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-xl transform transition-transform duration-300 group-hover:-translate-y-24 border"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold line-clamp-2 my-2 transition-all duration-300 group-hover:-mt-4">
                {ebook.title.en}
              </h3>

              {/* Summary (revealed on hover) */}
              <div className="mt-1 overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100">
                <p className="text-gray-600 text-sm line-clamp-5">
                  {ebook.summary?.en}
                </p>
              </div>

              {/* Read More Link */}
              <Link
                href={`/dental-success-ebooks/${ebook.slug.en}`}
                className="text-[#22a9e1] font-medium hover:underline mt-auto"
              >
                Read More
              </Link>
            </div>
          );
        })}
      </div>

      {/* Loading spinner */}
      {loadingMore && (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* No more results */}
      {!hasMore && allEbooks.length > 0 && (
        <p className="text-center text-gray-500 my-4">No more ebooks</p>
      )}
    </div>
    </SiteLayout>
  );
};

export default Ebooks;