"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/imageResolver";

export interface CaseStudyCardProps {
  image?: {
    src?: string;
    alt?: string;
  };
  category?: string;
  title?: string;
  description?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  link?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  image,
  category,
  title,
  description,
  stats = [],
  link,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-md">
      {/* Image */}
      <Link href={`${link}`}>
        <div className="relative">
          {image?.src ? (
            <Image
              src={resolveImageUrl(image.src)}
              alt={image.alt || title || "Case Study"}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
              loading="lazy"
              unoptimized
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}

          {category && (
            <span className="absolute top-4 left-4 bg-white text-blue-900 font-semibold text-sm px-3 py-1 rounded-full shadow-md">
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {title && (
            <h3 className="text-lg font-semibold text-blue-900 mb-2 leading-snug">
              {title}
            </h3>
          )}

          {description && (
            <p className="text-gray-700 text-sm line-clamp-2 mb-4">
              {description}
            </p>
          )}

          {/* Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-blue-50 rounded-xl p-3"
                >
                  <span className="text-blue-900 font-bold text-xl">
                    {stat.value}
                  </span>
                  <p className="text-gray-600 text-xs text-center">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          {link && (
            <button className="block text-center bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-full transition-all w-full">
              Read More
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CaseStudyCard;
