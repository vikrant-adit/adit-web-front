"use client";

import { resolveImageUrl } from "@/lib/imageResolver";
import Image from "next/image";

export type FeatureCard = {
  image: string;
  alt: string;
  caption: string;
};

export type FeatureStep = {
  step: number;
  tag: string;
  title: string;
  cards: FeatureCard[];
};

export type AllStepsBlockProps = {
  steps?: FeatureStep[];
  backgroundColor?: string;

  // Typography customization
  tagColor?: string;
  titleColor?: string;
  captionColor?: string;

  tagFontSize?: string;
  titleFontSize?: string;
  captionFontSize?: string;
};

export default function AllStepsBlock(props: AllStepsBlockProps) {
  const rawBg = props.backgroundColor;

  const isRawColor =
    rawBg &&
    (rawBg.startsWith("#") ||
      rawBg.startsWith("rgb") ||
      rawBg.startsWith("linear") ||
      rawBg.startsWith("hsl"));

  const bgClass = !isRawColor ? (rawBg ?? "bg-white") : "";
  const bgStyle: React.CSSProperties = isRawColor ? { background: rawBg } : {};

  const defaultSteps: FeatureStep[] = [
    {
      step: 1,
      tag: "Feature Tag",
      title: "Feature Title",
      cards: [
        {
          image: `${process.env.STRAPI_API_FOR_IMAGES}/uploads/placeholder.png`,
          alt: "Feature image",
          caption: "Feature description",
        },
      ],
    },
  ];

  const steps = props.steps?.length ? props.steps : defaultSteps;
  const resolveColor = (value?: string, fallback?: string) => {
    if (!value) return { className: fallback ?? "", style: {} };

    const isRaw =
      value.startsWith("#") ||
      value.startsWith("rgb") ||
      value.startsWith("hsl");

    if (isRaw) {
      return { className: "", style: { color: value } };
    }

    return { className: value, style: {} };
  };
  const tagColorResolved = resolveColor(props.tagColor, "text-[#00A0D2]");
  const titleColorResolved = resolveColor(props.titleColor, "text-[#032B4B]");
  const captionColorResolved = resolveColor(
    props.captionColor,
    "text-[#465A6B]",
  );

  return (
    <section className={bgClass} style={bgStyle}>
      {steps.map((step) => (
        <section
          key={`step-${step.step}`}
          className="py-8 sm:py-12 md:py-16 lg:py-20 border-b border-gray-200 last:border-b-0"
        >
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            {/* Step header */}
            <div className="mb-6 md:mb-10">
              <p
                className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${tagColorResolved.className}`}
                style={tagColorResolved.style}
              >
                {step.tag}
              </p>

              <h2
                className={`mt-2 font-extrabold leading-tight ${titleColorResolved.className} ${props.titleFontSize ?? "text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem]"}`}
                style={titleColorResolved.style}
              >
                {step.title}
              </h2>
            </div>

            {/* Feature cards grid */}
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {step.cards.map((card, idx) => (
                <div key={`card-${idx}`} className="flex flex-col">
                  <div className="relative aspect-video overflow-hidden rounded-[12px] bg-gray-100">
                    <Image
                      src={resolveImageUrl(card.image)}
                      alt={card.alt || "Image"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p
                    className={`mt-2 sm:mt-3 md:mt-4 leading-relaxed ${captionColorResolved.className} ${props.captionFontSize ?? "text-xs sm:text-sm md:text-base"}`}
                    style={captionColorResolved.style}
                  >
                    {card.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}
