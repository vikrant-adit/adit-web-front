'use client';
import { useEffect, useState, useRef } from "react";
import { apiUrl } from "@/lib/config";
import { useParams } from "next/navigation";
import Link from "next/link";
import DOMPurify from "dompurify";
import SafeHtml from "../../../components/common/SafeHtml";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../../styles/EbookDetails.css";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
   const params = useParams<{ slug?: string }>();
  const slug = params?.slug;
  const [ebook, setEbook] = useState(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [similarEbooks, setSimilarEbooks] = useState<Ebook[]>([]);
  const [activeTab, setActiveTab] = useState<string>("tab-1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    updateScrollButtons(); // check on mount
    container.addEventListener("scroll", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, [similarEbooks]);

  useEffect(() => {
    async function fetchEbook() {
      try {
        setLoading(true);
        setError(null);

        const url = apiUrl(`ebook/${encodeURIComponent(slug ?? "")}`);
        const response = await fetch(url);

        if (!response.ok)
          throw new Error(`Failed to fetch ebook: ${response.status}`);

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
      } catch (error) {
        console.error("Failed to fetch ebook:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load ebook"
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchEbook();
  }, [slug]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -1000, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 1000, behavior: "smooth" });
    }
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
          const isTabSection = section.body.en.includes("ebkinsidetab-sec");

          if (isTabSection) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(section.body.en, "text/html");
            const tabMenuItems = Array.from(doc.querySelectorAll(".ebktab-menu a"));
            const tabBoxes = Array.from(doc.querySelectorAll(".ebktab-box"));

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
                className="prose prose-lg max-w-none second-section bg-red-200"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  const anchor = target.closest("a");
                  if (anchor?.dataset.rel) {
                    e.preventDefault();
                    setActiveTab(anchor.dataset.rel);
                  }
                }}
              >
                <SafeHtml html={DOMPurify.sanitize(doc.body.innerHTML)} className="prose prose-lg max-w-none second-section" />
              </div>
            );
          }

          const sectionClass = index === 0 ? "first-section" : index === 1 ? "second-section" : "third-section";

          return (
            <SafeHtml key={section.id} html={DOMPurify.sanitize(section.body.en || "")} className={`prose prose-lg max-w-none ${sectionClass}`} />
          );
        })}

        {/* Similar Content Section */}
        {similarEbooks.length > 0 && (
          <div className="mt-16 px-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Similar Content</h2>
              <Link
                href="/dental-success-ebooks"
                className="text-[#00000] font-bold hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="relative">
              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10 py-4"
              >
                {similarEbooks.map((ebook) => (
                  <div
                    key={ebook.id}
                    className="min-w-[250px] group bg-white rounded-2xl shadow hover:shadow-lg transition p-3 flex flex-col overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative rounded-xl overflow-hidden h-48 transition-all duration-300 group-hover:h-12">
                      <Image
                        src="https://media.istockphoto.com/id/1392500126/vector/label-with-demo-megaphone-marketing-announcement-online-marketing-concept-vector-stock.jpg?s=612x612&w=0&k=20&c=Uan70WpF-eW464PXXdLhobaJ_EfhSMZu3ETPx1W8yIw="
                        alt={
                          ebook.image?.alt_attribute_translated ??
                          ebook.title.en
                        }
                        width={100}
                        height={100}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-xl transform transition-transform duration-300 group-hover:-translate-y-24 border"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold line-clamp-2 my-2 transition-all duration-300 group-hover:-mt-4">
                      {ebook.title.en}
                    </h3>

                    {/* Summary */}
                    {ebook.summary?.en && (
                      <div className="mt-1 overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100">
                        <p className="text-gray-600 text-sm line-clamp-5">
                          {ebook.summary.en}
                        </p>
                      </div>
                    )}

                    {/* Read More */}
                    <Link
                      href={`/dental-success-ebooks/${ebook.slug.en}`}
                      className="text-[#22a9e1] font-medium hover:underline mt-auto"
                    >
                      Read More
                    </Link>
                  </div>
                ))}
              </div>

              {/* Scroll Buttons */}
              <div className="w-full flex justify-end gap-4 px-5 py-5">
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className={`bg-white text-[#22a9e1] shadow rounded-full p-2 z-10 hover:bg-gray-100 transition 
                  ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className={`bg-white text-[#22a9e1] shadow rounded-full p-2 z-10 hover:bg-gray-100 transition
                  ${!canScrollRight ? "opacity-50 cursor-not-allowed" : ""}`}
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
