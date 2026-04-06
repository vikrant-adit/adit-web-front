"use client";
import { JSX, useState, useEffect } from "react";
import "../../styles/Industries.css";
import { useMemo } from "react";
import Image from "next/image";
type Industry = {
  name: string;
  icon: JSX.Element;
  description: string;
};

export default function Industries(): JSX.Element {
  const industries: Industry[] = useMemo(
    () => [
      {
        name: "Dental",
        icon: <i className="fa-solid fa-tooth"></i>,
        description:
          "Run a smoother, smarter dental practice with dental practice management software that helps you schedule better, reduce no-shows, and boost collections, all while giving your patients something to smile about.",
      },
      {
        name: "Optometry",
        icon: <i className="fa-solid fa-glasses"></i>,
        description:
          "Still squinting at patient handwriting and lost voicemails? Adit brings everything into focus with HIPAA-compliant software for optometrists, all in one platform. It’s the 20/20 upgrade your front desk deserves.",
      },
      {
        name: "Chiropractic",
        icon: (
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            className="fa-chiro"
          >
            <path
              d="m1.507 0.5 13.316 2.772A10 10 0 0 1 22.507 13v10.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <path
              d="m1.507 12.5 9.27 1.264a2 2 0 0 1 1.73 1.982V23.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <path
              d="M19.507 14.5a4.248 4.248 0 0 1 -4 0 15.831 15.831 0 0 1 1 6.808V23.5h2v-2.192a15.831 15.831 0 0 1 1 -6.808"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <path
              d="M17.507 8a2.467 2.467 0 0 0 -1.145 0.281 1 1 0 0 1 -0.681 0.089L1.5 5.172l0 3.075 13.181 2.971a1 1 0 0 1 0.656 0.492A2.5 2.5 0 1 0 17.507 8"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
          </svg>
        ),

        description:
          "Say goodbye to scattered tools and hello to a chiropractic software that helps you manage your business right from intake to payments, all in one place.",
      },
      {
        name: "Orthodontics",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 128 128"
            className="fa-ortho"
          >
            <path
              d="M109.05 44.85C108.53 30.48 97.45 19 83.85 19a23.913 23.913 0 0 0-13.64 4.28 10.778 10.778 0 0 1-12.28 0A23.913 23.913 0 0 0 44.29 19c-13.6 0-24.68 11.48-25.2 25.85-.01.35-.02.7-.02 1.05 0 .87.04 1.74.12 2.59a25.415 25.415 0 0 0 .56 3.63 27.192 27.192 0 0 0 8 14.09A18.248 18.248 0 0 1 33.9 80c-.01.34-.01.67-.01 1.01 0 11.18 4.79 21.1 12.19 27.3a3.583 3.583 0 0 0 5.86-2.82c0-.47-.01-.94-.01-1.42 0-18.39 5.44-33.31 12.14-33.31s12.14 14.92 12.14 33.31c0 .48-.01.95-.01 1.42a3.583 3.583 0 0 0 5.86 2.82c7.4-6.2 12.19-16.12 12.19-27.3 0-.34 0-.67-.01-1.01a18.213 18.213 0 0 1 6.15-13.79 27.192 27.192 0 0 0 8-14.09 25.775 25.775 0 0 0 .56-3.64q.12-1.275.12-2.58c0-.35-.01-.7-.02-1.05zM51.89 55.08a3.519 3.519 0 0 1-3.52 3.52h-4.74a3.519 3.519 0 0 1-3.52-3.52V41.89a3.51 3.51 0 0 1 3.52-3.51h4.74a3.51 3.51 0 0 1 3.52 3.51zm36 0a3.519 3.519 0 0 1-3.52 3.52h-4.74a3.519 3.519 0 0 1-3.52-3.52V41.89a3.51 3.51 0 0 1 3.52-3.51h4.74a3.51 3.51 0 0 1 3.52 3.51z"
              fill="currentColor"
            />
            <g fill="black">
              <path d="M48.37 38.38h-4.74a3.51 3.51 0 0 0-3.52 3.51v13.19a3.519 3.519 0 0 0 3.52 3.52h4.74a3.519 3.519 0 0 0 3.52-3.52V41.89a3.51 3.51 0 0 0-3.52-3.51zM84.37 38.38h-4.74a3.51 3.51 0 0 0-3.52 3.51v13.19a3.519 3.519 0 0 0 3.52 3.52h4.74a3.519 3.519 0 0 0 3.52-3.52V41.89a3.51 3.51 0 0 0-3.52-3.51z" />
            </g>
          </svg>
        ),

        description:
          "Straighten out the chaos with our orthodontic software built for growth-driven orthodontic practices. With patient texting, digital intake, reviews, and online scheduling to make managing your practice painless.",
      },
    ],
    []
  );

  const [selectedIndustry, setSelectedIndustry] = useState<string>("Dental");

  const activeIndustry = industries.find((i) => i.name === selectedIndustry);

  // 🔄 Auto-rotate every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndustry((prev) => {
        const currentIndex = industries.findIndex((i) => i.name === prev);
        const nextIndex = (currentIndex + 1) % industries.length;
        return industries[nextIndex].name;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [industries]);

  return (
    <section className="industries">
      <div className="container">
        <h2 className="section-title">
          Too many patients? That&apos;s our kind of problem
        </h2>
        <p className="section-subtitle">
          Whether it&apos;s dental, optometry, chiropractors or orthodontics,
          Adit has the tools you need to be the best in your field.
        </p>

        <div className="industries-content">
          {/* Industry Grid */}
          <div className="industry-grid">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className={`industry-card ${
                  selectedIndustry === industry.name ? "active" : ""
                }`}
                onClick={() => setSelectedIndustry(industry.name)}
              >
                {industry.icon}
                <h3>{industry.name}</h3>
              </div>
            ))}
          </div>

          {/* Industry Description with Image */}
          <div className="industry-image">
            <Image
              src=`${process.env.STRAPI_API_FOR_IMAGES}/uploads/dental_industry_tabimg_e04fa2ed84.png`
              alt={activeIndustry?.name || "Default Alt Text"}
              width={200}
              height={200}
              loading="lazy"
            />
            <p className="industry-description">
              {activeIndustry?.description}
            </p>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
}
