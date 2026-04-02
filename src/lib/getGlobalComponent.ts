const API_BASE = process.env.STRAPI_API;
const AUTH_TOKEN = process.env.STRAPI_API_AUTH_TOKEN;

// export async function getGlobalComponent(globalKey: string) {
//   console.log('🔍 Fetching global component for key:', globalKey);
//   const res = await fetch(
//     `${API_BASE}global-component?filters[key][$eq]=${globalKey}`,
//     {
//       headers: {
//         Authorization: `Bearer ${AUTH_TOKEN}`,
//       },
//       cache: 'no-store',
//     }
//   );
//   console.log(
//   '🧩 Resolved global:',
//  res.status,
//   res.statusText

// );
//   if (!res.ok) {
//     console.log('[GlobalComponent] fetch failed', globalKey);
//     return null;
//   }

//   const json = await res.json();

//   return json?.data?.[0] ?? null;
// }
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
