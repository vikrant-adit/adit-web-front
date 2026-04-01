'use client';
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";

interface VideoItem {
  id: number;
  title: { en: string };
  slug: { en: string };
  video_url: string;
  video_duration: string;
  image?: { url: string; alt_attribute_translated?: string };
}

export default function VideoReel() {
  const baseUrl = "https://adit.com/api/v1/videos";
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(baseUrl);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false); // Track loading state without causing re-renders
  const nextPageUrlRef = useRef<string | null>(baseUrl);

  const fetchVideos = useCallback(async (url?: string) => {
    // Check the ref instead of state
    if (isLoadingRef.current) return;
    const targetUrl = url ?? nextPageUrlRef.current;
    if (!targetUrl) return;

    try {
      isLoadingRef.current = true;
      setLoading(true);
      const res = await fetch(targetUrl);
      const json = await res.json();
      setVideos((prev) => [...prev, ...(json.data || [])]);
      const next = json.next_page_url || null;
      setNextPageUrl(next);
      nextPageUrlRef.current = next;
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Initial load - only run once
  useEffect(() => {
    fetchVideos(baseUrl);
  }, [fetchVideos]); // initial load on mount; fetchVideos is stable

  // Infinite scroll via Intersection Observer
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || !nextPageUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingRef.current) {
          fetchVideos();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [nextPageUrl, fetchVideos]);

  if (!videos.length && loading) {
    return (
      <div className="text-center text-gray-400 py-10">Loading videos...</div>
    );
  }

  return (
    <SiteLayout>
    <section className="bg-[#002d42] text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
      

        <p className="text-gray-300 mb-8">
          Watch these amazing videos and learn more about our products and
          services
        </p>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/video-reel/${video.slug?.en}`}
              className="block"
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img
                  src={video.image?.url}
                  alt={video.image?.alt_attribute_translated || video.title.en || 'Image'}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 w-10 h-10 flex items-center justify-center rounded-full">
                    ▶
                  </div>
                </div>
                {/* Duration Tag */}
                <span className="absolute bottom-2 right-2 bg-black/70 text-xs px-2 py-1 rounded-md">
                  {video.video_duration}
                </span>
              </div>
              <h3 className="text-sm mt-3 text-center">
                {video.title.en.length > 50
                  ? video.title.en.slice(0, 50) + "..."
                  : video.title.en}
              </h3>
            </Link>
          ))}
        </div>

        {/* Infinite scroll sentinel */}
        <div ref={loadMoreRef} className="h-10" />
        {loading && videos.length > 0 && (
          <div className="text-center text-gray-400 py-4">Loading more...</div>
        )}
        {!nextPageUrl && videos.length > 0 && (
          <div className="text-center text-gray-500 py-4">No more videos</div>
        )}
      </div>
    </section>
  </SiteLayout>
  );
}