/* eslint-disable @typescript-eslint/no-explicit-any */

export type LeadSourceConfig = {
  utm_source_map?: Record<string, string>;
  domain_map?: Record<string, string>;
  default_source?: string;
};

export type TrackLeadSourceInput = {
  trfcsrc?: string; // incoming source (utm_source or detected source)
  forcedSource?: string; // same as $("#check_for_fb_rsrc").val()
  utm_medium?: string; // $("#adit_utm_medium").val()
  utm_campaign?: string; // $("#adit_utm_campaign").val()
};

function norm(v?: string) {
  return (v || "").trim();
}

function lower(v?: string) {
  return norm(v).toLowerCase();
}

function isPaidMedium(utmmedium: string) {
  return utmmedium === "cpc" || utmmedium === "ppc";
}

/**
 * ✅ Exact match of Adit's trackLeadSource(trfcsrc)
 * Returns leadsrc + final trfcsrc
 */
export function trackLeadSourceTS(
  input: TrackLeadSourceInput,
  cfg?: LeadSourceConfig
) {
  let trfcsrc = norm(input.trfcsrc);
  const trrsc = norm(input.forcedSource);
  const utmmedium = lower(input.utm_medium);
  const utm_campaign = norm(input.utm_campaign);

  let leadsrc = cfg?.default_source || "Website";

  // -----------------------------
  // STEP 1: resolve final trfcsrc
  // -----------------------------
  if (trrsc === "") {
    const ispaidsrc =
      typeof window !== "undefined"
        ? localStorage.getItem("ispaidsrc")
        : null;

    if (ispaidsrc) {
      if (ispaidsrc !== "email") {
        trfcsrc = ispaidsrc;
      } else {
        // email only counts if utm_medium or utm_campaign exists
        if (ispaidsrc === "email" && utmmedium !== "") trfcsrc = ispaidsrc;
        if (ispaidsrc === "email" && utm_campaign !== "") trfcsrc = ispaidsrc;
      }
    }
  } else {
    if (trrsc === "email") {
      if (isPaidMedium(utmmedium)) {
        // keep original trfcsrc (paid wins)
        trfcsrc = trfcsrc;
      } else {
        trfcsrc = trrsc;
      }
    } else {
      trfcsrc = trrsc;
    }
  }

  if (trfcsrc === "" || trfcsrc === "direct" || trfcsrc === "adit.com") {
    trfcsrc = trrsc;
  }

  // -----------------------------
  // STEP 2: mapping trfcsrc -> leadsrc
  // -----------------------------

  // Optional: allow Strapi override mapping first
  const cfgKey = lower(trfcsrc);
  const cfgMapped = cfg?.utm_source_map?.[cfgKey];
  if (cfgMapped) {
    return { trfcsrc, leadsrc: cfgMapped };
  }

  // ⚡ Adit mappings (exact)
  if (
    trfcsrc === "yahoo_paid" ||
    trfcsrc === "bing_paid" ||
    trfcsrc === "bing ads" ||
    trfcsrc === "yahoo ads"
  ) {
    leadsrc = "Bing Ads";
  } else if (
    trfcsrc === "yahoo_organic" ||
    trfcsrc === "yahoo_local" ||
    trfcsrc === "bing_local" ||
    trfcsrc === "bing_organic"
  ) {
    leadsrc = isPaidMedium(utmmedium) ? "Bing Ads" : "Bing Organic";
  } else if (trfcsrc === "twitter_organic") {
    leadsrc = isPaidMedium(utmmedium) ? "Twitter Ads" : "Twitter Organic";
  } else if (trfcsrc === "eventz") {
    leadsrc = "Eventz";
  } else if (trfcsrc === "kol") {
    leadsrc = "KOL";
  } else if (trfcsrc === "reseller") {
    leadsrc = "Reseller";
  } else if (trfcsrc === "twitter_paid") {
    leadsrc = "Twitter Ads";
  } else if (trfcsrc === "google_paid" || trfcsrc === "google ads") {
    leadsrc = "Google Ads";
  } else if (trfcsrc === "facebook_paid" || trfcsrc === "facebook ads") {
    leadsrc = "Facebook Ads";
  } else if (trfcsrc === "resellerfacebook") {
    leadsrc = "Facebook";
  } else if (
    trfcsrc === "linkedin" ||
    trfcsrc === "linkedin_paid" ||
    trfcsrc === "linked in ads" ||
    trfcsrc === "linkedin Ads"
  ) {
    leadsrc = "Linkedin Ads";
  } else if (trfcsrc === "linkedin.com" || trfcsrc === "linkedin_organic") {
    leadsrc = isPaidMedium(utmmedium) ? "Linkedin Ads" : "Linkedin Organic";
  } else if (trfcsrc === "instagram_paid" || trfcsrc === "instagram ads") {
    leadsrc = "Instagram";
  } else if (
    trfcsrc === "instagram.com" ||
    trfcsrc === "instagram" ||
    trfcsrc === "instagram_organic"
  ) {
    leadsrc = isPaidMedium(utmmedium) ? "Instagram" : "Instagram Organic";
  } else if (trfcsrc === "google_organic") {
    leadsrc = isPaidMedium(utmmedium) ? "Google Ads" : "Google Organic";
  } else if (trfcsrc === "facebook_organic" || trfcsrc === "facebook") {
    leadsrc = isPaidMedium(utmmedium) ? "Facebook Ads" : "Facebook Organic";
  } else if (trfcsrc === "trublu" || trfcsrc === "TruBlu") {
    leadsrc = "Reseller";
  } else if (
    trfcsrc === "sdr-team" ||
    trfcsrc === "SDR" ||
    trfcsrc === "sdr"
  ) {
    leadsrc = "SDR Team";
  } else if (trfcsrc === "sdr-email") {
    leadsrc = "Email Marketing";
  } else if (
    trfcsrc === "pms-team" ||
    trfcsrc === "PMS" ||
    trfcsrc === "pms"
  ) {
    leadsrc = "PMS Team";
  } else if (trfcsrc === "pms-email" || trfcsrc === "pms-email") {
    leadsrc = "Email Marketing";
  } else if (
    trfcsrc === "isr-team" ||
    trfcsrc === "ISR" ||
    trfcsrc === "isr" ||
    trfcsrc === "Inbound-ISR" ||
    trfcsrc === "inbound-isr" ||
    trfcsrc === "emailISR" ||
    trfcsrc === "emailisr"
  ) {
    leadsrc = "Email Marketing";
  } else if (trfcsrc === "trublu-email" || trfcsrc === "TruBlu-Email") {
    leadsrc = "Email Marketing + Reseller";
  } else if (
    trfcsrc === "quora_paid" ||
    trfcsrc === "Quora Ads" ||
    trfcsrc === "quora ads"
  ) {
    leadsrc = "Quora Ads";
  } else if (trfcsrc === "quora.com") {
    leadsrc = isPaidMedium(utmmedium) ? "Quora Ads" : "Quora Organic";
  } else if (trfcsrc === "youtube.com") {
    leadsrc = "Youtube Organic";
  } else if (trfcsrc === "capterra.com") {
    leadsrc = isPaidMedium(utmmedium) ? "Capterra Ads" : "Capterra Organic";
  } else if (trfcsrc === "capterra" || trfcsrc === "capterra_paid") {
    leadsrc = "Capterra Ads";
  } else if (trfcsrc === "GMB" || trfcsrc === "gmb") {
    leadsrc = isPaidMedium(utmmedium) ? "Google Ads" : "Google Organic";
  } else if (trfcsrc === "softwarepundit.com") {
    leadsrc = "Software Pundit";
  } else if (
    trfcsrc === "email campaign" ||
    trfcsrc === "email_campaign" ||
    trfcsrc === "email"
  ) {
    leadsrc = "Email Marketing";
  } else if (trfcsrc === "direct") {
    const fbsrc = trrsc;

    if (fbsrc) {
      if (fbsrc === "email" && utmmedium !== "") {
        leadsrc = "Email Marketing";
      } else if (fbsrc === "email" && utm_campaign !== "") {
        leadsrc = "Email Marketing";
      } else if (utmmedium !== "" || utm_campaign !== "") {
        leadsrc = fbsrc;
      } else {
        leadsrc = "Online Referral";
      }
    } else {
      leadsrc = "Website";
    }
  } else if (trfcsrc === "") {
    leadsrc = "Website";
  } else {
    leadsrc = "Online Referral";
  }

  return { trfcsrc, leadsrc };
}
