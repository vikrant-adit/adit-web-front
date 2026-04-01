/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { resolveImageUrl } from "@/lib/imageResolver";

export interface TabItem {
  label?: string;
  title?: string;
  description?: string;
  image?: any;
}

export interface EbookInsideTabsBlockProps {
  items?: TabItem[];

  fetchFromApi?: string;

  // injected automatically by PageBuilder
  data?: any;
}

export default function EbookInsideTabsBlock({
  items = [],
  fetchFromApi = "false",
  data,
}: EbookInsideTabsBlockProps) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [tabs, setTabs] = useState<TabItem[]>(items);
const getPageApiData = () => {
  return (window as any).__PAGE_API_DATA__ || null;
};
  /* ---------------------------------------------
  READ FROM PAGE CONTENT
  --------------------------------------------- */
useEffect(() => {
  if (!fetchFromApi) {
    setTabs(items);
    return;
  }

  const loadTabs = () => {
    const apiData = (window as any).__PAGE_API_DATA__;
    if (apiData?.tabs) {
      console.log("apiTabs", apiData);
      setTabs(apiData.tabs);
      return true;
    }
    return false;
  };

  // try immediately
  if (loadTabs()) return;

  // observe until it appears
  const interval = setInterval(() => {
    if (loadTabs()) {
      clearInterval(interval);
    }
  }, 200);

  return () => clearInterval(interval);
}, [fetchFromApi, items]);

  const active = tabs?.[activeIndex];

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

        {/* LEFT TABS */}
        <div className="border-l border-gray-200">
          <ul className="space-y-6">

            {tabs.map((item, index) => {

              const activeTab = index === activeIndex;

              return (
                <li key={index}>
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-center w-full text-left pl-6 py-4 transition-all
                      ${
                        activeTab
                          ? "bg-[#F3E9DF] text-[#F5831F] border-l-4 border-[#F5831F] font-semibold"
                          : "text-gray-700 hover:text-[#F5831F]"
                      }
                    `}
                  >

                    {String(index + 1).padStart(2, "0")}.

                    <span className="ml-2">
                      {item.label}
                    </span>

                  </button>
                </li>
              );

            })}

          </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="border border-[#F5831F] rounded-2xl p-10 relative bg-white">

          <h3 className="text-2xl font-semibold text-center mb-3">
            {active?.title}
          </h3>

          <p className="text-gray-600 text-center mb-6">
            {active?.description}
          </p>

          {active?.image && (
            <div className="flex justify-center relative">

              <img
                src={resolveImageUrl(active.image)
                  
                }
                alt={active.image?.alternativeText || active?.title || ""}
                className="relative z-10 rounded shadow-lg max-w-md"
              />

            </div>
          )}

        </div>

      </div>
    </section>
  );
}