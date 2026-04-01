'use client';

import Image from 'next/image';
import Link from 'next/link';

export type MorningHuddleBlockProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor?: string;
};

export default function MorningHuddleBlock(props: MorningHuddleBlockProps) {
  const eyebrow = props.eyebrow ?? 'Practice Analytics';
  const heading =
    props.heading ??
    'Start Your Day With The Most Productive\n15‑Minute Morning Huddle';
  const description =
    props.description ??
    'Our dedicated onboarding experts will work at your pace to get your team and practice up to speed and fully integrated with Adit\'s all‑in‑one software.';
  const imageSrc =
    props.imageSrc ??
    'http://localhost:1337/uploads/practice_analytics_video_ezgif_com_video_to_gif_converter_cc85c26835.gif';
  const imageAlt = props.imageAlt ?? 'Practice analytics morning huddle dashboard';
  const buttonText = props.buttonText ?? 'Schedule a Demo';
  const buttonUrl = props.buttonUrl ?? '/schedule-a-demo';
  const bgClass = props.backgroundColor ?? 'bg-[#E4F7FF]';

  return (
    <section className={`${bgClass} py-14 md:py-20`}>
      <div className="mx-auto max-w-4xl px-4 text-center">
        {/* Eyebrow */}
        <p className="text-sm font-semibold uppercase tracking-wide text-[#00A0D2]">
          {eyebrow}
        </p>

        {/* Heading */}
        <h2 className="mt-3 text-[1.9rem] font-extrabold leading-tight text-[#013552] md:text-[2.1rem]">
          {heading.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-[#384853] md:text-[15px]">
          {description}
        </p>

        {/* Dashboard image */}
        <div className="mt-8 md:mt-10">
          <div className="inline-block overflow-hidden rounded-[10px] border border-[#E1E5EB] bg-white shadow-sm">
            <Image
              src={imageSrc}
              alt={imageAlt || 'Image'}
              width={760}
              height={520}
              className=""
              unoptimized
            />
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-10 md:mt-12">
          <Link href={buttonUrl} className="btn-primary">
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
