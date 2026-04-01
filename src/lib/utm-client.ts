import { getCookie } from '@/lib/cookies';

const UTM_COOKIE_KEY = 'adit_utms';

export function getStoredUTMs() {
  const raw = getCookie(UTM_COOKIE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
