// components/LayoutWrapper.tsx
"use client";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayoutRoutes = ["/login", "/signup", "/preview"];
  const shouldHideLayout = hideLayoutRoutes.some((path) =>
    pathname?.startsWith(path) ?? false
  );

  return (
    <>
      {/* {!shouldHideLayout && <Navbar />} */}
      <main>{children}</main>
      {/* {!shouldHideLayout && <Footer />} */}
    </>
  );
}
