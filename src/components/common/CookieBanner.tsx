/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'adit_cookie_banner_dismissed';

const setConsentCookie = () => {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `adit_cookie_consent=1; max-age=${oneYear}; path=/; samesite=lax`;
};

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY) === '1';
      setVisible(!dismissed);
    } catch {
      // If storage is blocked, still show the banner
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore storage errors
    }
    setConsentCookie();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-[#0b2e45] text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-4 px-4 py-3 text-center text-sm sm:text-base">
        <p className="text-balance">
          This website uses cookies to ensure you get the best experience on our website.
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="whitespace-nowrap rounded-full bg-[#f7931a] px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e9850f] focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
