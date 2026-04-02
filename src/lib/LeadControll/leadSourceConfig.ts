/* eslint-disable @typescript-eslint/no-explicit-any */

export type LeadSourceConfig = {
  utm_source_map?: Record<string, string>;
  domain_map?: Record<string, string>;
  default_source?: string;
};

const LS_KEY = "adit_lead_source_config";
const LS_UPDATED_AT_KEY = "adit_lead_source_config_updated_at";

// cache for 24 hours
const CACHE_MS = 24 * 60 * 60 * 1000;

export async function fetchLeadSourceConfig(): Promise<LeadSourceConfig | null> {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API}lead-source-mapping`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_AUTH_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const json = await res.json();

    const cfg: any =
  json?.data?.attributes ||
  json?.data ||
  json ||
  null;

// ✅ FIX: if Strapi returns array, take first item
const normalized = Array.isArray(cfg) ? cfg[0] : cfg;

return normalized;

  } catch (err) {
    console.error("❌ fetchLeadSourceConfig error:", err);
    return null;
  }
}

export async function getLeadSourceConfigCached(): Promise<LeadSourceConfig> {
  // 1) try localStorage cache
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(LS_KEY);
    const cachedAt = localStorage.getItem(LS_UPDATED_AT_KEY);

    if (cached && cachedAt) {
      const age = Date.now() - Number(cachedAt);
      if (age < CACHE_MS) {
        return JSON.parse(cached);
      }
    }
  }

  // 2) fetch from Strapi
  const fresh = await fetchLeadSourceConfig();

  // 3) fallback if no config
  const finalCfg: LeadSourceConfig = fresh || {
    utm_source_map: {},
    domain_map: {},
    default_source: "Website",
  };

  // 4) save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(LS_KEY, JSON.stringify(finalCfg));
    localStorage.setItem(LS_UPDATED_AT_KEY, String(Date.now()));
  }

  return finalCfg;
}
