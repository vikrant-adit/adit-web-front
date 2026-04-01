'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import SafeHtml from "../../../components/common/SafeHtml";
import "../../../styles/NewsDetails.css";
type TOCItem = { id: string; text: string };

import Image from "next/image";
import Link from "next/link";
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
type Author = {
  name: string;
  designation: string;
  bio: string;
};
export default function NewsDetail() {
  const params = useParams() as { slug?: string } | null;
  const slug = params?.slug ?? "";
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
const [authorDetails, setAuthorDetails] = useState<Author | null>(null);
  const [sanitizedHTML, setSanitizedHTML] = useState("");
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch article by slug
  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        if (!slug) return <p>Invalid slug.</p>;
       const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+(`new/${encodeURIComponent(slug)}`));
        const data = await res.json();
        setArticle(data.data);
        setAuthorDetails(data.authorDetail);
        setRelatedArticles(data.latest)
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchArticle();
  }, [slug]);

  // Fetch "You may also like" articles


  // Process article body to extract <h2> tags and add IDs
  useEffect(() => {
    if (!article?.body?.en) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(article.body.en, "text/html");

    const h2Elements = Array.from(doc.querySelectorAll("h2"));
    const toc = h2Elements.map((el, index) => {
      const text = el.textContent || `Heading ${index + 1}`;
      const headingSlug = text
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^-+|-+$/g, "");
      el.id = headingSlug;
      return { id: headingSlug, text };
    });

    setHeadings(toc);
    setSanitizedHTML(DOMPurify.sanitize(doc.body.innerHTML));
  }, [article]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (!article) return <p className="text-center p-4 text-red-500">Article not found.</p>;

  return (
 <SiteLayout>
    <div className="max-w-6xl mx-auto p-4">
      {/* Article Date */}
      <p className="text-gray-500 mb-2">
        {new Date(article.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{article.title.en}</h1>

      {/* Image */}
      {article.image?.url && (
        <Image
        src={resolveImageUrl(`/uploads/istockphoto_1392500126_612x612_49e8a39689.jpg`)}
          alt={article.image.alt_attribute_translated || article.title.en}
            width={800}
          height={400}
          className="rounded-xl mb-6 w-full max-h-[400px] object-cover"
          loading="lazy"
          unoptimized
        />
      )}

     <div className="flex flex-row gap-6">
  {/* Main Content */}
  <div className="flex-1 flex flex-col">
    {/* Table of Contents */}
    {headings.length > 0 && (
      <div className="mb-6 p-4 bg-gray-100 rounded-xl shadow-sm table-of-contents">
        <h2 className="text-xl font-semibold mb-2">Table of Contents</h2>
        <ul className="space-y-1 list-disc list-inside">
          {headings.map((h, index) => (
            <li key={h.id} className="list-none">
              <button
                className="text-blue-600 hover:text-[#22a9e1] text-left text-[#FC8B12]"
                onClick={() => scrollToHeading(h.id)}>
                {index + 1}. {h.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Article Content */}
    <SafeHtml html={sanitizedHTML} className="prose prose-lg max-w-none contents" />
  </div>

  {/* Sidebar */}
  <div className="w-1/3 sticky top-4 h-fit self-start">
    <h1 className="text-xl font-bold mb-4">You May Also Like</h1>
    <div className="flex flex-col gap-4">
      {relatedArticles.map((ra) => (
      <Link  key={ra.id} href={`/blog/${ra.slug.en}`}>
        <div
         
          className="bg-white flex flex-row shadow rounded-lg p-3 hover:shadow-md transition cursor-pointer"
         
        >
          <Image
             src={resolveImageUrl(`/uploads/istockphoto_1392500126_612x612_49e8a39689.jpg`)}
            width={100}
            height={100}
            alt=""
            className="rounded-lg mr-3"
            loading="lazy"
            unoptimized
          />
          <div>
            <h2 className="text-lg font-semibold line-clamp-2 mb-1">
              {ra.title.en}
            </h2>
            <div className="text-sm text-gray-600 line-clamp-2">
              <SafeHtml html={ra.body.en || ""} className="text-sm text-gray-600 line-clamp-2" />
            </div>
          </div>
        </div></Link>
      ))}
    </div>
  </div>
</div>

       {/* Author */}
          {authorDetails && (
  <div className="flex flex-row">
    <Image
 src={resolveImageUrl(`/uploads/istockphoto_1392500126_612x612_49e8a39689.jpg`)}    alt=""
      width={100}
      height={100}
      loading="lazy"
      unoptimized
    />
    <div>
      <p className="text-sm text-gray-500 mt-6">{authorDetails.name}</p>
      <span className="text-sm text-gray-500">{authorDetails.designation}</span>
      <p>{authorDetails.bio}</p>
    </div>
  </div>
)}


          {/* Back Button */}
          <div className="mt-8">
            <Link href="/blog">
            <button
             
              className="px-4 py-2 btn-primary text-white rounded-lg hover:bg-blue-700 transition"
            >
              ← Back to Blog Page
            </button>
            </Link>
          </div>
    </div>
    </SiteLayout>
  );
}
