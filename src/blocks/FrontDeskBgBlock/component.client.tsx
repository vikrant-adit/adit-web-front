'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Caption {
  start: number;
  text: string;
}

interface FrontDeskDemoBlockProps {
  heroTitle: string;
  heroSubtitle: string;
  videoUrl: string;
  audioUrl: string;
  captions: Caption[];
}

export default function FrontDeskDemoBlock({
  heroTitle,
  heroSubtitle,
  videoUrl,
  audioUrl,
  captions,
}: Readonly<FrontDeskDemoBlockProps>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [prev2, setPrev2] = useState('');
  const [prev1, setPrev1] = useState('');
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      let index = -1;

      for (let i = 0; i < captions.length; i++) {
        if (currentTime >= captions[i].start) {
          index = i;
        }
      }

      if (index !== -1) {
        setPrev2(index >= 2 ? captions[index - 2].text : '');
        setPrev1(index >= 1 ? captions[index - 1].text : '');
        setCurrent(captions[index].text);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [captions]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Hero Content */}
      <div className="relative z-10 text-center py-24 px-6 bg-black/40">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          {heroSubtitle}
        </p>
      </div>

      {/* Chat Demo Section */}
      <div className="relative z-10 bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Caption Boxes */}
          <div className="space-y-3 mb-6 min-h-[120px]">
            {prev2 && (
              <div className="text-gray-400 text-sm">{prev2}</div>
            )}
            {prev1 && (
              <div className="text-gray-600 text-base">{prev1}</div>
            )}
            {current && (
              <div className="text-black font-semibold text-lg">
                {current}
              </div>
            )}
          </div>

          {/* Audio */}
         <audio ref={audioRef} controls className="w-full">
  <source src={audioUrl} type="audio/mpeg" />
  <track
    kind="captions"
    src="/captions/audio-captions.vtt"
    srcLang="en"
    label="English captions"
    default
  />
  Your browser does not support the audio element.
</audio>
        </div>
      </div>
    </section>
  );
}