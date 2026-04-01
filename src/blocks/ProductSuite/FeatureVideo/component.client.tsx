/* eslint-disable @typescript-eslint/no-explicit-any */
// File: FeatureVideo.component.client.tsx
'use client';
import React from 'react';
import DOMPurify from 'dompurify';

export type MediaVideo = { src?: string; poster?: string; alt?: string | undefined };

export type FeatureVideoProps = {
  title?: string;
  titleSize?: string;
  titleColor?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  video?: MediaVideo | string;
  videoPosition?: 'left' | 'right';
  layout?: 'grid' | 'flex';
  flexDirection?: 'row' | 'column';
  gap?: number;
  padding?: string;
  background?: string;
  position?: 'relative' | 'absolute' | 'fixed';
  className?: string;
  zIndex?: number;

  // video controls
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;

  // border options
  showBorder?: boolean;
  borderWidth?: number;
  borderColor?: string; // 'border-sky-200' or '#aabbcc'
  borderRadius?: string;

  // sizing
  mediaPreset?: 'small' | 'medium' | 'large' | 'cover' | 'contain' | 'custom';
  customMediaWidth?: string; // e.g. '400px' or '50%'
  customMediaHeight?: string; // e.g. '225px' for explicit height
  aspectRatio?: string; // e.g. '16/9', '4/3', '1/1' or '9/16'
};

const looksLikeEmbed = (src?: string) => {
  if (!src) return false;
  const s = src.trim();
  return (
    s.startsWith('<iframe') ||
    s.includes('player.vimeo.com') ||
    s.includes('youtube.com/embed') ||
    s.includes('youtube-nocookie.com') ||
    s.includes('youtube.com/watch') ||
    s.includes('vimeo.com/')
  );
};

const extractSrcFromIframeString = (iframeStr: string | undefined) => {
  if (!iframeStr) return undefined;
  const match = iframeStr.match(/src=['"]([^'"]+)['"]/i);
  return match ? match[1] : undefined;
};

const parseAspectRatio = (ratio?: string) => {
  if (!ratio) return undefined;
  const parts = ratio.split('/').map((p) => Number(p));
  if (parts.length === 2 && parts.every((n) => Number.isFinite(n) && n > 0)) {
    return (parts[1] / parts[0]) * 100; // padding-top percentage (height / width * 100)
  }
  return undefined;
};

