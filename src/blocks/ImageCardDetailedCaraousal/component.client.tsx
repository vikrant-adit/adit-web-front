"use client";
import React from "react";
import Image from "next/image";
import { useEditorGlow } from '@/hooks/useEditorGlow';
import { getStrapiImagesUrl } from '@/lib/defaults';

export type FeatureCard = {
  id?: string | number;
  title?: string;
  role?: string;
  description?: string;
  imageSrc?: string; 
  imageAlt?: string;
};

export type SupportFeaturesProps = {
  features?: FeatureCard[];
  className?: string;
  backgroundColor?: string;
    isGlobal?: boolean;
  globalKey?: string;
};

const DEFAULT_FEATURE_IMAGE =
  "/mnt/data/e9c595b2-f92a-482a-9033-7ee904963794.png";

const resolveSrc = (src?: string) => {
  if (!src) return "";
  if (typeof src !== "string") return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${getStrapiImagesUrl() || ""}${src}`;
};

const SupportFeatures: React.FC<SupportFeaturesProps> = ({
  features = [],
  className = "",
  backgroundColor = "transparent",
  isGlobal
}) => {
  // Safe check to ensure we have an array
  const { shouldGlow } = useEditorGlow(isGlobal);
  
  const safeFeatures = Array.isArray(features) ? features : [];

  // If the array is empty (no items added yet), show a fallback for preview
  const itemsToRender =
    safeFeatures.length > 0
      ? safeFeatures
      : [
          {
            id: "fallback-1",
            title: "Feature title",
            description: "Feature description text",
            imageSrc: DEFAULT_FEATURE_IMAGE,
            imageAlt: "placeholder",
            role: "Role",
          },
        ];

  return (
    <section
      className={`w-full py-12 ${className} ${shouldGlow ? 'editor-global-glow' : ''}`}
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto ">
        <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x orange-scrollbar">
          {itemsToRender.map((feature, index) => {
            // Fallback to defaults if specific fields are empty (handling the removal of defaultItemProps)
            const title = feature.title || "New Feature";
            const description = feature.description || "Add a description...";
            const src = resolveSrc(feature.imageSrc || DEFAULT_FEATURE_IMAGE);

            return (
              <div
                // Use index as fallback key only if id is missing
                key={feature.id || index}
                className="min-w-[85vw] md:min-w-[350px] flex-shrink-0 snap-center flex flex-col items-center text-center p-8 bg-white border border-sky-200 rounded-2xl transition-shadow hover:shadow-lg"
              >
                <div className="w-full h-48 mb-6 relative flex items-center justify-center">
                  {src ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={src}
                        alt={feature.imageAlt || title || 'Image'}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 bg-sky-50 rounded-full flex items-center justify-center text-sky-300">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <p className="text-[#35CB75] max-w-xs text-balance min-h-[1.5rem]">
                  {feature.role}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  {title}
                </h3>

                <p className="text-slate-600 leading-relaxed max-w-xs text-balance">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SupportFeatures;