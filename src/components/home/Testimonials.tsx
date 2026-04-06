'use client';
import React from "react";
import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import { buildImageUrl } from "../../lib/defaults";

interface Testimonial {
  logo: string;
  alt: string;
  text: string;
  linkText: string;
  color?: string;
}

const testimonials: Testimonial[] = [
  {
    logo: buildImageUrl("ava_dental_logo_switch_b2b3d7866b.svg"),
    alt: "AVA Dental",
    text: "AVA Dental added $66K in production in just 3 months by boosting patient bookings 25% using",
    linkText: "Digital Forms",
    color: "#ee8c0bff",
  },
  {
    logo: buildImageUrl("dentists_at_lincoln_green_logo_switch_f400e776e9.svg"),
    alt: "Dentists at Lincoln Green",
    text: "Dentists at Lincoln Green cut no-shows by 80% through smart",
    linkText: "Patient Recall",
    color: "#8c04cbff",
  },
  {
    logo: buildImageUrl("arnold_dentistry_logo_switch_ed7f797715.svg"),
    alt: "Arnold Dentistry",
    text: "Arnold Dentistry reduced administrative workload by 75% using",
    linkText: "Adit VoiP and Call Tracking",
    color: "#f8cd0eff",
  },
  {
    logo: buildImageUrl("orthograce_switch_logo_5d2d74fb05.svg"),
    alt: "OrthoGrace Dental",
    text: "OrthoGrace Dental increased treatment acceptance by 91% with easy payment plans via",
    linkText: "Adit Pay",
    color: "#25A8E0",
  },
  {
    logo: buildImageUrl("dedicated_dentistry_logo_switch_b4f44e379b.svg"),
    alt: "Dedicated Dentistry",
    text: "Dedicated Dentistry grew to $1.6M in revenue by making data-driven decisions with",
    linkText: "Practice Analytics",
    color: "#2f82cbff",
  },
  {
    logo: buildImageUrl("sandi_e_silva_logo_switch_0339445985.svg"),
    alt: "Sandi E. Silva",
    text: "Sandi E. Silva DDS, Inc. achieved a 30% revenue increase and saved 16 hours/week by automating",
    linkText: "Insurance Verification",
    color: "#FF655A",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-tr from-[#E8F7FE] to-white py-20">
      {/* Heading */}
      <h1 className="w-full text-center text-[34px] font-semibold mb-6 md:text-[28px] sm:text-[24px]">
        Practices switch to Adit because we deliver results!
      </h1>

      {/* Marquee */}
      <div className="relative flex overflow-hidden">
        <div className="flex gap-6 animate-[scroll_25s_linear_infinite]">
          {testimonials.concat(testimonials).map((t, i) => (
            <div
              key={i}
              className="min-w-[300px] max-w-[300px] flex flex-col justify-around items-center bg-white p-6 rounded-xl shadow-md text-center sm:min-w-[260px] sm:max-w-[260px] sm:p-4 xs:min-w-[220px] xs:max-w-[220px] xs:p-3"
            >
              {/* Logo */}
              <div className="mb-4">
                <Image src={t.logo} alt={t.alt|| 'Image'} className="max-h-[60px]" width={100} height={100} />
              </div>

              {/* Text */}
              <p className="text-[0.95rem] mb-3 sm:text-[0.9rem] xs:text-[0.85rem]">
                {t.text}
              </p>

              {/* Link */}
              <a
                href="#"
                className="font-semibold underline flex items-center gap-1"
                style={{ color: t.color }}
              >
                {t.linkText} <CircleArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animation for Marquee */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;
