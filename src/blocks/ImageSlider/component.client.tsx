/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/imageResolver";

export type SliderItem = {
  src?: any; // media object from Strapi
  alt?: string;
  title?: string;
  description?: string;
};

export type ImageSliderBlockProps = {
  slides?: SliderItem[];
  backgroundFrom?: string;
  backgroundTo?: string;
  titleSize?: string;
  descriptionSize?: string;
};

export default function ImageSliderBlock({
  slides = [],
  backgroundFrom = "from-slate-800",
  backgroundTo = "to-teal-900",
  titleSize = "text-xl md:text-2xl",
  descriptionSize = "text-base md:text-lg",
}: ImageSliderBlockProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getImageUrl = (media: any): string | undefined => {
    if (!media) return undefined;

    if (typeof media === "string") return media;

    if (media.url) return media.url;

    if (media.attributes?.url) return media.attributes.url;

    if (media.data?.attributes?.url) return media.data.attributes.url;

    return undefined;
  };

  if (!slides.length) {
    return <div className="text-center py-10 opacity-60">No slides added</div>;
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slide = slides[currentSlide];
  const imageUrl = getImageUrl(slide?.src);

  console.log("Rendering slide:", slide);

  return (
    <div
      className={`max-w-6xl mx-auto w-full bg-gradient-to-br ${backgroundFrom} ${backgroundTo} rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 relative shadow-2xl`}
    >
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-400 text-cyan-400 bg-slate-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-cyan-400/20 transition-all duration-300"
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-400 text-cyan-400 bg-slate-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-cyan-400/20 transition-all duration-300"
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="relative px-8 sm:px-12">
        {/* Image */}
        {imageUrl && (
          <div className="relative mx-auto mb-6 sm:mb-8 max-w-3xl">
            <Image
              src={resolveImageUrl(imageUrl)}
              alt={slide?.alt || "Image"}
              width={800}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>
        )}

        {/* Text */}
        <div className="text-center text-white space-y-3 sm:space-y-4 px-2">
          {slide?.title && (
            <p className={`${titleSize} leading-relaxed max-w-4xl mx-auto`}>
              {slide.title}
            </p>
          )}

          {slide?.description && (
            <p
              className={`${descriptionSize} leading-relaxed max-w-4xl mx-auto opacity-90`}
            >
              {slide.description}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="flex-1 max-w-xs h-0.5 bg-cyan-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-300 rounded-full"
              style={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-cyan-400 font-medium text-base sm:text-lg">
            {currentSlide + 1}/{slides.length}
          </span>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-cyan-400 w-8"
                  : "bg-cyan-800 w-2 hover:bg-cyan-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
