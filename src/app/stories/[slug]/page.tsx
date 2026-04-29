/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from "react";
import SafeHtml from "../../../components/common/SafeHtml";
import { useParams } from "next/navigation";
import Link from "next/link";
import stories from "@/assets/stories.jpeg";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";

interface WebStoryDetailItem {
  id: number | string;
  title: string;
  image?: any;
  body?: string;
  summaryCss?: string;
  categories?: { id: number; category_title: string; category_slug: string }[];
}
const normalizeDetail = (raw:any): WebStoryDetailItem => {
  const w = raw?.webstory ?? raw;

  return {
    id: w?.id ?? "",
    title: w?.title?.en ?? w?.title ?? "Untitled Story",
    image: w?.image ? stories : undefined,
    body: w?.body?.en ?? "",
    // Extract CSS from <style> block in summary.en (if exists)
summaryCss: w?.summary?.en?.match(/<style\b[^>]*>([^<]*)<\/style>/i)?.[1] ?? "",    categories: w?.categories ?? [],
  };
};

function InjectStoryCSS({ css }: { css: string }) {
  useEffect(() => {
    if (!css) return;
    const styleEl = document.createElement("style");
    styleEl.dataset.storyStyle = "true";
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    return () => {
      // Clean up when leaving the page
      styleEl.remove();
    };
  }, [css]);

  return null;
}

export default function WebStoryDetail() {
const params = useParams<{ slug: string }>();

// params will be an object like { slug: "some-value" }
// Access it safely:
const slug = params?.slug;
const [story, setStory] = useState<WebStoryDetailItem | null>(null);  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://adit.com/api/v1/webstory/${slug}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setStory(normalizeDetail(data));
      } catch (err: any) {
        if (err.name !== "AbortError")
          setError(err.message ?? "Failed to load story");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading story…</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!story) {
    return <div className="text-center py-10 text-gray-500">No story found.</div>;
  }

  return (
    <SiteLayout>
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Inject AMP CSS for this story */}
      {story.summaryCss && <InjectStoryCSS css={story.summaryCss} />}

      <Link
        href="/stories"
        className="text-[#22A9E1] hover:underline text-sm mb-6 inline-block"
      >
        ← Back to Web Stories
      </Link>

      {story.image ? (
        <Image
          src={story.image}
          alt={story.title || 'Image'}
          className="w-full rounded-2xl shadow"
        />
      ) : (
        <div className="rounded-xl w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* <h1 className="mt-6 text-3xl font-bold text-[#002D42]">{story.title}</h1> */}

      {(story.categories?.length ?? 0) > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {story.categories?.map((cat:any) => (
            <span
              key={cat.id}
              className="text-xs font-medium text-[#22A9E1] bg-[#E6F7FB] px-3 py-1 rounded-full"
            >
            </span>
          ))}
        </div>
      )}

      {/* Render story body */}
      {story.body && (
        <SafeHtml html={story.body} className="mt-6 prose prose-lg max-w-none" />
      )}
    </div>
    </SiteLayout>
  );
}
