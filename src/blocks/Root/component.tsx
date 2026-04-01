/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  DefaultComponentProps,
  DropZone,
} from "@wecre8websites/strapi-page-builder-react";
import { FC, ReactElement } from "react";

/* -------------------------------
 * TYPES
 * ------------------------------- */
export interface RootProps extends DefaultComponentProps {
  isEditor?: boolean; // kept for future use (editor-only UI)
}

/* -------------------------------
 * ROOT COMPONENT
 * ------------------------------- */
export const RootComponent: FC<RootProps> = () => {

  return (
    <div className="antialiased text-gray-800 min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
      >
        Skip to main content
      </a>

      <main id="main-content" className="flex-1 relative">
        <DropZone
          zone="default-zone"
          className={`flex-1 relative h-full `}
        />
      </main>
    </div>
  ) as ReactElement;
};