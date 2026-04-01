'use client';
import { Button } from "@/components/ui/button";

interface FinalCtaSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  title,
  description,
  buttonText = "Book a Demo",
  buttonLink = "#",
}) => {
  return (
    <section className=" px-4 pb-16 pt-4">
      <div className="max-w-[91%] max-sm:[100%] mx-auto max-lg:max-w-[100%]">
        <div
          className="
            flex flex-wrap items-center justify-start gap-8 
            rounded-2xl max-sm:px-4 
            bg-gradient-to-r from-[#002D42] to-[#0073A8] 
            px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8 
            text-white text-left"
        >
          {/* CTA Text */}
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-xl sm:text-2xl lg:text-[1.8rem] font-semibold leading-snug mb-4">
              {title}
            </h2>
            <p className="text-base sm:text-[0.95rem] leading-relaxed max-sm:text-center max-sm:w-[100%] opacity-90 w-[80%] sm:w-[85%] lg:w-[80%] ">
              {description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
            <Button asChild className="btn-primary">
              <a
                href={buttonLink}
                className="
                  bg-[#f57c00] hover:bg-[#25A8E0] 
                  text-white font-semibold 
                  rounded-full 
                  px-6 sm:px-12 py-3 sm:py-[0.9rem] 
                  text-base sm:text-[1rem] 
                  transition-colors duration-300 
                  whitespace-nowrap w-full sm:w-auto max-w-[300px]
                "
              >
                {buttonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
