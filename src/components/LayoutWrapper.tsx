// components/LayoutWrapper.tsx
"use client";

export default function LayoutWrapper({ children }: Readonly<{ children: React.ReactNode }>) {



  return (
    <main>{children}</main>
  );
}
