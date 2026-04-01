/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { resolveImageUrl } from "@/lib/imageResolver";
import Divider from "../Divider/component.client";

export interface FeatureItem {
  title?: string;
  description?: string;
  icon?: any;
}

export interface WhyDownloadGuideBlockProps {
  title?: string;
  description?: string;
  items?: FeatureItem[];
  fetchFromApi?: string;
  data?: any;
}

export default function WhyDownloadGuideBlock({
  title = "Why Download This Guide?",
  description = "",
  items = [],
  fetchFromApi = "false",
}: WhyDownloadGuideBlockProps) {
  const [sectionTitle, setSectionTitle] = useState(title);
  const [sectionDescription, setSectionDescription] = useState(description);
  const [features, setFeatures] = useState<FeatureItem[]>(items);

  useEffect(() => {
    /* ---------------------------------------------
    USE MANUAL ITEMS FROM PAGE BUILDER
    --------------------------------------------- */
    if (fetchFromApi !== "true") {
      setSectionTitle(title);
      setSectionDescription(description);
      setFeatures(items || []);
      return;
    }

    /* ---------------------------------------------
    LOAD FROM PAGE API DATA
    --------------------------------------------- */
    const loadFeatures = () => {
      const apiData = (window as any).__PAGE_API_DATA__;

      const guide = apiData?.whyDownloadGuide;

      if (guide) {
        setSectionTitle(guide.title || title);
        setSectionDescription(guide.description || description);
        setFeatures(guide.features || []);
        return true;
      }

      return false;
    };

    /* Try immediately */
    if (loadFeatures()) return;

    /* Wait for page data */
    const interval = setInterval(() => {
      if (loadFeatures()) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [fetchFromApi, items, title, description]);

  return (
    <section className="py-24 bg-[#e8fbff] text-center ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Section Title */}
        <h2 className="text-4xl font-semibold text-[#243746] mb-4">
          {sectionTitle}
        </h2>
        <div
          className="divider-line"
          style={{
            width: "100px",
            borderBottom: `${2}px ${"solid"} ${"#F28820"}`,
          }}
        />
        {/* Section Description */}
        {sectionDescription && (
          <p className="text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed">
            {sectionDescription}
          </p>
        )}

        {/* Feature Cards */}
        <div className="grid md:grid-cols-4 gap-10">
          {features.map((item, index) => {
            const icon = item?.icon?.url || item?.icon?.data?.attributes?.url;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 pt-16 shadow-md relative text-center"
              >
                {/* Floating Icon */}
                {icon && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-full p-5 shadow-lg">
                    <img
                      src={resolveImageUrl(icon)}
                      alt={item.title || ""}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                )}
                {/* Title */}
                <h3 className="font-semibold text-xl mb-3 text-[#243746]">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
