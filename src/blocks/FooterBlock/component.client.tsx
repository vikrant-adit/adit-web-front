/* eslint-disable @typescript-eslint/no-explicit-any */
// File: component.client.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Mail, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { useEditorGlow } from '@/hooks/useEditorGlow';

export type FooterProductItem = { label: string; route: string };
export type FooterProduct = {
  title: string;
  route: string;
  items: FooterProductItem[];
};

export type FooterProps = {
  logoUrl?: string;
  tagline?: string;
  contact?: { email?: string; phone?: string; supportHours?: string };
  aditLinks?: {
      [x: string]: string; label: string; route: string 
}[];
  products?: FooterProduct[];
  industries?: string[];
  enterprise?: string[];
  socials?: { href: string; icon: string }[];
  isGlobal?: boolean;
  globalKey?: string;
};
function valueStr(v: any): string {
  if (!v && v !== 0) return "";
  if (typeof v === "string") return v;
  if (typeof v.value === "string") return v.value;
  if (typeof v.label === "string") return v.label;
  if (v.label?.value) return v.label.value;
  if (v?.fields?.label?.value) return v.fields.label.value;
  return String(v);
}

const FooterClient: React.FC<FooterProps> = ({
  logoUrl = "http://localhost:1337/uploads/logo_9fe8b06174.svg",
  tagline = "The All In One AI-Powered Platform",
  contact = {
    email: "info@adit.com",
    phone: "(832) 225-8865",
    supportHours: "7 AM CST to 7 PM CST",
  },
  aditLinks = [],
  products = [],
  industries = ["Dental", "Optometry", "Chiropractic", "Orthodontics"],
  enterprise = ["DSO", "OSO"],
  socials = [],
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);
  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
      <footer className="bg-[#eef8fb] text-[#06263a] text-xs sm:text-sm py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start">
          {/* LEFT SECTION: Logo + Contact */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <Image
                src={logoUrl}
                width={100}
                height={100}
                alt="Adit Logo"
                className="w-36"
                loading="lazy"
                unoptimized
              />
              <p className="text-[0.95rem] text-slate-600 mt-3">{tagline}</p>
            </div>

            {/* CONTACT BOX */}
            <div className="grid grid-cols-3 items-center bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-4 text-center border-r border-slate-100">
                <Mail className="text-orange-500 mx-auto" />
                <p className="text-xs text-slate-600 mt-2">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="block text-blue-600"
                >
                  {contact.email}
                </a>
              </div>
              <div className="p-4 text-center border-r border-slate-100">
                <Clock className="text-orange-500 mx-auto" />
                <p className="text-xs text-slate-600 mt-2">Support Hours</p>
                <p className="text-xs font-semibold">{contact.supportHours}</p>
              </div>
              <div className="p-4 text-center">
                <Phone className="text-orange-500 mx-auto" />
                <p className="text-xs text-slate-600 mt-2">Call</p>
                <p className="text-xs font-semibold">{contact.phone}</p>
              </div>
            </div>

            {/* DOWNLOAD BUTTONS */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Download our App on</h4>

              <div className="flex gap-3 items-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-orange-500 text-white px-5 py-3 rounded-full shadow hover:bg-orange-600 transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12c0-4 3-6 8-6s8 2 8 6-3 6-8 6S4 16 4 12z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-semibold">Google Play</span>
                </a>

                <a
                  href="#"
                  className="inline-flex items-center gap-3 border border-orange-400 text-orange-600 px-5 py-3 rounded-full hover:bg-orange-50 transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 3c-1.6 0-3 1.3-3 3 0 1.5 1.2 3 3 3s3-1.5 3-3c0-1.7-1.4-3-3-3z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-semibold">App Store</span>
                </a>
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION */}
          <div className="md:col-span-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-[#0890d2] font-semibold mb-3">Adit</h4>
                <ul className="space-y-2">
                  {aditLinks.map((item, i) => {
                    const label = valueStr(item);
                    const route =
                      (item && (item.route ?? item.value ?? item.url)) || "#";
                    return (
                      <li key={route || i}>
                        <Link
                          href={route}
                          className="cursor-pointer text-slate-700 hover:text-[#0890d2]"
                        >
                          {label || "Link"}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h4 className="text-[#0890d2] font-semibold mb-3">
                  Industries
                </h4>
                <ul className="space-y-2">
                  {industries.map((it, idx) => (
                    <li
                      key={it ?? idx}
                      className="cursor-pointer text-slate-700 hover:text-[#0890d2]"
                    >
                      {it}
                    </li>
                  ))}
                  <li className="mt-3">
                    <h4 className="text-[#0890d2] font-semibold mb-3">
                      Enterprise
                    </h4>
                    <ul className="mt-2 space-y-1 text-slate-700">
                      {enterprise.map((e, idx) => (
                        <li
                          key={e ?? idx}
                          className="cursor-pointer hover:text-[#0890d2]"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: PRODUCTS */}
          <div className="md:col-span-4">
            <h1 className="text-[#0890d2] font-semibold mb-3">Products</h1>
            <div className="grid grid-cols-2 gap-6">
              {products.map((col, idx) => (
                <div key={col.route ?? `${col.title}-${idx}`}>
                  <Link href={col.route}>
                    <h4 className="text-[black] cursor-pointer font-semibold mb-3">
                      {col.title}
                    </h4>
                  </Link>
                  <ul className="space-y-2">
                    {col.items.map((it, i) => (
                      <li key={it.route ?? `${it.label}-${i}`}>
                        <Link
                          href={it.route}
                          className="text-slate-700 hover:text-[#0890d2]"
                        >
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="text-slate-700">
            © {new Date().getFullYear()} Adit. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-700">
            {[
              "Terms of Use",
              "Privacy Policy",
              "Cookie Policy",
              "Return Policy",
            ].map((item, i) => (
              <React.Fragment key={item + i}>
                {i > 0 && <span className="opacity-40">|</span>}
                <Link href="/" className="hover:text-[#0890d2]">
                  {item}
                </Link>
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s, idx) => (
              <a
                key={s.href ?? idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="bg-[#f57c00] text-white w-7 h-7 flex items-center justify-center rounded-full text-[0.8rem] hover:bg-[#25A8E0] transition"
              >
                <i className={`fa-brands ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default FooterClient;
