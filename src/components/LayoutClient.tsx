"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";

import ScrollToTop from "@/components/common/ScrollToTop";
import CookieBanner from "@/components/common/CookieBanner";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LayoutWrapper from "@/components/LayoutWrapper";
import ClientOnly from "@/components/ClientOnly";
import ModalProvider from "@/components/Modals/ModalProvider";
import { EditorProvider } from "@/lib/EditorContext";
import UTMInitializer from "@/components/UTMInitializer";
import LeadSourceConfigInitializer from "@/components/LeadSourceConfigInitializer";
import LoadingScreen from "./Loading";
type LayoutClientProps = {
readonly  children: React.ReactNode;
};

export default function LayoutClient({
  children,
}: LayoutClientProps) {
  const pathname = usePathname();

  const hiddenLayoutPaths = ["/editor", "/auth/login"];

  const hideLayout = hiddenLayoutPaths.some((path) =>
    pathname?.startsWith(path)
  );

  return (
    <>
      <UTMInitializer />
      <LeadSourceConfigInitializer />

      <EditorProvider value={false}>
        <ModalProvider>
          <ClientOnly>
            <ScrollToTop />

            <ErrorBoundary>
              <Suspense fallback={<LoadingScreen/>}>
                <main>
                  <LayoutWrapper>{children}</LayoutWrapper>
                </main>
              </Suspense>
            </ErrorBoundary>
          </ClientOnly>
        </ModalProvider>
      </EditorProvider>

      {!hideLayout && <CookieBanner />}
    </>
  );
}