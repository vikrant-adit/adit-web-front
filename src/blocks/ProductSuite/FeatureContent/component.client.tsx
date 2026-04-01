/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import DOMPurify from 'dompurify';

export type FeatureSplitProps = {
  title?: string;

  // dynamic styles
  titleSize?: string;
  titleColor?: string;
  titleAlign?: 'left' | 'center' | 'right'; // ✅ NEW

  description?: string;
  descriptionSize?: string;
  descriptionColor?: string;
  descriptionAlign?: 'left' | 'center' | 'right'; // ✅ NEW

  buttonText?: string;
  buttonUrl?: string;

  image?: { src?: string; alt?: string };
  imagePosition?: 'left' | 'right';

  // layout
  layout?: 'grid' | 'flex';
  flexDirection?: 'row' | 'column';
  gap?: number;
  imagePreset?: 'small' | 'medium' | 'large' | 'contain' | 'cover' | 'custom';
  customWidth?: string;
  padding?: string;
  className?: string;

  background?: string;
  position?: 'relative' | 'absolute' | 'fixed';
  zIndex?: number;
};

const DEFAULT_BG =
  'bg-[radial-gradient(109.01%_109.01%_at_46.76%_154.25%,_#25A8E0_0%,_rgba(255,255,255,0)_100%)]';

function isTailwindClass(v?: string) {
  if (!v) return false;
  return (
    v.startsWith('bg-') ||
    v.startsWith('text-') ||
    v.startsWith('from-') ||
    v.startsWith('to-') ||
    v.startsWith('via-') ||
    v.includes('gradient')
  );
}

function getTextStyle(value?: string) {
  if (!value) return { className: '', style: undefined as React.CSSProperties | undefined };

  const trimmed = value.trim();

  if (trimmed.startsWith('text-') || trimmed.startsWith('leading-') || trimmed.startsWith('font-')) {
    return { className: trimmed, style: undefined };
  }

  if (trimmed.includes('px') || trimmed.includes('rem') || trimmed.includes('em')) {
    return { className: '', style: { fontSize: trimmed } };
  }

  if (trimmed.startsWith('#') || trimmed.startsWith('rgb')) {
    return { className: '', style: { color: trimmed } };
  }

  return { className: trimmed, style: undefined };
}

// ✅ NEW helper
function getAlignClass(align?: 'left' | 'center' | 'right') {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
}

function getImageWidth(
  preset?: string,
  customWidth?: string
): { className?: string; style?: React.CSSProperties } {
  switch (preset) {
    case 'small':
      return { className: 'max-w-[320px]' };
    case 'medium':
      return { className: 'max-w-[520px]' };
    case 'large':
      return { className: 'max-w-[820px]' };
    case 'contain':
      return { style: { objectFit: 'contain' } };
    case 'cover':
      return { style: { objectFit: 'cover' } };
    case 'custom':
      return customWidth ? { style: { maxWidth: customWidth } } : { className: 'max-w-[520px]' };
    default:
      return { className: 'max-w-[680px]' };
  }
}

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

  background = DEFAULT_BG,
  position = 'relative',
  zIndex = 10,
}: FeatureSplitProps) {
  const safeDescription = DOMPurify.sanitize(description, { USE_PROFILES: { html: true } });

  const bgClass = isTailwindClass(background) ? background : '';
  const bgStyle: React.CSSProperties | undefined = isTailwindClass(background)
    ? undefined
    : { background };

  const titleSizeStyle = getTextStyle(titleSize);
  const titleColorStyle = getTextStyle(titleColor);

  const descSizeStyle = getTextStyle(descriptionSize);
  const descColorStyle = getTextStyle(descriptionColor);

  const resolvedImageSrc = image?.src
    ? image.src.startsWith('http')
      ? image.src
      : `${process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES}${image.src}`
    : null;

  const Content = (
    <div className={`w-full max-w-xl mx-auto ${getAlignClass(titleAlign)}`}>
      {title && (
        <h2
          className={[
            'font-extrabold leading-[1.05]',
            getAlignClass(titleAlign),
            titleSizeStyle.className,
            'text-xl md:text-4xl',
            titleColorStyle.className,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ ...(titleSizeStyle.style || {}), ...(titleColorStyle.style || {}) }}
        >
          {title}
        </h2>
      )}

      {description && (
        <div
          className={[
            'mt-4 sm:mt-6 md:mt-8 leading-relaxed space-y-3 sm:space-y-4',
            getAlignClass(descriptionAlign),
            descSizeStyle.className,
            descColorStyle.className,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ ...(descSizeStyle.style || {}), ...(descColorStyle.style || {}) }}
          dangerouslySetInnerHTML={{ __html: safeDescription }}
        />
      )}

      {buttonText && (
        <div
          className={`mt-6 sm:mt-8 md:mt-10 flex ${
            titleAlign === 'center'
              ? 'justify-center'
              : titleAlign === 'right'
              ? 'justify-end'
              : 'justify-start'
          }`}
        >
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

  const imageWidthStyle = getImageWidth(imagePreset, customWidth);

  const Media = (
    <div className="flex justify-center w-full">
      {resolvedImageSrc ? (
        <div
          className={`${imageWidthStyle.className || ''} overflow-hidden w-full sm:w-auto`}
          style={imageWidthStyle.style}
        >
          <img
            src={resolvedImageSrc}
            alt={image?.alt ?? 'Feature image'}
            className="w-full h-auto object-contain"
          />
        </div>
      ) : (
        <div
          className={`${imageWidthStyle.className || ''} h-[240px] sm:h-[280px] md:h-[320px] bg-white overflow-hidden flex items-center justify-center text-slate-400 w-full sm:w-auto`}
          style={imageWidthStyle.style}
        >
          No image selected
        </div>
      )}
    </div>
  );

  const layoutClass =
    layout === 'flex'
      ? `flex flex-col sm:flex-${flexDirection} ${
          flexDirection === 'column' ? 'flex-col' : 'sm:flex-row'
        }`
      : 'grid grid-cols-1 md:grid-cols-2 items-center';

  const sectionClass = position ? `${position}` : 'relative';
  const sectionStyle: React.CSSProperties = {
    ...(zIndex !== undefined && { zIndex }),
  };

  return (
    <section
      className={`${bgClass} ${padding} ${className} ${sectionClass}`}
      style={{ ...bgStyle, ...sectionStyle }}
    >
      <div className="max-w-7xl mx-auto w-full px-0">
        <div
          className={`${layoutClass} items-center`}
          style={{ gap: layout === 'flex' ? `clamp(1.5rem, 5vw, ${gap}px)` : undefined }}
        >
          <div className={imagePosition === 'left' ? 'md:order-last' : ''}>
            {Content}
          </div>
          <div className={imagePosition === 'left' ? 'md:order-first' : ''}>
            {Media}
          </div>
        </div>
      </div>
    </section>
  );
}

