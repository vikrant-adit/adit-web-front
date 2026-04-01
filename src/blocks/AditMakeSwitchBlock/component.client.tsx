'use client';

import Image from 'next/image';

export type BenefitCard = {
  icon: string;
  iconAlt: string;
  title: string;
  text: string;
};

export type AditMakeSwitchBlockProps = {
  heading?: string;
  description?: string;
  benefits?: BenefitCard[];
  backgroundColor?: string;
  iconBackgroundColor?: string;
};

export default function AditMakeSwitchBlock(props: AditMakeSwitchBlockProps) {
  const heading = props.heading ?? 'Adit Makes Switching Simple And Easy!';
  const description =
    props.description ??
    'Our dedicated onboarding team will get your practice up to speed with perfect clarity, providing personalized support every step of the way. No headaches, no strain—just a seamless integration at your own pace.';
  const iconBgClass = props.iconBackgroundColor ?? 'bg-[#00A6E8]';
  const bgClass = props.backgroundColor ?? 'bg-white';

  const defaultBenefits: BenefitCard[] = [
    {
      icon: 'http://localhost:1337/uploads/placeholder.png',
      iconAlt: 'Benefit icon',
      title: 'Benefit Title',
      text: 'Benefit description text',
    },
  ];

  const benefits = props.benefits?.length ? props.benefits : defaultBenefits;

  return (
    <section className={bgClass + ' py-14 md:py-18'}>
      <div className="mx-auto max-w-5xl px-4 text-center">
        {/* heading */}
        <h2 className="text-[2rem] font-extrabold leading-tight text-[#032B4B] md:text-[2.2rem]">
          {heading}
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-[#465A6B] md:text-[14px]">
          {description}
        </p>
      </div>

      {/* benefit cards */}
      <div className="mx-auto mt-8 max-w-6xl px-4">
        <div className="grid gap-5 md:grid-cols-4">
          {benefits.map((item, idx) => (
            <div
              key={`benefit-${idx}`}
              className="flex flex-col items-center rounded-[22px] bg-white px-5 py-6 text-center shadow-[0_10px_30px_rgba(0,55,90,0.08)]"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-[18px] ${iconBgClass} text-white`}>
                <Image
                  src={item.icon}
                  alt={item.iconAlt || 'Image'}
                  width={40}
                  height={40}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="text-sm font-bold text-[#032B4B]">{item.title}</h3>
              <p className="mt-2 text-[12px] leading-snug text-[#506272]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
