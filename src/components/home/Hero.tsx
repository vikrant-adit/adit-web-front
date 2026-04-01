"use client";
import { JSX, useEffect, useRef, useState } from "react";
import "../../styles/Hero.css";
import Stats from "./Stats";
import RatingsSection from "./RatingsSection";
const LINES = [
  "seamless workflows",
  "faster practice growth",
  "better patient care",
];

export default function Hero(): JSX.Element {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const typingSpeed = 80;
  const delayAfterTyping = 1200;
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (currentLine >= LINES.length) return;

    const text = LINES[currentLine];
    let i = 0;

    const typeNext = () => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i < text.length) {
        const t = window.setTimeout(typeNext, typingSpeed);
        timersRef.current.push(t);
      } else {
        const t = window.setTimeout(() => {
          setDisplayedText("");
          setCurrentLine((p) => (p + 1) % LINES.length);
        }, delayAfterTyping);
        timersRef.current.push(t);
      }
    };

    typeNext();

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [currentLine]);

  return (
    <section className="hero">
      <h2 className="">
        All-in-one patient management software <br />
        <span className="typed-line leading-[2]">
          for {displayedText}
          {/* <span className="cursor">|</span> */}
        </span>
      </h2>

      <p className="text-black">
        Phones. Texting. Reminders. Forms. Scheduling. Payments. Reviews.
        Analytics. Verifications. AI - fully integrated in one platform.
      </p>

      <div className="video-wrapper">
        <iframe
          src="https://player.vimeo.com/video/1067218600?badge=0&autopause=0&player_id=0&app_id=58479"
          title="Demo Video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
      <button className="book-btn">Book a demo</button>
      <Stats />
      <RatingsSection />
    </section>
  );
}
