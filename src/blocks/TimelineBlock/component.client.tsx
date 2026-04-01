'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type TimelineItem = {
  year: string;
  text: string;
};

export type TimelineBlockProps = {
  heading?: string;
  description?: string;
  items?: TimelineItem[];
  initialYear?: string;
  backgroundColor?: string;
};

export default function TimelineBlock(props: TimelineBlockProps) {
  const heading = props.heading ?? 'The Adit story – heroes rarely do it alone';
  const description =
    props.description ??
    'Built over a decade alongside doctors, Adit focuses on removing operational friction so providers can focus on patient care.';
  
  const defaultItems: TimelineItem[] = [
    { year: '2020', text: 'Sample timeline item' },
  ];

  const items = props.items?.length ? props.items : defaultItems;
  const initialYearValue = props.initialYear ?? items[0]?.year;
  const currentIndex = items.findIndex((item) => item.year === initialYearValue);
  const [index, setIndex] = useState(Math.max(0, currentIndex));

  const goToPrevious = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const current = items[index];
  const prevYear = items[(index - 1 + items.length) % items.length];
  const nextYear = items[(index + 1) % items.length];

  const bgClass = props.backgroundColor ?? 'bg-[#e8f9ff]';

  return (
    <section className={`${bgClass} py-8 sm:py-12 md:py-16 lg:py-20`}>
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#08344a]">{heading}</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-[#08344a]/70">{description}</p>
        </div>

        {/* Timeline visualization with circles and connecting line */}
        <div className="relative mb-6 md:mb-10 lg:mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {/* Left arrow button */}
          <button
            onClick={goToPrevious}
            className="flex h-9 sm:h-10 md:h-12 w-9 sm:w-10 md:w-12 items-center justify-center rounded-full bg-[#0687BE] text-white hover:bg-[#0a5c9b] transition-colors flex-shrink-0"
            aria-label="Previous year"
          >
            <ChevronLeft size={16} className="sm:block hidden" />
            <ChevronLeft size={18} className="hidden sm:block md:hidden" />
            <ChevronLeft size={24} className="hidden md:block" />
          </button>

          {/* Timeline display */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-wrap justify-center">
            {/* Previous year */}
            <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full bg-[#D0D5DD]" />
            <span className="text-xs sm:text-sm font-medium text-[#667085] min-w-8 sm:min-w-10 md:min-w-12">{prevYear.year}</span>

            {/* Current year (larger circle) */}
            <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-[#0687BE] ring-2 ring-[#0687BE]/30" />
            <span className="text-base sm:text-xl md:text-2xl font-bold text-[#0687BE] min-w-10 sm:min-w-12 md:min-w-16">{current.year}</span>

            {/* Next year */}
            <span className="text-xs sm:text-sm font-medium text-[#667085] min-w-8 sm:min-w-10 md:min-w-12">{nextYear.year}</span>
            <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full bg-[#D0D5DD]" />
          </div>

          {/* Right arrow button */}
          <button
            onClick={goToNext}
            className="flex h-9 sm:h-10 md:h-12 w-9 sm:w-10 md:w-12 items-center justify-center rounded-full bg-[#0687BE] text-white hover:bg-[#0a5c9b] transition-colors flex-shrink-0"
            aria-label="Next year"
          >
            <ChevronRight size={16} className="sm:block hidden" />
            <ChevronRight size={18} className="hidden sm:block md:hidden" />
            <ChevronRight size={24} className="hidden md:block" />
          </button>
        </div>

        {/* Current event dessm sm:text-base md:text-lg lg:text-xliption */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg text-[#08344a] leading-relaxed">{current.text}</p>
        </div>
      </div>
    </section>
  );
}
