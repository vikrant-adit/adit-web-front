export type LeadSourceConfig = {
  utm_source_map?: Record<string, string>;
  domain_map?: Record<string, string>;
  default_source?: string;
};

export type TrackLeadSourceInput = {
  trfcsrc?: string;
  forcedSource?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

// -----------------------------
// Helpers
// -----------------------------
function norm(v?: string) {
  return (v || "").trim();
}

function lower(v?: string) {
  return norm(v).toLowerCase();
}

function isPaidMedium(utmmedium: string) {
  return utmmedium === "cpc" || utmmedium === "ppc";
}

// -----------------------------
// Static Mapping (replaces huge if-else)
// -----------------------------
const SOURCE_MAP: Record<string, string> = {
  yahoo_paid: "Bing Ads",
  bing_paid: "Bing Ads",
  "bing ads": "Bing Ads",
  "yahoo ads": "Bing Ads",

  twitter_paid: "Twitter Ads",
  twitter_organic: "Twitter Organic",

  google_paid: "Google Ads",
  "google ads": "Google Ads",

  facebook_paid: "Facebook Ads",
  "facebook ads": "Facebook Ads",
  resellerfacebook: "Facebook",

  linkedin: "Linkedin Ads",
  linkedin_paid: "Linkedin Ads",
  "linkedin ads": "Linkedin Ads",

  instagram_paid: "Instagram",
  "instagram ads": "Instagram",

  quora_paid: "Quora Ads",
  "quora ads": "Quora Ads",

  capterra_paid: "Capterra Ads",
  capterra: "Capterra Ads",

  eventz: "Eventz",
  kol: "KOL",
  reseller: "Reseller",

  "sdr-team": "SDR Team",
  sdr: "SDR Team",

  "pms-team": "PMS Team",
  pms: "PMS Team",

  "sdr-email": "Email Marketing",
  "pms-email": "Email Marketing",

  "trublu": "Reseller",
  "trublu-email": "Email Marketing + Reseller",

  "email": "Email Marketing",
  "email campaign": "Email Marketing",
  "email_campaign": "Email Marketing",

  "softwarepundit.com": "Software Pundit",
};

// -----------------------------
// Step 1: Resolve Traffic Source
// -----------------------------
function resolveTrafficSource(
  trfcsrc: string,
  trrsc: string,
  utmmedium: string,
  utm_campaign: string
) {
  // Forced source takes priority
  if (trrsc) {
    if (trrsc === "email" && isPaidMedium(utmmedium)) {
      return trfcsrc; // paid wins
    }
    return trrsc;
  }

  // SSR safe check
  if (typeof globalThis === "undefined") return trfcsrc;

  const ispaidsrc = globalThis?.localStorage?.getItem("ispaidsrc");

  if (!ispaidsrc) return trfcsrc;

  if (ispaidsrc !== "email") return ispaidsrc;

  if (utmmedium || utm_campaign) return ispaidsrc;

  return trfcsrc;
}

// -----------------------------
// Step 2: Resolve Lead Source
// -----------------------------
function resolveLeadSource(
  trfcsrc: string,
  utmmedium: string,
  utm_campaign: string,
  cfg?: LeadSourceConfig
) {
  const key = lower(trfcsrc);

  // Config override (Strapi)
  const cfgMapped = cfg?.utm_source_map?.[key];
  if (cfgMapped) return cfgMapped;

  // Direct mapping
  if (SOURCE_MAP[key]) return SOURCE_MAP[key];

  // Conditional mappings using an array to reduce complexity
  const conditionalMappings = [
    {
      condition: (k: string) => k.includes("google"),
      source: (m: string) => isPaidMedium(m) ? "Google Ads" : "Google Organic",
    },
    {
      condition: (k: string) => k.includes("facebook"),
      source: (m: string) => isPaidMedium(m) ? "Facebook Ads" : "Facebook Organic",
    },
    {
      condition: (k: string) => k.includes("linkedin"),
      source: (m: string) => isPaidMedium(m) ? "Linkedin Ads" : "Linkedin Organic",
    },
    {
      condition: (k: string) => k.includes("instagram"),
      source: (m: string) => isPaidMedium(m) ? "Instagram" : "Instagram Organic",
    },
    {
      condition: (k: string) => k.includes("quora"),
      source: (m: string) => isPaidMedium(m) ? "Quora Ads" : "Quora Organic",
    },
    {
      condition: (k: string) => k === "youtube.com",
      source: () => "Youtube Organic",
    },
    {
      condition: (k: string) => k === "capterra.com",
      source: (m: string) => isPaidMedium(m) ? "Capterra Ads" : "Capterra Organic",
    },
    {
      condition: (k: string) => k === "gmb",
      source: (m: string) => isPaidMedium(m) ? "Google Ads" : "Google Organic",
    },
    {
      condition: (k: string) => k === "direct",
      source: (m: string, c: string) => m || c ? "Online Referral" : "Website",
    },
    {
      condition: (k: string) => !k,
      source: () => "Website",
    },
  ];

  for (const mapping of conditionalMappings) {
    if (mapping.condition(key)) {
      return mapping.source(utmmedium, utm_campaign);
    }
  }

  return "Online Referral";
}

// -----------------------------
// Main Function (CLEAN)
// -----------------------------
export function trackLeadSourceTS(
  input: TrackLeadSourceInput,
  cfg?: LeadSourceConfig
) {
  let trfcsrc = norm(input.trfcsrc);
  const trrsc = norm(input.forcedSource);
  const utmmedium = lower(input.utm_medium);
  const utm_campaign = norm(input.utm_campaign);

  // Step 1: resolve traffic source
  trfcsrc = resolveTrafficSource(
    trfcsrc,
    trrsc,
    utmmedium,
    utm_campaign
  );

  // Normalize edge cases
  if (!trfcsrc || trfcsrc === "direct" || trfcsrc === "adit.com") {
    trfcsrc = trrsc;
  }

  // Step 2: resolve lead source
  const leadsrc =
    resolveLeadSource(trfcsrc, utmmedium, utm_campaign, cfg) ||
    cfg?.default_source ||
    "Website";

  return { trfcsrc, leadsrc };
}