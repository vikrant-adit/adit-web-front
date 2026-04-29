'use client';
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import "../../styles/Testimonials.css";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";

interface Section {
  id: number;
  title: { en: string };
  body: { en: string };
}

interface PageResponse {
  id: number;
  title: { en: string };
  published_sections: Section[];
}

interface Testimonial {
  category: string;
  videoUrl: string;
  image: string;
  name: string;
  company: string;
  companyUrl: string;
  quote: string;
  logo: string;
}

const Testimonials = () => {
  const [pageData, setPageData] = useState<PageResponse | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(process.env.ADIT_URL+("testimonials"));
        const data = await res.json();
        setPageData(data.page);

        // Parse testimonial items from section 2
        const secondSection = data.page.published_sections[1];
        if (secondSection?.body?.en) {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(
            secondSection.body.en,
            "text/html"
          );
          const items = htmlDoc.querySelectorAll(".testimonialpage-row .item");

          const parsedTestimonials: Testimonial[] = Array.from(items).map(
            (item) => {
              const category = item.dataset.category || "Other";
              const videoUrl =
                (item.querySelector("a") as HTMLAnchorElement)?.href || "";
              const image =
                (item.querySelector("img") as HTMLImageElement)?.src || "";
              const logo =
                (
                  item.querySelector(
                    ".testimonialbox-logo img"
                  ) as HTMLImageElement
                )?.src || "";
              const name =
                (
                  item.querySelector(
                    ".testimonialbox-drdtls strong"
                  ) as HTMLElement
                )?.textContent || "";
              const company =
                (
                  item.querySelector(
                    ".testimonialbox-drdtls a"
                  ) as HTMLAnchorElement
                )?.textContent || "";
              const companyUrl =
                (
                  item.querySelector(
                    ".testimonialbox-drdtls a"
                  ) as HTMLAnchorElement
                )?.href || "";
              const quote =
                (item.querySelector(".testimonialbox-para p") as HTMLElement)
                  ?.textContent || "";

              return {
                category,
                videoUrl,
                image,
                name,
                company,
                companyUrl,
                quote,
                logo,
              };
            }
          );

          setTestimonials(parsedTestimonials);
        }
      } catch (err) {
        console.error("Failed to fetch Testimonials page:", err);
      }
    };

    fetchPage();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(testimonials.map((t) => t.category))),
  ];

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesCategory =
      activeCategory === "All" ||
      t.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.quote.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SiteLayout>
    <div className="max-w-full flex flex-col gap-10 justify-center">
      {/* ========================= Section 1: Intro 
      ========================= */}

     <section className="bg-[linear-gradient(77.03deg,#D4F2FF_-63.11%,#FFFFFF_94.12%)] testimonials">
  <div
    className="relative mx-auto px-6  flex flex-col lg:flex-row gap-10 lg:gap-20 items-center hero testimonialbnnr-row"
  >
    {/* Left Side Content */}
    <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left testimonialbnnrleft-col">
      <div className="dsoheroratereview-block">
        <div className="dsoratereview-list flex justify-center lg:justify-start gap-4 mb-8 flex-wrap">
          {/* Star Ratings */}
          <div className="item bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
            <div className="dsoratereview-box">
              <Image
                src="https://adit.com/storage/files/software-advice-logo.svg"
                alt="Software Advice"
                width={106}
                loading="lazy"
                height={12}
              />
              <div className="dsoratereview-star flex items-center text-yellow-400 text-lg">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
                <span data-asw-orgfontsize="14" style={{ fontSize: 14 }}>
                  4.6
                </span>
              </div>
            </div>
          </div>
          <div className="item bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
            <div className="dsoratereview-box">
              <Image
                src="https://adit.com/storage/files/g2-logo.svg"
                alt="G2"
                loading="lazy"
                width={10}
                height={12}
              />
              <div className="dsoratereview-star flex items-center text-yellow-400 text-lg">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <span data-asw-orgfontsize="14" style={{ fontSize: 14 }}>
                  4.8
                </span>
              </div>
            </div>
          </div>
          <div className="item bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
            <div className="dsoratereview-box">
              <Image
                src="https://adit.com/storage/files/capterra-logo.svg"
                alt="Capterra"
                loading="lazy"
                width={106}
                height={12}
              />
              <div className="dsoratereview-star flex items-center text-yellow-400 text-lg">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
                <span data-asw-orgfontsize="14" style={{ fontSize: 14 }}>
                  4.6
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1
        className="main-title text-4xl md:text-5xl font-bold text-[#002d42] leading-tight"
        data-asw-orgfontsize="42"
        style={{ fontSize: 42 }}
      >
        No Fluff, Just Results
      </h1>
      <div className="w-16 h-1 bg-orange-400 mt-4 mb-4" />

      <p className="text-lg text-gray-700 max-w-lg" data-asw-orgfontsize="23" style={{ fontSize: 23 }}>
        See Adit&apos;s Proven Practices in Action
      </p>

      <Link
        href='/schedule-a-demo'
        className="button site-button head_demopopup bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
        data-asw-orgfontsize="16"
        style={{ fontSize: 16 }}
        
      >
        Schedule a Demo
      </Link>
    </div>

    {/* Right Side Video Grid */}
    <div className="lg:w-1/2 testimonialbnnrright-col">
      <div className="reviewhero-video overflow-hidden">
        <div className="video-block">
          <iframe
            className="w-full h-[420px] rounded-xl"
            src="https://player.vimeo.com/video/1101949730?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            title="Optometry Testimonial Reel_Adit"
            data-ready="true"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ========================= Section 2: Testimonials ========================= */}
      <section className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 className="text-4xl font-bold text-[#002D42]">
            {pageData?.title?.en || "Testimonials"}
          </h1>

          <div className="flex items-center p-2 border rounded-xl bg-white shadow-sm w-full md:w-64">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="p-0 border-none outline-none flex-grow text-gray-700"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                activeCategory === cat
                  ? "bg-[#002D42] text-white"
                  : "bg-white text-[#002D42]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <div className="relative">
                <Image
                  src={t.image}
                  alt={t.name || 'Image'}
                  loading="lazy"
                  width={500}
                  height={500}
                  className="rounded-xl w-full h-52 object-cover"
                />
                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-[#E8F7FF] text-[#002D42] px-3 py-1 rounded-full text-sm font-medium">
                  {t.category}
                </span>
                {/* Play Button */}
                <a
                  href={t.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow hover:scale-110 transition"
                >
                  ▶
                </a>
              </div>

              <div className="mt-4">
                {t.logo && (
                  <Image src={t.logo} alt="logo" className="h-10 mb-2" loading="lazy" width={40} height={40} />
                )}
                <h3 className="font-bold text-lg">{t.name}</h3>
                <a
                  href={t.companyUrl}
                  target="_blank"
                  className="text-sm text-[#22A9E1] hover:underline"
                >
                  {t.company}
                </a>
                <p className="mt-3 text-gray-600 text-sm italic">“{t.quote}”</p>
              </div>
            </div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center text-gray-500">
            No testimonials found.
          </div>
        )}
      </section>
    </div>
    </SiteLayout>
  );
};

export default Testimonials;
