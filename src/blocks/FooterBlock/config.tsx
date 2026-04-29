/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from "react";
import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import Footer, { FooterProps } from "./component.client";
import { buildImageUrl } from "@/lib/defaults";
// helper (put near top of your config file)
function summaryLabel(item: any): string {
  if (!item) return "";
  if (typeof item === "string") return item;
  // common builder shapes
  if (typeof item.label === "string") return item.label;
  if (typeof item.value === "string") return item.value;
  if (item.label?.value) return item.label.value;
  if (item?.fields?.label?.value) return item.fields.label.value;
  if (item?.name) return item.name;
  // fallback to JSON short
  try {
    const s = JSON.stringify(item);
    return s.length > 40 ? s.slice(0, 40) + "…" : s;
  } catch {
    return "Item";
  }
}

export const FooterConfig: Omit<ComponentConfig<FooterProps, FooterProps>, "type"> = {
  fields: {
    logoUrl: { type: "media", mediaType: "image", label: "Logo" },
    tagline: { type: "text", label: "Tagline" },

    contact: {
      type: "object",
      label: "Contact",
      objectFields: {
        email: { type: "text", label: "Email" },
        phone: { type: "text", label: "Phone" },
        supportHours: { type: "text", label: "Support Hours" },
      },
    },

    aditLinks: {
      type: "array",
      label: "Adit Links",
      arrayFields: {
        label: { type: "text" },
        route: { type: "text" },
      },
      getItemSummary: (it) => summaryLabel(it) || "Link",
      max: 20,
    },

    products: {
      type: "array",
      label: "Products Columns",
      arrayFields: {
        title: { type: "text" },
        route: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            route: { type: "text" },
          },
          getItemSummary: (it) => summaryLabel(it) || "Item",
          max: 20,
        },
      },
      getItemSummary: (col) => summaryLabel(col) || "Column",
      max: 6,
    },

    industries: {
      type: "array",
      label: "Industries",
      arrayFields: {
        value: { type: "text" },
      },
      getItemSummary: (v) => summaryLabel(v) || "Industry",
      max: 10,
    },

    enterprise: {
      type: "array",
      label: "Enterprise",
      arrayFields: {
        value: { type: "text" },
      },
      getItemSummary: (v) =>  summaryLabel(v)  || "Enterprise",
      max: 6,
    },

    socials: {
      type: "array",
      label: "Socials",
      arrayFields: {
        href: { type: "text" },
        icon: { type: "text" },
      },
      getItemSummary: (s) =>summaryLabel(s?.href ?? s)|| "Social",
      max: 10,
    },
    isGlobal: {
      type: "text",
      label: "Set as Global",
    },

    globalKey: {
      type: "text",
      label: "Global Component Key",
    },
  },

  label: "Footer",

  defaultProps: {
    logoUrl: buildImageUrl('logo_9fe8b06174.svg'),
    tagline: "The All In One AI-Powered Platform",
    contact: {
      email: "info@adit.com",
      phone: "(832) 225-8865",
      supportHours: "7 AM CST to 7 PM CST",
    },
    aditLinks: [
      { label: "Integrations", route: "/integrations" },
      { label: "Pricing", route: "/pricing" },
      { label: "About Adit", route: "/about-us" },
      { label: "Case Studies", route: "/case-studies" },
      { label: "Reviews", route: "/reviews" },
          { label: "Testimonials", route: "/testimonials" },
    { label: "Video Reel", route: "/video-reel" },
    { label: "Blog", route: "/blog" },
    { label: "Careers", route: "/careers" },
    { label: "Contact", route: "/contact-us" },
    { label: "Refer a Friend", route: "/refer-a-friend" },
    ],
    products: [
      {
        title: "Communications",
        route: "/centralize-comms",
        items: [
          { label: "Adit Voice", route: "/adit-voice" },
          { label: "Patient Texting", route: "/patient-texting" },
        ],
      },
      {
        title: "Operations",
        route: "/streamline-operations",
        items: [
          { label: "Patient Forms", route: "/patient-forms" },
          { label: "Online Scheduling", route: "/online-scheduling" },
        ],
      },
        {
      title: "Production",
        route: "/boost-production",
      items: [
        { label: "Practice Analytics", route: "/testimonials" },
        { label: "Practice Health Score", route: "/video-reel" },
        { label: "Treatment Plans", route: "/blog" },
        { label: "CareCredit", route: "/careers" },
        { label: "Patient Recall", route: "/contact-us" },
        { label: "Adit Pay", route: "/refer-a-friend" },
      ],
    },
    {
      title: "Growth",
      route:"/acquire-more-patients",
      items: [
        { label: "Website Design", route: "/testimonials" },
        { label: "SEO", route: "/video-reel" },
        { label: "Email Marketing", route: "/blog" },
        { label: "Google Ads", route: "/careers" },
        { label: "Meta Ads", route: "/contact-us" },
        { label: "Advanced Reporting", route: "/refer-a-friend" },
      ],
    },
    ],
    industries: ["Dental", "Optometry", "Chiropractic", "Orthodontics"],
    enterprise: ["DSO", "OSO"],
    socials: [
    { href: "https://www.facebook.com/aditadv", icon: "fa-facebook-f" },
    { href: "https://x.com/aditadv", icon: "fa-x-twitter" },
    { href: "https://www.instagram.com/adit_adv/", icon: "fa-instagram" },
    { href: "https://www.linkedin.com/company/dental-software", icon: "fa-linkedin-in" },
    { href: "https://www.youtube.com/channel/UCht4NnnAAZXk6Y6CbpHmOJg", icon: "fa-youtube" },
    ],
    isGlobal: false,
    globalKey: "",
  },

  render: (data) => {
    // The builder passes the block props here — forward to the Footer client component
    return <Footer {...data} />;
  },
};

export default FooterConfig;


