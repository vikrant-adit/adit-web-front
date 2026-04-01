'use client';

import { useEffect } from 'react';
import { getUTMDataFromURL } from '@/lib/utm';
import { setCookie, getCookie } from '@/lib/cookies';

const UTM_COOKIE_KEY = 'adit_utms';

export default function UTMInitializer() {
  useEffect(() => {
    // If already stored, do nothing
    if (getCookie(UTM_COOKIE_KEY)) return;

    const utmData = getUTMDataFromURL();

    // Check if at least one UTM exists
    const hasUTM = Object.values(utmData).some(Boolean);
    if (!hasUTM) return;

    setCookie(UTM_COOKIE_KEY, JSON.stringify(utmData), 30);
  }, []);

  return null;
}
