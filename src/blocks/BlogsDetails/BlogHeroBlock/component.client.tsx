"use client";

import { resolveImageUrl } from "@/lib/imageResolver";

export interface BlogHeroBlockProps {
  title?: string;
  image?: {
    src?: string;
    alt?: string;
  };
}

export default function BlogHeroBlock({
  title,
  image,
}: BlogHeroBlockProps) {
  return (
    <section className="py-12 text-center">
      {image?.src && (
        <img
          src={resolveImageUrl(image.src)}
          alt={image.alt || ""}
          className="w-full max-h-[400px] object-cover rounded-xl mb-6"
        />
      )}

      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
    </section>
  );
}