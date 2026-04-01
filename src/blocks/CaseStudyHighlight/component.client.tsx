'use client';
import React, { useEffect, useRef, useState } from 'react';
import CaseStudyHighlight, {
  CaseStudyHighlightProps,
} from '../../components/common/CaseStudyHighlight/CaseStudyHighlighted';

export interface CaseStudyHighlightListProps {
  items: CaseStudyHighlightProps[];
}

const AUTO_SLIDE_INTERVAL_MOBILE = 5000; // Slower on mobile
const AUTO_SLIDE_INTERVAL_DESKTOP = 4000; // Faster on desktop

const CaseStudyHighlightList: React.FC<CaseStudyHighlightListProps> = ({
  items = [],
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slideInterval = isMobile ? AUTO_SLIDE_INTERVAL_MOBILE : AUTO_SLIDE_INTERVAL_DESKTOP;

  // ---- Detect mobile/desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---- Initialize scroll position to first slide
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  // ---- Scroll handler (manual scroll → update dot)
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, offsetWidth } = scrollRef.current;
    if (!offsetWidth) return;

    const idx = Math.round(scrollLeft / offsetWidth);
    setActive(idx);
  };

  // ---- Auto-slide (stable & safe)
  useEffect(() => {
    if (!items.length) return;

    const id = setInterval(() => {
      if (!scrollRef.current) return;

      const next = (active + 1) % items.length;
      scrollRef.current.scrollTo({
        left: next * scrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
      setActive(next);
    }, slideInterval);

    return () => clearInterval(id);
  }, [active, items.length, slideInterval]);

  if (!items.length) return null;

  return (
    <section className="bg-white">
      {/* SLIDER */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="homeCaseStudyScroll"
      >
        {items.map((item, index) => (
          <div
            key={`case-study-${index}`}
            className="caseSlide"
          >
            <CaseStudyHighlight {...item} />
          </div>
        ))}
      </div>

      {/* DOTS */}
      {items.length > 1 && (
        <div className="dotsContainer">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`dot ${active === i ? 'active' : ''}`}
              onClick={() => {
                if (!scrollRef.current) return;
                scrollRef.current.scrollTo({
                  left: i * scrollRef.current.offsetWidth,
                  behavior: 'smooth',
                });
                setActive(i);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CaseStudyHighlightList;
