// Default configuration values for environment variables
// This file provides fallback values when environment variables are not set

export const DEFAULT_CONFIG = {
  // Strapi API URLs
  STRAPI_API: "http://localhost:1337/api",
  STRAPI_API_FOR_IMAGES: "http://localhost:1337",

  // Strapi Auth Token (should be set in .env for security)
  STRAPI_API_AUTH_TOKEN:"308642958debddf8a365f6b6b774bb29c67d6f8d02fba571f689c02e3121dec7884c14b2ef695f20355b61cf5fb58ecbc8df13a10bb1b210d67cb50f43c44ac8df7bdf7060ea387471e34851b1da255a47665be6d87858a32b56182ae4a0ded1e814660b8768eddb49d69653658b2780bfcd548a23cc4fd8b1054af907fa6e14",

  // Next.js specific
  NEXT_PUBLIC_STRAPI_API_FOR_IMAGES: "http://localhost:1337",
} as const;

// Helper function to get environment variable with fallback
export function getEnvVar(key: keyof typeof DEFAULT_CONFIG): string {
  const value = process.env[key];
  if (!value) return DEFAULT_CONFIG[key];

  const trimmed = String(value).trim();
  if (
    trimmed === "" ||
    trimmed.toLowerCase() === "undefined" ||
    trimmed.toLowerCase() === "null"
  ) {
    return DEFAULT_CONFIG[key];
  }

  return trimmed;
}

// Specific helpers for common URLs
export function getStrapiApiUrl(): string {
  return (getEnvVar('STRAPI_API') || "").replace(/\/$/, "");
}

export function getStrapiImagesUrl(): string {
  return (getEnvVar('STRAPI_API_FOR_IMAGES') || "").replace(/\/$/, "");
}

export function getPublicStrapiImagesUrl(): string {
  return (getEnvVar('NEXT_PUBLIC_STRAPI_API_FOR_IMAGES') || "").replace(/\/$/, "");
}

export function getStrapiAuthToken(): string {
  return getEnvVar('STRAPI_API_AUTH_TOKEN');
}

// Helper to build full image URLs
export const buildImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";

  const baseUrl = getStrapiImagesUrl();

  // If already a full URL → return as-is
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  // Normalize path
  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  // If already contains /uploads → don’t duplicate
  if (normalizedPath.startsWith("/uploads/")) {
    return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
  }

  // Otherwise → prepend /uploads
  return baseUrl
    ? `${baseUrl}/uploads${normalizedPath}`
    : `/uploads${normalizedPath}`;
};

// Helper to build API URLs
export function buildApiUrl(endpoint: string): string {
  const baseUrl = getStrapiApiUrl();
  if (!baseUrl || baseUrl.toLowerCase() === "undefined") {
    return endpoint.replace(/^\//, "");
  }
  return `${baseUrl}/${endpoint.replace(/^\//, "")}`;
}

// Helper to resolve image URLs (handles various input formats)
export const resolveImageUrl = (imagePath?: string | { url?: string }): string => {
  if (!imagePath) return '';

  const path = typeof imagePath === 'string' ? imagePath : imagePath.url;
  if (!path) return '';

  // already absolute URL
  if (/^https?:\/\/|^\/\//i.test(path)) return path;

  // prefix relative paths with base
  const base = getStrapiImagesUrl();
  if (path.startsWith('/')) {
    return base ? `${base}${path}` : path;
  }

  // handle "uploads/..." paths without leading slash
  return base ? `${base}/${path}` : path;
};