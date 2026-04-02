'use client';
import React from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export interface VideoBlockProps {
  video?: {
    src?: string;
    title?: string;
    url?: string;
  };
  width?: number;
  height?: number;
  borderRadius?: number;
  margin?: number;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  isGlobal?: boolean;
  globalKey?: string;
}

const VideoBlock: React.FC<VideoBlockProps> = ({
  video = { src: '', title: '', url: '' },
  width = 800,
  height = 450,
  borderRadius = 12,
  margin = 0,
  autoplay = false,
  controls = true,
  loop = false,
  muted = false,
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  const videoSrc = video?.src || video?.url;

  if (!videoSrc) {
    return (
      <div className={shouldGlow ? 'editor-global-glow' : ''}>
        <div
          className="flex items-center justify-center  text-gray-500 w-full py-12 rounded-md border"
          style={{ borderRadius, margin }}
        >
          No video selected
        </div>
      </div>
    );
  }

  // Resolve video URL with base prefix if relative
  let resolvedSrc = videoSrc;
  if (
    videoSrc.startsWith('/') &&
    process.env.STRAPI_API_FOR_IMAGES
  ) {
    resolvedSrc = `${process.env.STRAPI_API_FOR_IMAGES}${videoSrc}`;
  }

  // Detect embeds
  const isYouTubeEmbed =
    resolvedSrc.includes('youtube.com') || resolvedSrc.includes('youtu.be');
  const isVimeoEmbed = resolvedSrc.includes('vimeo.com');

  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
      <div className="flex justify-center my-4 px-3 sm:px-6" style={{ margin }}>
        <div className="w-full max-w-4xl" style={{ aspectRatio: `${width}/${height}` }}>
          {isYouTubeEmbed ? (
            <iframe
              width="100%"
              height="100%"
              src={resolvedSrc}
              title={video?.title || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius, border: 'none' }}
            />
          ) : isVimeoEmbed ? (
            <iframe
              width="100%"
              height="100%"
              src={resolvedSrc}
              title={video?.title || 'Video'}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ borderRadius, border: 'none' }}
            />
          ) : (
            <video
              width="100%"
              height="100%"
              controls={controls}
              loop={loop}
              muted={muted}
              autoPlay={autoplay}
              style={{ borderRadius, margin, objectFit: 'cover' }}
              title={video?.title || 'Video'}
            >
              <source src={resolvedSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;
