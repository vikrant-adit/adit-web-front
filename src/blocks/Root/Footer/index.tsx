"use client";
import React from "react";
import Link from "next/link";
import { Mail, Clock, Phone } from "lucide-react";
import Image from "next/image";

/**
 * Props definition for page builder (can come from Strapi template.json)
 */
interface FooterProps {
  logoUrl?: string;
  tagline?: string;
  contact?: {
    email?: string;
    phone?: string;
    supportHours?: string;
  };
  aditLinks?: { label: string; route: string }[];
  products?: {
    title: string;
    route: string;
    items: { label: string; route: string }[];
  }[];
  industries?: string[];
  enterprise?: string[];
  socials?: { href: string; icon: string }[];
}

const Footer: React.FC<FooterProps> = ({
  logoUrl = "http://localhost:1337/uploads/logo_9fe8b06174.svg",
  tagline = "The All In One AI-Powered Platform",
  contact = {
    email: "info@adit.com",
    phone: "(832) 225-8865",
    supportHours: "7 AM CST to 7 PM CST",
  },
  aditLinks = [
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
products = [
    {
      title: "Communications",
      route: "/centralize-comms",
      items: [
        { label: "Adit Voice", route: "/adit-voice" },
        { label: "Patient Texting", route: "/video-reel" },
        { label: "Email Campaigns", route: "/blog" },
        { label: "Call Tracking", route: "/careers" },
        { label: "Internal Chat", route: "/contact-us" },
        { label: "eFax", route: "/refer-a-friend" },
      ],
    },
    {
      title: "Operations",
      route: "/streamline-operations",
      items: [
        { label: "Patient Forms", route: "/testimonials" },
        { label: "Insurance Verifications", route: "/video-reel" },
        { label: "Online Scheduling", route: "/blog" },
        { label: "Pozative Reviews", route: "/careers" },
        { label: "Reminders", route: "/contact-us" },
        { label: "Mobile App", route: "/refer-a-friend" },
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
  industries = ["Dental", "Optometry", "Chiropractic", "Orthodontics"],
  enterprise = ["DSO", "OSO"],
  socials = [
    { href: "https://www.facebook.com/aditadv", icon: "fa-facebook-f" },
    { href: "https://x.com/aditadv", icon: "fa-x-twitter" },
    { href: "https://www.instagram.com/adit_adv/", icon: "fa-instagram" },
    { href: "https://www.linkedin.com/company/dental-software", icon: "fa-linkedin-in" },
    { href: "https://www.youtube.com/channel/UCht4NnnAAZXk6Y6CbpHmOJg", icon: "fa-youtube" },
  ],
}) => {
  return (
    <footer className="bg-[#eef8fb] text-[#06263a] text-sm py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
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
                  {aditLinks.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.route}
                        className="cursor-pointer text-slate-700 hover:text-[#0890d2]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[#0890d2] font-semibold mb-3">Industries</h4>
                <ul className="space-y-2">
                  {industries.map((it, idx) => (
                    <li
                      key={idx}
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
                          key={idx}
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
                <div key={idx}>
                  <Link href={col.route}>
                    <h4 className="text-[black] cursor-pointer font-semibold mb-3">
                      {col.title}
                    </h4>
                  </Link>
                  <ul className="space-y-2">
                    {col.items.map((it, i) => (
                      <li key={i}>
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
            {["Terms of Use", "Privacy Policy", "Cookie Policy", "Return Policy"].map((item, i) => (
              <React.Fragment key={i}>
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
                key={idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="bg-[#f57c00] text-white w-7 h-7 flex items-center justify-center rounded-full text-[0.8rem] hover:bg-[#25A8E0] transition"
              >
                <i className={`fa-brands ${s.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
