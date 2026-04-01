'use client';
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DataForProduct } from "../common/DemoData/DataArrayFromProduct";

// ✅ Define clear types for services and data
interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  route?: string;
}

interface SectionData {
  heading: string;
  items: ServiceItem[];
}

interface CentrazlieCommsServicesSectionProps {
  sectionKey?: keyof typeof DataForProduct; // ensures only valid keys
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CentrazlieCommsServicesSection: React.FC<CentrazlieCommsServicesSectionProps> = ({
  sectionKey = "CentralComms",
  title,
}) => {
  const section: SectionData | undefined = DataForProduct?.[sectionKey];

  // ✅ Safe guard if sectionKey is invalid
  if (!section || !section.items) {
    return (
      <section className="py-12 text-center text-gray-600">
        <p>No services found for the provided section key.</p>
      </section>
    );
  }

  const { items: services } = section;

  return (
    <section className="py-12 sm:py-16">
      {/* Section Title */}
      <div className="text-center mb-10 sm:mb-12 mx-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-900 max-w-5xl mx-auto leading-snug">
          {title || section.heading}
        </h1>
      </div>

      {/* Services Grid */}
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="
              bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center
              hover:bg-sky-500 hover:shadow-lg transition-all duration-300
              group w-full sm:w-[45%] lg:w-[30%]
            "
          >
            {/* Icon */}
            <div className="mb-4">{service.icon}</div>

            {/* Title */}
            <h3
              className="
                text-lg font-semibold text-gray-800 mb-2
                group-hover:text-white transition-colors
              "
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              className="
                text-gray-600 mb-4
                group-hover:text-white transition-colors
              "
            >
              {service.description}
            </p>

            {/* Learn More Link */}
            <Link
              href={service.route || "#"}
              className="
                text-sky-600 font-medium flex items-center gap-1
                group-hover:text-white hover:text-black transition-colors
              "
            >
              Learn more <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CentrazlieCommsServicesSection;
