import React from 'react';



export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-charcoal antialiased h-full w-full">
      {children}
    </main>
  );
}