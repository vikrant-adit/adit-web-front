/**
 * Centralized application configuration
 *
 * Source of truth for environment-driven values that the app uses.
 * Reads from Vite's import.meta.env and provides safe defaults for local dev.
 */

export type AppConfig = {
  api: {
    baseUrl: string;
  };
  localApi: {
    baseUrl: string;
    token: string;
  };
  mode: string;
  isDev: boolean;
  isProd: boolean;
};


// ✅ Now viteEnv is strongly typed
const NODE_ENV = process.env.NODE_ENV ?? "development";

import { getEnvVar, buildApiUrl } from './defaults';

const config: AppConfig = {
  api: {
    // Change this default to whatever your local API runs on
    baseUrl: process.env.ADIT_URL ?? "https://adit.com/api/v1/",
  },
  localApi: {
    baseUrl: buildApiUrl(''),
    token: getEnvVar('STRAPI_API_AUTH_TOKEN'),
  },
  mode: NODE_ENV,
  isDev: NODE_ENV === "development",
  isProd: NODE_ENV === "production",
};


export const apiUrl = (path: string): string => {
  if (!path) return config.api.baseUrl;
  return new URL(path, config.api.baseUrl).toString();
};

export default config;
