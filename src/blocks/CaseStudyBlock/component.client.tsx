'use client';
import React from "react";
import Counter from "../../components/common/CounterAnimation";
import Image from "next/image";
import { resolveImageUrl } from "../../lib/imageResolver";
import { useEditorGlow } from '@/hooks/useEditorGlow';

interface StatItem {
  value?: string;
  unitSecondary?: string;
  unit?: string;
  label?: string;
}

export interface CaseStudyBlockProps {
  title?: string;
  highlightedName?: string;
  highlightedStat?: string;
  description?: string;
  readMoreLink?: string;
  stats?: StatItem[];
  imageUrl?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: string;
  isGlobal?: boolean;
  globalKey?: string;
}

const CaseStudyBlock: React.FC<CaseStudyBlockProps> = ({
  title = "",
  highlightedName,
  highlightedStat,
  description = "",
  readMoreLink = "#",
  stats = [],
  imageUrl = "",
  imageAlt = "Case Study",
  buttonText = "Download Case Study",
  buttonLink = "#",
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  return (
    <section className={shouldGlow ? 'editor-global-glow' : "" + "bg-[#ffffff] py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-5 md:px-8 lg:px-10 font-[Inter]"}>
      <div className="flex flex-col md:flex-row items-center max-w-[95%] md:max-w-[90%] mx-auto gap-6 md:gap-8 lg:gap-10">
        {/* Left Section */}
        <div className="flex-1 min-w-[280px] text-left w-full md:w-auto">
          {/* Dynamic Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] leading-snug mb-3 md:mb-4">
            {(highlightedName
              ? title.split(highlightedName)
              : [title]
            ).map((part, index, arr) => (
              <React.Fragment key={index}>
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
          <p className="text-[#444] text-base sm:text-lg md:text-xl lg:text-[1.2rem] mb-4 md:mb-6">
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
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-5 mb-4 md:mb-6">
            {Array.isArray(stats) &&
              stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] bg-[#D8F2FF] border border-[#d6e9f5] rounded-lg md:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-center"
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
        <div className="flex flex-col flex-1 min-w-[280px] w-full md:w-auto items-center justify-center gap-3 md:gap-5">
          {/* Dynamic Image */}
          {imageUrl && (
            <div className="rounded-2xl overflow-hidden max-w-[500px] w-full">
              <Image
                src={resolveImageUrl(imageUrl)}
                alt={imageAlt || 'Image'}
                width={420}
                height={420}
                className="w-full block"
                loading="lazy"
                unoptimized
              />
            </div>
          )}

          {/* Dynamic Button */}
          <a href={buttonLink}>
            <button className="btn-primary bg-[#25a8e0] text-white px-5 sm:px-6 md:px-7 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-md hover:scale-105 transition-transform duration-200">
              {buttonText}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyBlock;
