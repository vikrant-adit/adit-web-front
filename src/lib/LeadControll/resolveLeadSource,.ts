import type { LeadSourceConfig } from "./leadSourceConfig";

export function resolveLeadSource(params: {
  utm_source?: string | null;
  referrer?: string | null;
  config: LeadSourceConfig;
}) {
  const { utm_source, referrer, config } = params;

  // 1) UTM source mapping
  const utmKey = (utm_source || "").trim().toLowerCase();
  if (utmKey && config?.utm_source_map?.[utmKey]) {
    return config.utm_source_map[utmKey];
  }

  // 2) Referrer domain mapping
if (referrer) {
  try {
    const host = new URL(referrer)
      .hostname
      .replace("www.", "")
      .toLowerCase();

    if (config?.domain_map?.[host]) {
      return config.domain_map[host];
    }

    // optional: clutch special case
    if (host.includes("clutch.co")) {
      return "Online Referral";
    }
  } catch (e) {
    console.warn("Invalid referrer URL:", referrer, e);
  }
}

  // 3) Default
  return config?.default_source || "Website";
}
