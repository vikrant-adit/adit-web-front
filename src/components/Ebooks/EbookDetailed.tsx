"use client";

import { useEffect, useState, useRef } from "react";
import { apiUrl } from "@/lib/config";
import { useParams } from "next/navigation";
import Link from "next/link";
import DOMPurify from "dompurify";
import SafeHtml from "../common/SafeHtml";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/EbookDetails.css";
import Image from "next/image";
import SiteLayout from "../layout/SiteLayout";

type Section = {
  id: number;
  position: number;
  body: { en: string };
};

type Ebook = {
  id: number;
  slug: { en: string };
  title: { en: string };
  summary?: { en: string };
  image?: { alt_attribute_translated?: string; url?: string };
};

export default function EbookDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [similarEbooks, setSimilarEbooks] = useState<Ebook[]>([]);
  const [activeTab, setActiveTab] = useState<string>("tab-1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll controls
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, [similarEbooks]);

  // Fetch Ebook
  useEffect(() => {
    async function fetchEbook() {
      try {
        setLoading(true);
        setError(null);

        if (!slug) return;

        const url = apiUrl(`ebook/${encodeURIComponent(slug)}`);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch ebook: ${response.status}`);
        }

        const data = await response.json();

        setEbook(data.ebook);

        if (Array.isArray(data.ebook?.published_sections)) {
          const sortedSections = [...data.ebook.published_sections].sort(
            (a, b) => a.position - b.position
          );
          setSections(sortedSections);
        }

        if (Array.isArray(data.similarEbooks)) {
          setSimilarEbooks(data.similarEbooks);
        }
      } catch (err) {
        console.error("Failed to fetch ebook:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load ebook"
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchEbook();
  }, [slug]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -1000, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 1000, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(276.93deg,#BEECFF_-238.51%,#002D42_87.59%)]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !ebook) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(276.93deg,#BEECFF_-238.51%,#002D42_87.59%)]">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-xl">{error || "Ebook not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <SiteLayout>
      <div className="min-h-screen">
        <div className="mx-auto space-y-10">
          {/* Sections */}
          {sections.map((section, index) => {
            const isTabSection =
              section.body.en.includes("ebkinsidetab-sec");

            if (isTabSection) {
              const parser = new DOMParser();
              const doc = parser.parseFromString(
                section.body.en,
                "text/html"
              );

              const tabMenuItems = Array.from(
                doc.querySelectorAll(".ebktab-menu a")
              );
              const tabBoxes = Array.from(
                doc.querySelectorAll(".ebktab-box")
              );

              tabMenuItems.forEach((a) => {
                const rel = a.getAttribute("data-rel") || "";
                if (rel === activeTab) a.classList.add("active");
                else a.classList.remove("active");
              });

              tabBoxes.forEach((box) => {
                if (box.id === activeTab) box.classList.add("active");
                else box.classList.remove("active");
              });

              return (
                <div
                  key={section.id}
                  className="prose prose-lg max-w-none second-section"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const anchor = target.closest("a");

                    if (anchor?.dataset.rel) {
                      e.preventDefault();
                      setActiveTab(anchor.dataset.rel);
                    }
                  }}
                >
                  <SafeHtml
                    html={DOMPurify.sanitize(doc.body.innerHTML)}
                    className="prose prose-lg max-w-none second-section"
                  />
                </div>
              );
            }

            const sectionClass =
              index === 0
                ? "first-section"
                : index === 1
                ? "second-section"
                : "third-section";

            return (
              <SafeHtml
                key={section.id}
                html={DOMPurify.sanitize(section.body.en || "")}
                className={`prose prose-lg max-w-none ${sectionClass}`}
              />
            );
          })}

          {/* Similar Content */}
          {similarEbooks.length > 0 && (
            <div className="mt-16 px-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                  Similar Content
                </h2>

                <Link
                  href="/dental-success-ebooks"
                  className="font-bold hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="relative">
                <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-4"
                >
                  {similarEbooks.map((ebook) => (
                    <div
                      key={ebook.id}
                      className="min-w-[250px] group bg-white rounded-2xl shadow hover:shadow-lg transition p-3 flex flex-col"
                    >
                      <div className="relative rounded-xl overflow-hidden h-48 group-hover:h-12 transition-all">
                        <Image
                          src="https://media.istockphoto.com/id/1392500126/vector/label-with-demo-megaphone-marketing-announcement-online-marketing-concept-vector-stock.jpg"
                          alt={
                            ebook.image?.alt_attribute_translated ??
                            ebook.title.en
                          }
                          width={300}
                          height={200}
                          className="object-cover"
                        />
                      </div>

                      <h3 className="font-semibold line-clamp-2 my-2">
                        {ebook.title.en}
                      </h3>

                      {ebook.summary?.en && (
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {ebook.summary.en}
                        </p>
                      )}

                      <Link
                        href={`/ebook/${ebook.slug.en}`}
                        className="text-[#22a9e1] font-medium hover:underline mt-auto"
                      >
                        Read More
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4 px-5 py-5">
                  <button
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className={`bg-white shadow rounded-full p-2 ${
                      !canScrollLeft
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className={`bg-white shadow rounded-full p-2 ${
                      !canScrollRight
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}