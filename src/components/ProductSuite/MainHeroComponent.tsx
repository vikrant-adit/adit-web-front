import Image from "next/image";
import React from "react";

interface ProductSuiteHeroProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
}

const ProductSuiteHeroComponent: React.FC<ProductSuiteHeroProps> = ({
  title,
  description,
  imageUrl,
  buttonText = "Schedule a Demo",
  buttonLink = "/schedule-a-demo",
}) => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white relative">
      <div>
        <div
          className="relative z-[1] text-white text-center mx-4 sm:mx-6 md:mx-10 p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden"
          style={{
            background:
              "radial-gradient(109.01% 109.01% at 46.76% 134.25%, #25a8e0 0%, #002d42 100%)",
          }}
        >
          {/* Background Pattern */}
          <div
            className="absolute inset-0 z-[-1] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('http://localhost:1337/uploads/innerpage_hero_section_bgpattern_ecbfe42bf8.png')",
            }}
          ></div>

          {/* Dynamic Title */}
          <h1 className="text-2xl sm:text-3xl md:text-[40px] font-semibold leading-tight">
            {title}
          </h1>

          {/* Dynamic Description */}
          <p className="w-[90%] max-sm:w-[100%] md:w-3/4 mx-auto text-base sm:text-[17px] mt-3 max-sm:text-[14px]">
            {description}
          </p>

          {/* Dynamic Button */}
          <a href={buttonLink}>
            <button className="btn-primary text-white text-sm sm:text-[16px] font-semibold leading-none bg-[#f28820] shadow-[0_4px_20px_rgba(244,137,31,0.5)] rounded-full px-5 sm:px-[26px] py-3 sm:py-[13px] my-5">
              {buttonText}
            </button>
          </a>

          {/* Dynamic Image */}
          <Image
            src={imageUrl}
            alt={title|| 'Image'}
            width={800}
            height={800}
            unoptimized
            className="w-full max-w-[880px] mx-auto mt-6"
            
          />
        </div>
      </div>
    </section>
  );
};

export default ProductSuiteHeroComponent;
