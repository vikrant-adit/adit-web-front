import { buildApiUrl } from '@/lib/defaults';

export async function sendToZoho(
  slug: string,
  fields: Record<string, string>
) {
  const response = await fetch(buildApiUrl('zoho/submit'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slug,
      fields,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error('Zoho submission failed');
  }

  return result;
}
