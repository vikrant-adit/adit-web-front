"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import SafeHtml from "../common/SafeHtml";
import "../../styles/NewsDetails.css";
import { apiUrl } from "../../lib/config";
import Image from "next/image";

type TOCItem = { id: string; text: string };

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
  const params = useParams();
  const router = useRouter();

  const slug = params?.slug as string;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [authorDetails, setAuthorDetails] = useState<Author | null>(null);
  const [sanitizedHTML, setSanitizedHTML] = useState("");
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch article
  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        if (!slug) return;

        const res = await fetch(apiUrl(`new/${encodeURIComponent(slug)}`));
        const data = await res.json();

        setArticle(data.data);
        setAuthorDetails(data.authorDetail);
        setRelatedArticles(data.latest);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchArticle();
  }, [slug]);

  // Process headings
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
  if (!article)
    return (
      <p className="text-center p-4 text-red-500">
        Article not found.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Date */}
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
          src="https://media.istockphoto.com/id/1392500126/vector/label-with-demo-megaphone-marketing-announcement-online-marketing-concept-vector-stock.jpg"
          alt={
            article.image.alt_attribute_translated ||
            article.title.en ||
            "Image"
          }
          className="rounded-xl mb-6 w-full max-h-[400px] object-cover"
          width={1200}
          height={400}
        />
      )}

      <div className="flex flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* TOC */}
          {headings.length > 0 && (
            <div className="mb-6 p-4 bg-gray-100 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-2">
                Table of Contents
              </h2>
              <ul className="space-y-1">
                {headings.map((h, index) => (
                  <li key={h.id}>
                    <button
                      className="text-[#FC8B12]"
                      onClick={() => scrollToHeading(h.id)}
                    >
                      {index + 1}. {h.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content */}
          <SafeHtml
            html={sanitizedHTML}
            className="prose prose-lg max-w-none"
          />
        </div>

        {/* Sidebar */}
        <div className="w-1/3 sticky top-4 h-fit">
          <h1 className="text-xl font-bold mb-4">
            You May Also Like
          </h1>

          <div className="flex flex-col gap-4">
            {relatedArticles.map((ra) => (
              <Link
                key={ra.id}
                href={`/blog/${ra.slug.en}`}
                className="bg-white flex shadow rounded-lg p-3 hover:shadow-md transition"
              >
                <Image
                  src="https://media.istockphoto.com/id/1392500126/vector/label-with-demo-megaphone-marketing-announcement-online-marketing-concept-vector-stock.jpg"
                  width={100}
                  height={100}
                  alt=""
                  className="rounded-lg mr-3"
                />

                <div>
                  <h2 className="text-lg font-semibold line-clamp-2 mb-1">
                    {ra.title.en}
                  </h2>

                  <SafeHtml
                    html={ra.body.en || ""}
                    className="text-sm text-gray-600 line-clamp-2"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Author */}
      {authorDetails && (
        <div className="flex mt-8 gap-4">
          <Image
            src="https://media.istockphoto.com/id/1392500126/vector/label-with-demo-megaphone-marketing-announcement-online-marketing-concept-vector-stock.jpg"
            alt=""
            width={100}
            height={100}
          />

          <div>
            <p className="text-sm text-gray-500">
              {authorDetails.name}
            </p>
            <span className="text-sm text-gray-500">
              {authorDetails.designation}
            </span>
            <p>{authorDetails.bio}</p>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={() => router.push("/blog")}
          className="px-4 py-2 btn-primary text-white rounded-lg"
        >
          ← Back to Blog Page
        </button>
      </div>
    </div>
  );
}