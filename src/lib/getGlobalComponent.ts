import { getStrapiApiUrl, getStrapiAuthToken } from './defaults';

const API_BASE = getStrapiApiUrl();
const AUTH_TOKEN = getStrapiAuthToken();

export async function getGlobalComponent(keys: string[]) {
  const params = keys.map((k) => `filters[key][$in]=${k}`).join('&');

  const res = await fetch(
    `${API_BASE}global-component?${params}`,
    {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      cache: 'no-store',
    }
  );
  console.log(
  '🧩 Resolved global:',
 res.status,
  res.statusText

);
  if (!res.ok) return [];

  const json = await res.json();
  return json?.data ?? [];
}
