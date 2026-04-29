"use client";

import React from "react";
import { resolveImageUrl } from "@/lib/imageResolver";
import Link from "next/link";

export interface ImageField {
  src?: string;
  alt?: string;
}

export interface StatItem {
  value?: string;
  label?: string;
}

export interface CaseStudyHeroBlockProps {
  heading?: string;
  description?: string;
  buttonPrimaryText?: string;
  buttonPrimaryLink?: string;
  buttonSecondaryText?: string;
  buttonSecondaryLink?: string;
  mainImage?: ImageField;
  subImage?: ImageField;
  testimonial?: string;
  author?: string;
  stats?: StatItem[];
  statsBackground?: string;
  borderColor?: string;
  statsRowTopPostionValue?: string;

}

export default function CaseStudyHeroBlock({
  heading,
  description,
  buttonPrimaryText,
  buttonSecondaryText,
  mainImage,
  subImage,
  buttonPrimaryLink,
  buttonSecondaryLink,
  testimonial,
  author,
  stats = [],
  statsBackground = "#2f9cc3",
  borderColor = "#4bb6d6",
  statsRowTopPostionValue = "-73px",
}: Readonly<CaseStudyHeroBlockProps>) {
  return (
    <section className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 pt-10 ">
        {/* LEFT CONTENT */}
        <div className="order-1">
          <h1 className="text-3xl md:text-4xl font-bold text-[#16313d] leading-tight mb-6">
            {heading}
          </h1>

          {description && (
            <div
              className="text-gray-600 leading-relaxed mb-8 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {buttonPrimaryText && (
              <Link
                href={buttonPrimaryLink || "#"}
                className="bg-[#f5831f] text-white px-6 py-3 rounded-full font-medium text-center"
              >
                {buttonPrimaryText}
              </Link>
            )}

            {buttonSecondaryText && (
              <Link
                href={buttonSecondaryLink || "#"}
                className="border border-orange-400 text-orange-500 px-6 py-3 rounded-full font-medium text-center"
              >
                {buttonSecondaryText}
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div
          className="relative rounded-3xl border-2 overflow-hidden bg-white order-2"
          style={{ borderColor }}
        >
          <div className="p-6 relative">
            {mainImage?.src && (
              <img
                src={resolveImageUrl(mainImage.src)}
                alt={mainImage.alt || ""}
                className="w-full h-auto rounded-2xl"
              />
            )}

            {/* PRACTICE STRIP */}
            <div className="absolute -bottom-4 left-6 right-6 z-10">
               {subImage?.src && (
              <img
                src={resolveImageUrl(subImage.src)}
                alt={subImage.alt || ""}
                className="w-full h-auto rounded-2xl"
              />
            )}
            </div>
          </div>

          {/* TESTIMONIAL */}
          <div className="p-6 md:p-8 relative">
            <div className="text-4xl text-[#a8d6e6] absolute left-4 top-2">
              “
            </div>

            <p className="text-gray-600 italic text-sm md:text-base leading-relaxed">
              {testimonial}
            </p>

            <div className="mt-4 font-semibold text-[#16313d]">{author}</div>

            <div className="text-4xl text-[#a8d6e6] absolute right-4 bottom-2">
              ”
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div
        className={`w-full py-6 text-white lg:relative sm:initial  z-[-10]`}
        style={{
          background: statsBackground,
          top: statsRowTopPostionValue,
        }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 text-center gap-10 px-6">
          <div className="flex gap-10 items-center justify-center">
            {stats?.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="flex flex-col items-center justify-center py-6"
              >
                {/* Value */}
                <div className="text-5xl font-bold">{stat.value}</div>

                {/* Divider */}
                <div
                  className="w-24 h-[2px] "
                  style={{ background: borderColor || "#ffffff70" }}
                />

                {/* Label */}
                <div className="text-lg opacity-90 leading-snug max-w-[180px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
