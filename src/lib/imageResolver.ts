// lib/imageResolver.ts
import { getStrapiImagesUrl } from './defaults';

export const resolveImageUrl = (imagePath?: string | { url?: string }): string => {
  if (!imagePath) return '';

  const path = typeof imagePath === 'string' ? imagePath : imagePath.url;
  if (!path) return '';

  // already absolute URL
  if (/^https?:\/\/|^\/\//i.test(path)) return path;

  // prefix relative paths with env var
  const base = getStrapiImagesUrl();
  if (path.startsWith('/')) {
    return base ? `${base}${path}` : path;
  }

  // handle "uploads/..." paths without leading slash
  return base ? `${base}/${path}` : path;
};