'use client';

import { resolveImageUrl } from '@/lib/imageResolver';
import Image from 'next/image';
import React from 'react';

export type AudioCardProps = {
  title?: string;
  date?: string;
  duration?: string;
  speaker?: string;
  audioUrl?: string;
  cover?: {
    src?: string;
    alt?: string;
  };
};

export default function AudioCard(props: AudioCardProps) {
  const {
    title,
    date,
    duration,
    speaker,
    audioUrl,
    cover,
  } = props;

  return (
    <div className="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
      {/* Cover */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-lg overflow-hidden bg-orange-100 mx-auto sm:mx-0">
          {cover?.src ? (
            <Image
              src={resolveImageUrl(cover.src)}
              alt={cover?.alt  || 'Image'}
                width={96}
                height={96}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2 w-full">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 text-center sm:text-left">
          {title}
        </h3>

        <div className="text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row sm:flex-wrap gap-y-1 sm:gap-x-3 text-center sm:text-left">
          {date && <span>{date}</span>}
          {duration && <span>Duration: {duration}</span>}
        </div>

        {speaker && (
          <p className="text-xs sm:text-sm md:text-base text-gray-700 text-center sm:text-left">{speaker}</p>
        )}

        {audioUrl && (
          <audio
            controls
            className="w-full mt-2 sm:mt-3 h-8 sm:h-10"
            src={audioUrl}
          />
        )}
      </div>
    </div>
  );
}