const FeatureVideo: React.FC<FeatureVideoProps> = (props) => {
  const {
    title = '',
    titleSize = '',
    titleColor = '',
    description = '',
    buttonText = '',
    buttonUrl = '#',
    video,
    videoPosition = 'right',
    layout = 'grid',
    flexDirection = 'row',
    gap = 32,
    padding = 'py-16 px-6',
    background = '#ffffff',
    position = 'relative',
    className = '',
    zIndex = 10,
    controls = true,
    autoplay = false,
    loop = false,
    muted = false,
    showBorder = false,
    borderWidth = 4,
    borderColor = 'border-sky-200',
    borderRadius = 'rounded-full',
    mediaPreset = 'medium',
    customMediaWidth = '',
    customMediaHeight = '',
    aspectRatio = '',
  } = props;

  const safeDescription = DOMPurify.sanitize(description, { USE_PROFILES: { html: true } });

  const isTailwindBg = typeof background === 'string' && background.startsWith('bg-');
  const wrapperStyle: React.CSSProperties = isTailwindBg ? { zIndex } : { background, zIndex };

  // baseline style from presets (applies maxWidth unless custom width provided)
  const getPresetStyle = (): React.CSSProperties => {
    switch (mediaPreset) {
      case 'small':
        return { maxWidth: '320px' };
      case 'medium':
        return { maxWidth: '520px' };
      case 'large':
        return { maxWidth: '820px' };
      case 'contain':
        return { maxWidth: '100%', height: 'auto' };
      case 'cover':
        return { width: '100%', height: '320px', objectFit: 'cover' } as React.CSSProperties;
      case 'custom':
        return {};
      default:
        return {};
    }
  };

  const presetStyle = getPresetStyle();

  // aspect ratio handling
  const paddingTopPercent = parseAspectRatio(aspectRatio); // e.g. 56.25 for 16/9

  // title handling
  const isTailwindTextClass = typeof titleSize === 'string' && titleSize.trim().startsWith('text-');
  const isTailwindColorClass = typeof titleColor === 'string' && titleColor.trim().startsWith('text-');
  const titleInlineStyle: React.CSSProperties | undefined = (() => {
    const s: React.CSSProperties = {};
    if (!isTailwindTextClass && titleSize) s.fontSize = titleSize as any;
    if (!isTailwindColorClass && titleColor) s.color = titleColor as any;
    return Object.keys(s).length ? s : undefined;
  })();

  const titleClassName = [
    'font-extrabold',
    'leading-tight',
    'mb-6',
    'text-slate-900',
    isTailwindTextClass ? titleSize : 'text-[1.5rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[36px]',
    isTailwindColorClass ? titleColor : '',
  ]
    .filter(Boolean)
    .join(' ');

  // resolve video src/poster when video prop is string or object
  const rawVideoSrc =
    typeof video === 'string' ? video : typeof video === 'object' ? (video?.src as string | undefined) : undefined;
  const rawPoster = typeof video === 'object' ? video?.poster : undefined;

  // if video prop contains an iframe string, extract src
  const videoSrcFromIframeString = rawVideoSrc && rawVideoSrc.trim().startsWith('<iframe')
    ? extractSrcFromIframeString(rawVideoSrc)
    : undefined;

  const finalSrc = videoSrcFromIframeString || rawVideoSrc;
  const isEmbed = looksLikeEmbed(rawVideoSrc) || !!videoSrcFromIframeString;

  // border handling
  const isTailwindBorderClass = typeof borderColor === 'string' && borderColor.trim().startsWith('border-');
  const borderInlineStyle: React.CSSProperties | undefined =
    !isTailwindBorderClass && borderColor ? { borderColor: borderColor as any, borderStyle: 'solid' } : undefined;
  const borderClassPart = isTailwindBorderClass ? borderColor : '';

  // compute wrapper style that will hold iframe or video
  const videoWrapperBase: React.CSSProperties = {
    boxSizing: 'border-box',
    ...presetStyle,
  };

  // apply custom width/height if provided (take precedence over presets)
  if (customMediaWidth) {
    // when custom width is provided, set width (not maxWidth) so aspect ratio works predictably
    videoWrapperBase.width = customMediaWidth;
    // allow overriding height
    if (customMediaHeight) {
      videoWrapperBase.height = customMediaHeight;
    }
  } else {
    // when no custom width, use preset maxWidth (already included). If preset included height (cover), keep it.
  }

  // if aspectRatio provided and height not explicitly set, use padding-top trick and position children absolute
  const useAspectRatio = paddingTopPercent !== undefined && !customMediaHeight;

  // assemble wrapper style including border width and inline border color if required
  const videoWrapperStyle: React.CSSProperties = {
    ...(videoWrapperBase || {}),
    ...(showBorder ? { borderWidth: `${borderWidth}px` } : {}),
    ...(borderInlineStyle || {}),
  };

  // container classes/styles
  const containerClass =
    layout === 'grid' ? `grid ${className}` : `flex flex-col ${className} ${flexDirection === 'row' ? 'md:flex-row' : 'md:flex-col'} items-center justify-center md:justify-start`;

  const containerStyle: React.CSSProperties = layout === 'grid' ? { gap: `${gap}px`, gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' } : { gap: `${gap}px` };

  const mdBehavior = layout === 'grid' ? 'md:grid-cols-2' : flexDirection === 'row' ? 'md:flex-row' : 'md:flex-col';

  const content = (
    <div className="w-full md:max-w-xl text-center md:text-left">
      {title && (
        <h2 className={titleClassName} style={titleInlineStyle}>
          {title}
        </h2>
      )}
      {description && (
        <div
          className="text-sm sm:text-base md:text-lg text-slate-700 mb-6 md:mb-8"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: safeDescription }}
        />
      )}
      {buttonText && (
        <a href={buttonUrl} className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-full transition" rel="noopener noreferrer">
          {buttonText}
        </a>
      )}
    </div>
  );

  // media element: supports aspect-ratio container & both iframe/native <video>
  const mediaEl = (
    <div className="flex justify-center items-center w-full">
      <div className={`${borderRadius} overflow-hidden ${borderClassPart} w-full`} style={videoWrapperStyle}>
        {finalSrc ? (
          useAspectRatio ? (
            // Aspect-ratio container
            <div style={{ position: 'relative', width: '100%', paddingTop: `${paddingTopPercent}%` }}>
              {isEmbed ? (
                <iframe
                  src={finalSrc}
                  title={title || 'Embedded video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                />
              ) : (
                <video
                  src={finalSrc}
                  poster={rawPoster}
                  controls={controls}
                  autoPlay={autoplay}
                  loop={loop}
                  muted={muted}
                  playsInline
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          ) : (
            // Fixed width/height container (no padding trick)
            isEmbed ? (
              <iframe
                src={finalSrc}
                title={title || 'Embedded video'}
                width="100%"
                height={videoWrapperStyle.height ? `${videoWrapperStyle.height}` : '100%'}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer"
                style={{ display: 'block', width: '100%', height: videoWrapperStyle.height ? `${videoWrapperStyle.height}` : '100%', border: 0 }}
              />
            ) : (
              <video
                src={finalSrc}
                poster={rawPoster}
                controls={controls}
                autoPlay={autoplay}
                loop={loop}
                muted={muted}
                playsInline
                style={{ display: 'block', width: '100%', height: videoWrapperStyle.height ? `${videoWrapperStyle.height}` : '100%', objectFit: 'cover' }}
              />
            )
          )
        ) : (
          <div className="w-full h-56 bg-slate-100 flex items-center justify-center">No video selected</div>
        )}
      </div>
    </div>
  );

  return (
    <section className={`${position} ${padding} ${className}`} style={isTailwindBg ? wrapperStyle : { background, zIndex }} role="region" aria-label="Feature video" data-video-position={videoPosition}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${containerClass} ${mdBehavior} items-center w-full`} style={containerStyle as React.CSSProperties}>
          {videoPosition === 'left' ? (
            <>
              <div className="w-full md:w-auto">{mediaEl}</div>
              <div className="w-full md:w-auto">{content}</div>
            </>
          ) : (
            <>
              <div className="w-full md:w-auto">{content}</div>
              <div className="w-full md:w-auto">{mediaEl}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureVideo;
