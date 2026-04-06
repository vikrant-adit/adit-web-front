"use client";

import { resolveImageUrl } from "@/lib/imageResolver";
import Image from "next/image";

export type OnboardingPhase = {
  phase: number;
  title: string;
  duration: string;
  steps: OnboardingStep[];
};

export type OnboardingStep = {
  number: number;
  title: string;
  icon: string;
  iconAlt: string;
bulletPoints: (string | { value: string })[];
  time: string;
};

export type OnboardingBlockProps = {
  heading?: string;
  description?: string; // NEW

  phases?: OnboardingPhase[];
  notes?: string;

  // dynamic colors
  backgroundColor?: string;
  textColor?: string;

  phase1Bg?: string;
  phase1Border?: string;

  phase2Bg?: string;
  phase2Border?: string;

  stepCardBg?: string;
  stepTextColor?: string;

  badgeBg?: string;
  accentColor?: string;
};

export default function OnboardingBlock(props: OnboardingBlockProps) {
  const heading = props.heading ?? "Our Onboarding Process";

  const defaultPhases: OnboardingPhase[] = [
    {
      phase: 1,
      title: "Core System Setup",
      duration: "1–2 weeks",
      steps: [
        {
          number: 1,
          title: "Step 1",
          icon: `${process.env.STRAPI_API_FOR_IMAGES}/uploads/placeholder.png`,
          iconAlt: "Icon",
          bulletPoints: ["Action item 1", "Action item 2"],
          time: "2.5 hours",
        },
      ],
    },
  ];

  const phases: OnboardingPhase[] =
    Array.isArray(props.phases) && props.phases.length > 0
      ? props.phases
      : defaultPhases;
  const description = props.description ?? "";
  return (
    <section
      className="py-20"
      style={{
        backgroundColor: props.backgroundColor || "#073B4C",
        color: props.textColor || "#ffffff",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Main Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">{heading}</h2>
          <p className="mt-4 max-w-3xl mx-auto opacity-80">{description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* LEFT SIDE (Phase 1) */}
          {phases[0] && (
            <div
              className="lg:col-span-3 rounded-3xl border-2 border-dashed p-6"
              style={{
                backgroundColor: props.phase1Bg || "rgba(37,168,224,0.2)",
                borderColor: props.phase1Border || "#25A8E0",
              }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">
                  Phase {phases[0].phase}: {phases[0].title}
                </h3>
                <div
                  className="mt-3 inline-block rounded-full px-6 py-2 text-sm font-semibold"
                  style={{
                    backgroundColor: props.badgeBg || "#0891b2",
                    color: "#fff",
                  }}
                >
                  {phases[0].duration}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {phases[0].steps?.map((step) => (
                  <div
                    key={step.number}
                    className="relative z-0 rounded-2xl shadow-lg overflow-hidden flex flex-col"
                    style={{
                      backgroundColor: props.stepCardBg || "#ffffff",
                      color: props.stepTextColor || "#032B4B",
                    }}
                  >
                    {/* Number Badge */}
                    <div
                      className="absolute top-0 left-0 h-10 w-10 rounded-full border-4 border-white flex items-center justify-center font-bold"
                      style={{
                        backgroundColor: props.badgeBg || "#073B4C",
                        color: "#fff",
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Icon area */}
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 flex justify-center">
                      {step.icon && (
                        <Image
                          src={resolveImageUrl(step.icon)}
                          alt={step.iconAlt || "Image"}
                          width={80}
                          height={80}
                          unoptimized
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h4 className="font-bold mb-4">{step.title}</h4>

                      <ul className="space-y-2 text-sm">
                        {step.bulletPoints?.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span
                              style={{ color: props.accentColor || "#F97316" }}
                            >
                              •
                            </span>
                            <span>
                              {typeof point === "string"
                                ? point
                                : point?.value || ""}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <p
                        className="mt-auto pt-4 text-xs text-center font-semibold"
                        style={{
                          color: props.accentColor || "#F97316",
                        }}
                      >
                        {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RIGHT SIDE (Phase 2) */}
          {phases[1] && (
            <div
              className="rounded-3xl border p-6"
              style={{
                backgroundColor: props.phase2Bg || "rgba(39,198,139,0.3)",
                borderColor: props.phase2Border || "#2DDC96",
                color: props.textColor || "#ffffff",
              }}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">
                  Phase {phases[1].phase}: {phases[1].title}
                </h3>
                <div className="mt-3 inline-block rounded-full bg-white/20 px-5 py-2 text-sm">
                  {phases[1].duration}
                </div>
              </div>

              <div className="space-y-6">
                {phases[1].steps?.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-2xl p-5 flex flex-col"
                    style={{
                      backgroundColor: props.stepCardBg || "#ffffff",
                      color: props.stepTextColor || "#032B4B",
                    }}
                  >
                    <div className="bg-[#27C68B] p-6 flex justify-center rounded-xl mb-4">
                      {step.icon && (
                        <Image
                          src={resolveImageUrl(step.icon)}
                          alt={step.iconAlt || "Image"}
                          width={80}
                          height={80}
                          unoptimized
                        />
                      )}
                    </div>

                    <h4 className="font-bold mb-4">{step.title}</h4>

                    <ul className="space-y-2 text-sm">
                      {step.bulletPoints?.map((point, idx) => (
  <li key={idx} className="flex items-start gap-2">
    <span style={{ color: props.accentColor || "#F97316" }}>
      •
    </span>
    <span>
      {typeof point === "string"
        ? point
        : point?.value || ""}
    </span>
  </li>
))}

                    </ul>

                    <p
                      className="mt-auto pt-4 text-xs text-center font-semibold"
                      style={{
                        color: props.accentColor || "#F97316",
                      }}
                    >
                      {step.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
