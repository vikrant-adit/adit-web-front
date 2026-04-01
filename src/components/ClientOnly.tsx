'use client';
import React, { useEffect, useState } from 'react';

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // defer the state update to the next animation frame to avoid synchronous
    // setState inside the effect which can cause cascading renders.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
}