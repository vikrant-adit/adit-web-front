/* eslint-disable @typescript-eslint/no-explicit-any */
// File: FeatureVideo.component.client.tsx
'use client';
import React from 'react';
import DOMPurify from 'dompurify';

export type MediaVideo = { src?: string; poster?: string; alt?: string };

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
  const match = new RegExp(/src=['"]([^'"]+)['"]/i).exec(iframeStr);
  return match ? match[1] : undefined;
};

const parseAspectRatio = (ratio?: string) => {
  if (!ratio) return undefined;
  const parts = ratio.split('/').map(Number);
  if (parts.length === 2 && parts.every((n) => Number.isFinite(n) && n > 0)) {
    return (parts[1] / parts[0]) * 100; // padding-top percentage (height / width * 100)
  }
  return undefined;
};
const getPresetStyle = (mediaPreset: string): React.CSSProperties => {
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
    default:
      return {};
  }
};

const getTitleStyles = (titleSize: string, titleColor: string) => {
  const isTailwindTextClass = typeof titleSize === 'string' && titleSize.trim().startsWith('text-');
  const isTailwindColorClass = typeof titleColor === 'string' && titleColor.trim().startsWith('text-');
  
  const inlineStyle: React.CSSProperties = {};
  if (!isTailwindTextClass && titleSize) inlineStyle.fontSize = titleSize as any;
  if (!isTailwindColorClass && titleColor) inlineStyle.color = titleColor as any;

  const className = [
    'font-extrabold',
    'leading-tight',
    'mb-6',
    'text-slate-900',
    isTailwindTextClass ? titleSize : 'text-[1.5rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[36px]',
    isTailwindColorClass ? titleColor : '',
  ]
    .filter(Boolean)
    .join(' ');

  return { titleInlineStyle: Object.keys(inlineStyle).length ? inlineStyle : undefined, titleClassName: className };
};

const resolveVideoData = (video: any) => {
  let rawVideoSrc: string | undefined = undefined;
  if (typeof video === 'string') {
    rawVideoSrc = video;
  } else if (typeof video === 'object') {
    rawVideoSrc = video?.src as string | undefined;
  }
  const rawPoster = typeof video === 'object' ? video?.poster : undefined;
  const videoSrcFromIframeString = rawVideoSrc?.trim().startsWith('<iframe')
    ? extractSrcFromIframeString(rawVideoSrc)
    : undefined;
  
  return {
    rawVideoSrc,
    rawPoster,
    finalSrc: videoSrcFromIframeString || rawVideoSrc,
    isEmbed: looksLikeEmbed(rawVideoSrc) || !!videoSrcFromIframeString
  };
};

const getBorderStyles = (borderColor: string, showBorder: boolean, borderWidth: number) => {
  const isTailwindBorderClass = typeof borderColor === 'string' && borderColor.trim().startsWith('border-');
  const borderInlineStyle: React.CSSProperties | undefined =
    !isTailwindBorderClass && borderColor ? { borderColor: borderColor as any, borderStyle: 'solid' } : undefined;
  const borderClassPart = isTailwindBorderClass ? borderColor : '';
  
  const additionalWrapperStyle = {
    ...(showBorder ? { borderWidth: `${borderWidth}px` } : {}),
    ...borderInlineStyle,
  };

  return { borderClassPart, additionalWrapperStyle };
};

const getContainerLayout = (layout: string, flexDirection: string, className: string, gap: number) => {
  let containerClass = '';
  let containerStyle: React.CSSProperties = { gap: `${gap}px` };
  let mdBehavior = '';

  if (layout === 'grid') {
    containerClass = `grid ${className}`;
    containerStyle.gridTemplateColumns = 'repeat(1, minmax(0, 1fr))';
    mdBehavior = 'md:grid-cols-2';
  } else {
    const mdFlex = flexDirection === 'row' ? 'md:flex-row' : 'md:flex-col';
    containerClass = `flex flex-col ${className} ${mdFlex} items-center justify-center md:justify-start`;
    mdBehavior = mdFlex;
  }

  return { containerClass, containerStyle, mdBehavior };
};

const renderMediaContent = ({
  finalSrc,
  useAspectRatio,
  paddingTopPercent,
  isEmbed,
  title,
  rawPoster,
  controls,
  autoplay,
  loop,
  muted,
  videoWrapperStyle,
}: any) => {
  if (!finalSrc) {
    return <div className="w-full h-56 bg-slate-100 flex items-center justify-center">No video selected</div>;
  }

  if (useAspectRatio) {
    return (
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
          >
            <track kind="captions" />
          </video>
        )}
      </div>
    );
  }

  const staticHeight = videoWrapperStyle.height ? `${videoWrapperStyle.height}` : '100%';

  if (isEmbed) {
    return (
      <iframe
        src={finalSrc}
        title={title || 'Embedded video'}
        width="100%"
        height={staticHeight}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="no-referrer"
        style={{ display: 'block', width: '100%', height: staticHeight, border: 0 }}
      />
    );
  }

  return (
    <video
      src={finalSrc}
      poster={rawPoster}
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      playsInline
      style={{ display: 'block', width: '100%', height: staticHeight, objectFit: 'cover' }}
    >
      <track kind="captions" />
    </video>
  );
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

  const presetStyle = getPresetStyle(mediaPreset);

  // aspect ratio handling
  const paddingTopPercent = parseAspectRatio(aspectRatio);

  // title handling
  const { titleInlineStyle, titleClassName } = getTitleStyles(titleSize, titleColor);

  // resolve video src/poster
  const { rawPoster, finalSrc, isEmbed } = resolveVideoData(video);

  // border handling
  const { borderClassPart, additionalWrapperStyle } = getBorderStyles(borderColor, showBorder, borderWidth);

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
  }

  // if aspectRatio provided and height not explicitly set, use padding-top trick and position children absolute
  const useAspectRatio = paddingTopPercent !== undefined && !customMediaHeight;

  // assemble wrapper style including border width and inline border color if required
  const videoWrapperStyle: React.CSSProperties = {
    ...videoWrapperBase,
    ...additionalWrapperStyle,
  };

  // container classes/styles
  const { containerClass, containerStyle, mdBehavior } = getContainerLayout(layout, flexDirection, className, gap);

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
        {renderMediaContent({
          finalSrc,
          useAspectRatio,
          paddingTopPercent,
          isEmbed,
          title,
          rawPoster,
          controls,
          autoplay,
          loop,
          muted,
          videoWrapperStyle,
        })}
      </div>
    </div>
  );

  return (
    <section className={`${position} ${padding} ${className}`} style={isTailwindBg ? wrapperStyle : { background, zIndex }} aria-label="Feature video" data-video-position={videoPosition}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${containerClass} ${mdBehavior} items-center w-full`} style={containerStyle}>
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
