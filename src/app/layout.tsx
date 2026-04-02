// // app/layout.tsx
// "use client";
// import React, { Suspense } from "react";
// import { Inter, JetBrains_Mono } from "next/font/google";
// import "./globals.css"; // Global CSS styles

// // Query Client for react-query across all pages
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import LayoutWrapper from "@/components/LayoutWrapper";
// import ErrorBoundary from "../components/common/ErrorBoundary"; // Catches React errors below Navbar/Footer
// import Navbar from "../components/common/Navbar"; // Top navigation for all pages
// import Footer from "../components/layout/Footer"; // Footer for all pages
// import ScrollToTop from "../components/common/ScrollToTop"; // Ensures user starts at top of page on navigation
// import CookieBanner from "../components/common/CookieBanner";
// import { usePathname } from "next/navigation";
// import ClientOnly from "@/components/ClientOnly";
// import ModalProvider from "@/components/Modals/ModalProvider";
// import "@/components/Modals";
// import { EditorProvider } from "@/lib/EditorContext";
// import SidePopupPromo from "@/components/SidePopUp/sidepopup";
// import UTMInitializer from "@/components/UTMInitializer";
// import LeadSourceConfigInitializer from "@/components/LeadSourceConfigInitializer";
// import { getGlobal } from "@/lib/getGlobal";

// // Set up Google fonts for global usage
// const inter = Inter({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = JetBrains_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // Metadata for SEO and browser tab
// //  getGlobalPromo() {
// const global = await getGlobal();

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // Create a query client instance for react-query
//   // const queryClient = new QueryClient();
//   const pathname = usePathname();

//   const hiddenLayoutPaths = ["/editor", "/auth/login"];

//   // ✅ Check if current route matches one of the hidden paths
//   const hideLayout = hiddenLayoutPaths.some(
//     (path) =>
//       // pathname can be null from usePathname, so guard before calling startsWith
//       pathname?.startsWith(path) ?? false,
//   );
//   // The returned markup will wrap every rendered page in your app
//   return (
//     <html lang="en">
//       <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
//         <UTMInitializer />
//         <LeadSourceConfigInitializer />

//         <EditorProvider value={false}>
//           <ModalProvider>
//             <ClientOnly>
//               {/* Provider for react-query (global) */}
//               {/* <QueryClientProvider client={queryClient}> */}
//               {/* This triggers scroll-to-top on route change */}
//               <ScrollToTop />

//               {/* Catches runtime errors in any component below */}
//               <ErrorBoundary>
//                 <Suspense
//                   fallback={
//                     <div className="min-h-[200px] flex items-center justify-center">
//                       Loading...
//                     </div>
//                   }
//                 >
//                   {!hideLayout && <Navbar headerData={global?.header} />}

//                   {/* Main page content (differs for every route) */}
//                   <main>
//                     {" "}
//                     <LayoutWrapper>{children}</LayoutWrapper>
//                   </main>
//                   {!hideLayout && (
//                     <SidePopupPromo
//                       apiUrl={process.env.STRAPI_API!}
//                       fallbackDelay={100}
//                     />
//                   )}
//                   {/* Footer always persists on bottom */}
//                   {!hideLayout && <Footer  footer={global?.footer}/>}
//                 </Suspense>
//               </ErrorBoundary>
//             </ClientOnly>
//           </ModalProvider>
//         </EditorProvider>
//         {/* </QueryClientProvider> */}
//         {!hideLayout && <CookieBanner />}
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import React from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import LayoutClient from "@/components/LayoutClient";
import { getGlobal } from "@/lib/getGlobal";

// Google Fonts
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Optional: SEO metadata
export const metadata = {
  title: "Adit | All-in-One Sales Enablement Platform",
  description: "Your site description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Fetch global CMS data on server
  const global = await getGlobal();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {/* Pass CMS data to client wrapper */}
        <LayoutClient global={global}>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}