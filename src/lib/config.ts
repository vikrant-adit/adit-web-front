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

const config: AppConfig = {
  api: {
    // Change this default to whatever your local API runs on
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://adit.com/api/v1/",
  },
  localApi: {
    baseUrl:process.env.STRAPI_API ??"http://localhost:1337/api/",
    token: '308642958debddf8a365f6b6b774bb29c67d6f8d02fba571f689c02e3121dec7884c14b2ef695f20355b61cf5fb58ecbc8df13a10bb1b210d67cb50f43c44ac8df7bdf7060ea387471e34851b1da255a47665be6d87858a32b56182ae4a0ded1e814660b8768eddb49d69653658b2780bfcd548a23cc4fd8b1054af907fa6e14',
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
