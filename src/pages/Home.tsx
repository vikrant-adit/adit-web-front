"use client";
import Layout from "@/components/layout/Layout";
import FinalCtaSection from "@/components/common/FinalCtaSection";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import CompleteSuiteSection from "@/components/home/CompleteSuiteSection";
import CaseStudyHighlight from "@/components/common/CaseStudyHighlight/CaseStudyHighlighted";
import { useEffect, useRef, useState } from "react";
import AiCallComponent from "@/components/home/AiCallComponent";
import { buildImageUrl } from "../lib/defaults";
const AUTO_SLIDE_INTERVAL = 4000;

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const list = [
    {
      title:
        "Goodbye Lighthouse360, Hello $1.6M: How Adit became Dedicated Dentistry’s growth engine",
      highlightedName: "Dedicated Dentistry’s",
      highlightedStat: "40%",
      description:
        "Replacing Weave with Adit’s communication suite including VoIP phones and call tracking, texting, patient card, appointment reminders, digital forms and a seamless Eaglesoft integration helped W. Stuart Dexter, DDS grow.",
      readMoreLink: "/case-studies/w-stuart-dexter",
      stats: [
        { value: "25", unit: "%", label: "Increase in confirmations" },
        { value: "20", unit: "%", label: "Growth in appointments" },
        {
          value: "1.6",
          unitSecondary: "$",
          unit: "M",
          label: "Annual production (record-high)",
        },
      ],
      imageUrl: buildImageUrl(
        "dedicated_dentistry_casestudy_slider_thumbnail_6baa2a8e04.webp",
      ),
      buttonText: "Download Case Study",
      buttonLink:
        "https://adit.com/storage/files/dedicated-dentistry-case-study-adit.pdf",
    },
    // Duplicate 3 more slides for demo
    // You can replace with real data later
    {
      title:
        "Lynnwood Dental Studio  generated $227K in production with online scheduling and cut no-shows by 40%",
      highlightedName: "Lynnwood Dental Studio",
      highlightedStat: "40%",
      description:
        "Replacing Weave with Adit’s communication suite including VoIP phones and call tracking, texting, patient card, appointment reminders, digital forms and a seamless Eaglesoft integration helped W. Stuart Dexter, DDS grow.",
      readMoreLink: "/case-studies/w-stuart-dexter",
      stats: [
        { value: "150", unit: "%", label: "New patients booked online" },
        { value: "40", unit: "%", label: "Drop in no-shadows" },
        {
          value: "277",
          unitSecondary: "$",
          unit: "K",
          label: "New patient boost",
        },
      ],
      imageUrl: buildImageUrl(
        "lynnwood_dental_studio_casestudy_slider_thumbnail_016dbec5b5.webp",
      ),
      buttonText: "Download Case Study",
      buttonLink:
        "https://adit.com/storage/files/lynnwood-dental-studio-case-study-adit.pdf",
    },
    {
      title: "Petaluma Dental Group replaced 10 software vendors with Adit",
      highlightedName: "Petaluma Dental Group",
      highlightedStat: "40%",
      description:
        "Replacing Weave with Adit’s communication suite including VoIP phones and call tracking, texting, patient card, appointment reminders, digital forms and a seamless Eaglesoft integration helped W. Stuart Dexter, DDS grow.",
      readMoreLink: "/case-studies/w-stuart-dexter",
      stats: [
        { value: "6", unit: "hours", label: "Saved weekly" },
        { value: "65", unit: "%", label: "Increase in online reviews" },
        {
          value: "1200",
          unitSecondary: "$",
          unit: "+",
          label: "Saved monthly budget",
        },
      ],
      imageUrl: buildImageUrl(
        "petaluma_dental_group_casestudy_slider_thumbnail_50171ba397.webp",
      ),
      buttonText: "Download Case Study",
      buttonLink:
        "https://adit.com/storage/files/lynnwood-dental-studio-case-study-adit.pdf",
    },
    {
      title:
        "Socialite Vision boosts revenue by 20% and grows new patients by 40% with Adit",
      highlightedName: "Socialite Vision",
      highlightedStat: "40%",
      description:
        "Replacing Weave with Adit’s communication suite including VoIP phones and call tracking, texting, patient card, appointment reminders, digital forms and a seamless Eaglesoft integration helped W. Stuart Dexter, DDS grow.",
      readMoreLink: "/case-studies/w-stuart-dexter",
      stats: [
        { value: "4", unit: "hours", label: "Saved weekly" },
        { value: "20", unit: "%", label: "Revenue growth" },
        {
          value: "40",
          // unitSecondary: "$",
          unit: "%",
          label: "More new patients",
        },
      ],
      imageUrl: buildImageUrl(
        "socialite_vision_casestudy_slider_thumbnail_35cf4910de.webp",
      ),
      buttonText: "Download Case Study",
      buttonLink:
        "https://adit.com/storage/files/dedicated-dentistry-case-study-adit.pdf",
    },
  ];

  // Update active dot based on scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const idx = Math.round(
      scrollRef.current.scrollLeft / scrollRef.current.offsetWidth,
    );
    setActive(idx);
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const next = (active + 1) % list.length;
      scrollRef.current.scrollTo({
        left: next * scrollRef.current.offsetWidth,
        behavior: "smooth",
      });

      setActive(next);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [active, list.length]);

  return (
    <Layout>
      <Hero />
      <Testimonials />
      <CompleteSuiteSection />

      <AiCallComponent />
      {/* <CaseStudiesSection /> */}
      {/* Horizontal Slider */}
      <div className="text-center mt-8 bg-white">
        <h2 className="text-5xl font-semibold text-[#0a2240] mb-2">
          Real practices, real results
        </h2>
        <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
          See how Adit is transforming practices with unified practice
          management software systems. From reducing no-shows to improving
          patient satisfaction, our doctors share the real-world impact of
          streamlined, connected communication.
        </p>
      </div>
      <div
        className="homeCaseStudyScroll bg-white"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {list.map((item) => (
          <div className="caseSlide" key={item.title}>
            <CaseStudyHighlight {...item} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="dotsContainer">
        {list.map((item, i) => (
          <button
            key={item.title}
            className={`dot ${active === i ? "active" : ""}`}
            onClick={() => {
              if (!scrollRef.current) return;
              scrollRef.current.scrollTo({
                left: i * scrollRef.current.offsetWidth,
                behavior: "smooth",
              });
              setActive(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="bg-white mt-8">
        <FinalCtaSection
          title="Ready to simplify and grow your practice?"
          description="Adit gives you all the tools you need to streamline operations, reduce costs, and keep patients engaged, all in one easy-to-use, affordable platform. Spend less time on busy work and more time delivering great patient care."
          buttonText="Book a Demo"
          buttonLink="/schedule-a-demo"
        />
      </div>
    </Layout>
  );
};

export default Home;
