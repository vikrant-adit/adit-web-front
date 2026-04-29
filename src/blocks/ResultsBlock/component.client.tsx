'use client';

import Image from 'next/image';
import { buildImageUrl } from '@/lib/defaults';

export type Stat = {
  value: string;
  label: string;
  subLabel?: string;
};

export type CaseCard = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  stats: Stat[];
  buttonText?: string;
  buttonLink?: string;
};

export type ResultsBlockProps = {
  heading?: string;
  caseCards?: CaseCard[];
  backgroundColor?: string;
};

function CaseCardComponent({ imageSrc, imageAlt, title, stats, buttonText, buttonLink }: CaseCard) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_18px_40px_rgba(0,35,69,0.07)]">
      {/* image */}
      <div className="relative h-56 w-full md:h-64">
        <Image
          src={imageSrc}
          alt={imageAlt|| 'Image'}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-4 md:px-7 md:pb-7 md:pt-5">
        {/* title */}
        <p className="text-[15px] leading-snug text-[#011C32]">{title}</p>

        {/* stats row */}
        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm text-[#011C32]">
          {stats.map((s) => (
            <div
              key={s.label + s.value}
              className="rounded-[18px] border border-[#E1EDF7] bg-[#F4FBFF] px-2 py-3"
            >
              <div className="text-xl font-extrabold tracking-tight">{s.value}</div>
              <div className="mt-1 h-[1px] w-10 mx-auto bg-[#CBD8EA]" />
              <p className="mt-1 text-[11px] leading-tight text-[#4A5A6B]">
                {s.label}
                {s.subLabel && (
                  <>
                    <br />
                    {s.subLabel}
                  </>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* button */}
        {buttonText && (
          <div className="mt-6">
            <button
              onClick={() => buttonLink && window.open(buttonLink, '_blank')}
              className="w-full rounded-full bg-[#FF8A1E] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#ff7a00]"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResultsBlock(props: ResultsBlockProps) {
  const heading = props.heading ?? 'Eye‑Opening Results With Adit';
  const bgClass = props.backgroundColor ?? 'bg-[#F4FBFF]';

  const defaultCards: CaseCard[] = [
    {
      imageSrc: buildImageUrl('case_study_placeholder.png'),
      imageAlt: 'Case study',
      title: 'Sample case study result',
      stats: [
        { value: '20X', label: 'Boost in', subLabel: 'online reviews' },
        { value: '4+', label: 'Systems', subLabel: 'replaced' },
        { value: '90%', label: 'Reduction in', subLabel: 'voicemail volume' },
      ],
      buttonText: 'Read More',
    },
  ];

  const cards = props.caseCards?.length ? props.caseCards : defaultCards;

  return (
    <section className={`${bgClass} py-14 md:py-18`}>
      <div className="mx-auto max-w-6xl px-4">
        {/* heading */}
        <h2 className="text-center text-[2rem] font-extrabold leading-tight text-[#032B4B] md:text-[2.2rem]">
          {heading}
        </h2>

        {/* cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((card, idx) => (
            <CaseCardComponent key={`case-${idx}`} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
