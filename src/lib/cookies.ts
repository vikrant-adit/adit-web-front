export function setCookie(
  name: string,
  value: string,
  days = 30
) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  const match = new RegExp(new RegExp('(^| )' + name + '=([^;]+)')).exec(document.cookie);
  return match ? decodeURIComponent(match[2]) : null;
}
