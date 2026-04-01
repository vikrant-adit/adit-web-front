'use client';
import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Hero.css';
import { useEditorGlow } from '@/hooks/useEditorGlow';
// import Link from 'next/link';

export interface HeroTypedProps {
  heading: string;
  // subtitle: string;
  lines: any;
  // videoSrc?: string;
  // buttonText?: string;
  // buttonUrl?: string;
  typingSpeed?: number;
  delayAfterTyping?: number;
  // editable?: boolean;
  isGlobal?: boolean;
}

const HeroTyped: React.FC<HeroTypedProps> = ({
  heading,
  // subtitle,
  lines,
  // videoSrc,
  // buttonText = 'Book a demo',
  // buttonUrl = '#',
  typingSpeed = 80,
  delayAfterTyping = 1200,
  // editable = false,
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (!lines.length) {
      setTyped('');
      return;
    }

    let char = 0;
    const text = lines[lineIndex];

    const type = () => {
      setTyped(text.slice(0, char + 1));
      char++;

      if (char < text.length) {
        timers.current.push(
          window.setTimeout(type, typingSpeed)
        );
      } else {
        timers.current.push(
          window.setTimeout(() => {
            setTyped('');
            setLineIndex((i) => (i + 1) % lines.length);
          }, delayAfterTyping)
        );
      }
    };

    timers.current.push(window.setTimeout(type, 150));

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [lineIndex, lines.join('|'), typingSpeed, delayAfterTyping]);

  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
      <section className="hero">
        <h2>
          {heading}
          <br />
          <span className="typed-line">
            {lines.length ? `for ${typed}` : ''}
          </span>
        </h2>

        {/* <p>{subtitle}</p> */}

        {/* <div className="video-wrapper">
          {videoSrc ? (
            <iframe
              src={videoSrc}
              title="Hero Video"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : null}
        </div> */}

        {/* <div className="mt-6">
          <Link
            href={buttonUrl}
            className="book-btn"
            onClick={(e) => editable && e.preventDefault()}
          >
            {buttonText}
          </Link>
        </div> */}
      </section>
    </div>
  );
};

export default HeroTyped;
