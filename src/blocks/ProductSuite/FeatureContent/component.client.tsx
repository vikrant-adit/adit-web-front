'use client';

import React from 'react';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { buildImageUrl } from '@/lib/defaults';

export type FeatureSplitProps = {
  title?: string;
  titleSize?: string;
  titleColor?: string;
  titleAlign?: 'left' | 'center' | 'right';

  description?: string;
  descriptionSize?: string;
  descriptionColor?: string;
  descriptionAlign?: 'left' | 'center' | 'right';

  buttonText?: string;
  buttonUrl?: string;

  image?: { src?: string; alt?: string };
  imagePosition?: 'left' | 'right';

  layout?: 'grid' | 'flex';
  flexDirection?: 'row' | 'column';
  gap?: number;

  imagePreset?: 'small' | 'medium' | 'large' | 'contain' | 'cover' | 'custom';
  customWidth?: string;

  padding?: string;
  className?: string;

  backgroundClass?: string;
  backgroundStyle?: string;

  position?: 'relative' | 'absolute' | 'fixed';
  zIndex?: number;
};

const DEFAULT_BG =
  'transparent';

// ----------------------
// Helpers
// ----------------------

const getAlignClass = (align: 'left' | 'center' | 'right' = 'left') => {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
};

const getButtonAlignment = (align: 'left' | 'center' | 'right' = 'left') => {
  if (align === 'center') return 'justify-center';
  if (align === 'right') return 'justify-end';
  return 'justify-start';
};

const getImageStyles = (
  preset: FeatureSplitProps['imagePreset'],
  customWidth?: string
) => {
  switch (preset) {
    case 'small':
      return { className: 'max-w-[320px]' };
    case 'medium':
      return { className: 'max-w-[520px]' };
    case 'large':
      return { className: 'max-w-[820px]' };
    case 'contain':
      return { style: { objectFit: 'contain' as const } };
    case 'cover':
      return { style: { objectFit: 'cover' as const } };
    case 'custom':
      return customWidth
        ? { style: { maxWidth: customWidth } }
        : { className: 'max-w-[520px]' };
    default:
      return { className: 'max-w-[680px]' };
  }
};

const getLayoutClass = (
  layout: 'grid' | 'flex',
  flexDirection: 'row' | 'column'
) => {
  if (layout === 'flex') {
    return flexDirection === 'column'
      ? 'flex flex-col'
      : 'flex flex-col sm:flex-row';
  }

  return 'grid grid-cols-1 md:grid-cols-2 items-center';
};

// ----------------------
// Component
// ----------------------

export default function FeatureSplit({
  title = "Keep your team aligned with Adit’s task management software",
  titleSize = 'text-4xl md:text-6xl',
  titleColor = 'text-slate-900',
  titleAlign = 'left',

  description = `<p>Manage your entire workflow directly in Adit.</p>
<p>From daily to-dos to recurring workflows, Adit tasks ensures your team stays productive.</p>`,
  descriptionSize = 'text-base md:text-lg',
  descriptionColor = 'text-slate-700',
  descriptionAlign = 'left',

  buttonText = 'Schedule a Demo',
  buttonUrl = '#',

  image,
  imagePosition = 'right',

  layout = 'grid',
  flexDirection = 'row',
  gap = 48,

  imagePreset = 'medium',
  customWidth = '520px',

  padding = 'py-12 sm:py-16 md:py-20 px-3 sm:px-6 md:px-8',
  className = '',

  backgroundClass = DEFAULT_BG,
  backgroundStyle,

  position = 'relative',
  zIndex = 10,
}: Readonly<FeatureSplitProps>) {
  const safeDescription = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
  });

  // ✅ FIXED: using correct helper
  const resolvedImage = image?.src
    ? buildImageUrl(image.src)
    : null;
  console.log('resolvedImage', resolvedImage);
  const imageStyles = getImageStyles(imagePreset, customWidth);

  const layoutClass = getLayoutClass(layout, flexDirection);
  const alignClass = getAlignClass(titleAlign);
  const buttonAlign = getButtonAlignment(titleAlign);

  const sectionStyle: React.CSSProperties = {
    ...(backgroundStyle ? { background: backgroundStyle } : {}),
    ...(zIndex ? { zIndex } : {}),
  };

  // ----------------------
  // Content
  // ----------------------

  const Content = (
    <div className={`w-full max-w-xl mx-auto ${alignClass}`}>
      {title && (
        <h2
          className={[
            'font-extrabold leading-[1.05]',
            alignClass,
            titleSize,
            titleColor,
          ].join(' ')}
        >
          {title}
        </h2>
      )}

      {description && (
        <div
          className={[
            'mt-4 sm:mt-6 md:mt-8 leading-relaxed space-y-3 sm:space-y-4',
            getAlignClass(descriptionAlign),
            descriptionSize,
            descriptionColor,
          ].join(' ')}
          dangerouslySetInnerHTML={{ __html: safeDescription }}
        />
      )}

      {buttonText && (
        <div className={`mt-6 sm:mt-8 md:mt-10 flex ${buttonAlign}`}>
          <a
            href={buttonUrl}
            className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 md:px-7 py-2 sm:py-3 text-sm sm:text-base transition"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        </div>
      )}
    </div>
  );

  // ----------------------
  // Media
  // ----------------------

  const Media = (
    <div className="flex justify-center w-full">
      {resolvedImage ? (
        <div
          className={`${imageStyles.className || ''} w-full sm:w-auto overflow-hidden`}
          style={imageStyles.style}
        >
          <Image
            src={resolvedImage}
            alt={image?.alt ?? 'Feature image'}
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            unoptimized
          />
        </div>
      ) : (
        <div
          className={`${imageStyles.className || ''} h-[260px] bg-white flex items-center justify-center text-slate-400`}
          style={imageStyles.style}
        >
          No image selected
        </div>
      )}
    </div>
  );

  // ----------------------
  // Render
  // ----------------------

  return (
    <section
      className={`${backgroundClass} ${padding} ${className} ${position}`}
      style={sectionStyle}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={layoutClass}
          style={{ gap: `clamp(1.5rem, 5vw, ${gap}px)` }}
        >
          {imagePosition === 'left' ? (
            <>
              {Media}
              {Content}
            </>
          ) : (
            <>
              {Content}
              {Media}
            </>
          )}
        </div>
      </div>
    </section>
  );
}