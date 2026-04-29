'use client';
import React from "react";
import Counter from "../CounterAnimation";
import Image from "next/image";
import {resolveImageUrl} from "../../../lib/imageResolver";
import { useEditorGlow } from '@/hooks/useEditorGlow';

interface StatItem {
  value: string;
  unitSecondary?: string;
  unit?: string;
  label: string;
}

export interface CaseStudyHighlightProps {
  title: string; // e.g. "See how W. Stuart Dexter, DDS boosted patient retention by 40%"
  highlightedName?: string; // optional if you want to highlight a part of title
  highlightedStat?: string;
  description: string;
  readMoreLink?: string;
  stats: StatItem[];
  imageUrl: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: string;
   isGlobal?: boolean;
  globalKey?: string;
}

const CaseStudyHighlight: React.FC<CaseStudyHighlightProps> = ({
  title = "",
  highlightedName,
  highlightedStat,
  description = "",
  readMoreLink = "#",
  stats = [], // ✅ IMPORTANT
  imageUrl = "",
  imageAlt = "Case Study",
  buttonText = "Download Case Study",
  buttonLink = "#",
  isGlobal
}) => {
const { shouldGlow } = useEditorGlow(isGlobal);

  return (
    <section className={shouldGlow ? 'editor-global-glow' : '' + "bg-[#ffffff] py-16 px-5 font-[Inter]"}>
      <div className="flex flex-col lg:flex-row items-center max-w-[100%] lg:max-w-[90%] mx-auto gap-10 lg:gap-10">
        {/* Left Section */}
        <div className="w-full lg:flex-1 lg:min-w-[320px] text-left">
          {/* Dynamic Title */}
        <h2 className="text-[1.5rem] sm:text-[1.8rem] lg:text-[2.2rem] leading-snug mb-4">
 {(highlightedName ? title.split(highlightedName) : [title]).map((part, index, arr) => (
 <React.Fragment key={`${part}-${index}`}>
    {part}
    {highlightedName && index < arr.length - 1 && (
      <span className="text-[#0a4a6d] font-extrabold">
        {highlightedName}
      </span>
    )}
  </React.Fragment>
))}
  {highlightedStat && (
    <>
      {" "}
      <span className="text-[#0a4a6d]">{highlightedStat}</span>
    </>
  )}
</h2>


          {/* Dynamic Description */}
          <p className="text-[#444] text-[0.95rem] sm:text-[1rem] lg:text-[1.2rem] mb-6">
            {description}{" "}
            {readMoreLink && (
              <a
                href={readMoreLink}
                className="text-[#0eb7ff] no-underline font-medium hover:underline"
              >
                Read the full story
              </a>
            )}
          </p>

          {/* Dynamic Stats Row */}
         <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5 mb-6 w-full">
  {Array.isArray(stats) &&
  stats.map((stat) => (
    <div
      key={stat.value}
      className="w-full sm:flex-1 sm:min-w-[120px] bg-[#D8F2FF] border border-[#d6e9f5] rounded-xl px-4 sm:px-6 py-3 text-center"
    >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a4a6d] border-b-2 border-[#316ac0b9] pb-1">
          {stat.unitSecondary}
          <Counter value={Number(stat.value || 0)} duration={500} />
          {stat.unit && (
            <span className="text-sm sm:text-base md:text-xl font-medium ml-1">
              {stat.unit}
            </span>
          )}
        </h3>
        <p className="text-sm sm:text-base text-[#555] mt-1">
          {stat.label}
        </p>
      </div>
    ))}
</div>

        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full lg:flex-1 lg:min-w-[320px] items-center justify-center gap-5">
          {/* Dynamic Image */}
          <div className="rounded-2xl overflow-hidden max-w-[500px] w-full">
            <Image
              src={resolveImageUrl(imageUrl)}
              alt={imageAlt|| 'Image'}
              width={420}
              height={420}
              className="w-full block"
              loading="lazy"
              unoptimized
            />
          </div>

          {/* Dynamic Button */}
          <a href={buttonLink}>
            <button className="btn-primary bg-[#25a8e0] text-white px-7 py-3 rounded-full text-base font-semibold shadow-md hover:scale-105 transition-transform duration-200">
              {buttonText}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHighlight;
