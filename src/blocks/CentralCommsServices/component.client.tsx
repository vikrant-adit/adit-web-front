'use client';
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ServiceItem {
  id?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  route?: string;
}

export interface CentralCommsServicesProps {
  heading?: string;
  items?: ServiceItem[];
  isGlobal?: boolean;
  globalKey?: string;
}

const CentralCommsServicesBlock: React.FC<CentralCommsServicesProps> = ({
  heading = "Our Services",
  items = [],
}) => {
  // Safe guard if items is invalid
  if (!items || items.length === 0) {
    return (
      <section className="py-12 text-center text-gray-600">
        <p>No services configured for this block.</p>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      {/* Section Title */}
      <div className="text-center mb-10 sm:mb-12 mx-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-900 max-w-5xl mx-auto leading-snug">
          {heading}
        </h1>
      </div>

      {/* Services Grid */}
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto px-4">
        {items.map((service, index) => (
          <div
            key={service.id || index}
            className="
              bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center
              hover:bg-sky-500 hover:shadow-lg transition-all duration-300
              group w-full sm:w-[45%] lg:w-[30%]
            "
          >
            {/* Icon */}
            {service.icon && (
              <div className="mb-4">{service.icon}</div>
            )}

            {/* Title */}
            {service.title && (
              <h3
                className="
                  text-lg font-semibold text-gray-800 mb-2
                  group-hover:text-white transition-colors
                "
              >
                {service.title}
              </h3>
            )}

            {/* Description */}
            {service.description && (
              <p
                className="
                  text-gray-600 mb-4
                  group-hover:text-white transition-colors
                "
              >
                {service.description}
              </p>
            )}

            {/* Learn More Link */}
            {service.route && (
              <Link
                href={service.route}
                className="
                  text-sky-600 font-medium flex items-center gap-1
                  group-hover:text-white hover:text-black transition-colors
                "
              >
                Learn more <ArrowRight size={16} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CentralCommsServicesBlock;
