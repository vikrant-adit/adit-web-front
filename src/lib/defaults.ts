// Default configuration values for environment variables
// This file provides fallback values when environment variables are not set

export const DEFAULT_CONFIG = {
  // Strapi API URLs
  STRAPI_API: "https://40f6-103-239-86-35.ngrok-free.app/api",
  STRAPI_API_FOR_IMAGES: "https://40f6-103-239-86-35.ngrok-free.app",

  // Strapi Auth Token (should be set in .env for security)
  STRAPI_API_AUTH_TOKEN: "",

  // Next.js specific
  NEXT_PUBLIC_STRAPI_API_FOR_IMAGES: "https://40f6-103-239-86-35.ngrok-free.app",
} as const;

// Helper function to get environment variable with fallback
export function getEnvVar(key: keyof typeof DEFAULT_CONFIG): string {
  return process.env[key] || DEFAULT_CONFIG[key];
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

// Helper to build full image URLs
export function buildImageUrl(imagePath: string): string {
  const baseUrl = getStrapiImagesUrl();
  return `${baseUrl}/uploads/${imagePath}`;
}

// Helper to build API URLs
export function buildApiUrl(endpoint: string): string {
  const baseUrl = getStrapiApiUrl();
  return `${baseUrl}/${endpoint.replace(/^\//, "")}`;
}