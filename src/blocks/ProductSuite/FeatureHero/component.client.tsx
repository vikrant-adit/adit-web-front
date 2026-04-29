'use client';
import React from 'react';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { buildImageUrl, getStrapiImagesUrl } from '@/lib/defaults';

export type FeatureHeroImage = {
  src?: string;
  alt?: string;
};

export type FeatureHeroProps = {
  iconUrl?: FeatureHeroImage;
  title?: string;
  description?: string;
  image?: FeatureHeroImage;
  background?: string;
  position?: 'relative' | 'absolute' | 'fixed';
  className?: string;
  zIndex?: number;
};

const FeatureHero: React.FC<FeatureHeroProps> = ({
  iconUrl,
  title = 'All-In-One VOIP Phone System',
  description = 'Centralize patient communication with secure calling, texting & reminders.',
  image,
  background = '#06a6d6',
  position = 'relative',
  className = '',
  zIndex = 50,
}) => {
  const safeDescription = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
  });

  const isTailwindBg = typeof background === 'string' && background.startsWith('bg-');
  const wrapperStyle: React.CSSProperties = isTailwindBg ? { zIndex } : { background, zIndex };

  return (
    <section
      className={`${position} ${className}`}
      style={wrapperStyle}
      aria-label="Feature hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Content */}
          <div className="w-full">
            <div className="flex flex-col items-center text-center gap-3 pt-4">
              <div className="w-full flex items-center gap-3 justify-center">
                {iconUrl && (
                  <div className="inline-block">
                    <Image src={iconUrl.src ? buildImageUrl(iconUrl.src.replace(/^\//, '')) : getStrapiImagesUrl()} alt="icon" width={40} height={40} className="w-10 h-10 object-contain" unoptimized />
                  </div>
                )}

                {title && (
                  <h1 className="text-xl sm:text-3xl md:text-2xl lg:text-2xl font-extrabold text-white leading-tight mb-0 max-w-md">
                    {title}
                  </h1>
                )}
              </div>

              {description && (
                <div
                  className="mt-2 text-center sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: safeDescription }}
                />
              )}
            </div>
          </div>

          {/* Media */}
          <div className="w-full flex justify-center mt-4">
            {image?.src ? (
              <Image
                src={buildImageUrl(image.src.replace(/^\//, ''))}
                alt={image.alt || 'Feature image'}
                width={720}
                height={500}
                className="w-full max-w-[420px] sm:max-w-[640px] md:max-w-[720px] lg:max-w-[720px] object-contain rounded-md"
                unoptimized
              />
            ) : (
              <div className="w-full max-w-[720px] h-44 sm:h-56 md:h-64 rounded-lg bg-white/10 flex items-center justify-center text-white/60">
                No image selected
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHero;
