"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as brandIcons from "@fortawesome/free-brands-svg-icons";
import SiteLayout from "@/components/layout/SiteLayout";

// ✅ Add both solid + brand icons to library
const bIcons = Object.values(brandIcons).filter(
  (icon): icon is IconDefinition =>
    typeof icon === "object" && "iconName" in icon && "prefix" in icon
);
const icons = Object.values(solidIcons).filter(
  (icon): icon is IconDefinition =>
    typeof icon === "object" && "iconName" in icon && "prefix" in icon
);
library.add(...icons, ...bIcons);

// ----------------------
// ✅ Type Definitions
// ----------------------
interface ContactCard {
  id: string;
  icon: string;
  label: string;
  value: string;
  ariaLabel: string;
}

interface SocialLink {
  id: number;
  platform: string;
  icon: string;
  link: string;
}

interface ContactPageData {
  title: string;
  subtitle: string;
  form_title_customer: string;
  form_title_general: string;
  sms_disclaimer: string;
  success_message_customer: string;
  success_message_general: string;
  contact_cards?: ContactCard[];
  social_links?: SocialLink[];
}

interface FormData {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  message: string;
  needHelp?: string;
  agree: boolean;
  customerId?: string;
}

export default function ContactUsPage() {
  const [data, setData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    message: "",
    needHelp: "",
    agree: false,
    customerId: "",
  });
useEffect(() => {
    const fetchData = async () => {
      try {
        // 🚫 no browser cache; ✅ uses Next.js revalidation cache
        const res = await fetch("/contact-us/api", {cache: "force-cache" });
        const json = await res.json();
        const item = json?.data?.[0];
        if (item) setData(item);
      } catch (err) {
        console.error("Failed to load contact page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // ✅ Form Handlers
  const handleChange = (key: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Form:", formData);
    alert("Form submitted successfully!");
  };

  // ----------------------
  // ✅ Loading / Error
  // ----------------------
  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!data) return <div className="text-center py-20">No data found.</div>;

  // ----------------------
  // ✅ UI
  // ----------------------
  return (
      <SiteLayout>
    <main className="bg-white">
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-sm text-slate-600">{data.subtitle}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 my-4">
          {data.title}
        </h1>

        {/* ✅ Contact Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.contact_cards?.map((c) => (
            <div
              key={c.id}
              className="bg-white border rounded-xl p-6 shadow-sm text-center"
              role="region"
              aria-label={c.ariaLabel || c.label}
            >
              <div className="text-3xl text-orange-500 mb-4 flex justify-center">
                <FontAwesomeIcon
                  icon={[
                    ["facebook", "instagram", "linkedin", "youtube", "x"].includes(c.icon)
                      ? "fab"
                      : "fas",
                    c.icon as import("@fortawesome/fontawesome-svg-core").IconName,
                  ]}
                />
              </div>

              <div className="text-sm text-slate-600">{c.label}</div>

              {c.label.toLowerCase().includes("social") ? (
                <div className="flex justify-center space-x-4 mt-4">
                  {data.social_links?.map((social) => (
                    <a
                      key={social.id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-slate-800 hover:text-orange-500 transition"
                      aria-label={social.platform}
                    >
                      <FontAwesomeIcon
                        icon={["fab", social.icon as import("@fortawesome/fontawesome-svg-core").IconName,]}
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-xl md:text-2xl font-semibold text-slate-900 mt-3">
                  {c.value}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ✅ Toggle Switch */}
        <div className="mt-10 bg-[#E6F7FF] p-6 rounded-md flex items-center justify-between">
          <div className="text-lg font-medium text-slate-900">
            Are you a current Adit customer?
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm text-slate-700">Yes</label>
            <button
              type="button"
              role="switch"
              aria-checked={isCustomer}
              aria-label="Current Adit customer toggle"
              onClick={() => setIsCustomer((v) => !v)}
              className={`w-14 h-8 rounded-full p-1 transition-colors ${
                isCustomer ?"bg-slate-300": "bg-orange-500"  
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                  isCustomer ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <label className="text-sm text-slate-700">No</label>
          </div>
        </div>

        {/* ✅ Form Section */}
        <div className="mt-12 text-left max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isCustomer
              ? data.form_title_general
              : data.form_title_customer ||
                "Complete the form below & our team will get back to you soon!"}
          </h2>

          {!isCustomer ? (
            // --------------------------------------------------
            // 🔸 Public Contact Form (General Inquiry)
            // --------------------------------------------------
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                  className="border border-orange-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Company Name*"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="border border-orange-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="border border-orange-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone*"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                  className="border border-orange-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="I need help with"
                value={formData.needHelp}
                onChange={(e) => handleChange("needHelp", e.target.value)}
                className="w-full border border-orange-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />

              <textarea
                placeholder="Please tell us about your request"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full border border-orange-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                rows={5}
              ></textarea>

              <div className="flex items-start space-x-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={(e) => handleChange("agree", e.target.checked)}
                  className="mt-1"
                />
                <p>{data.sms_disclaimer}</p>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Submit Message
              </button>
            </form>
          ) : (
            // --------------------------------------------------
            // 🔸 Customer Ticket Form
            // --------------------------------------------------
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
            >
              <input
                type="text"
                placeholder="Your Name*"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email*"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {/* <input
                type="text"
                placeholder="Customer ID (optional)"
                value={formData.customerId}
                onChange={(e) => handleChange("customerId", e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              /> */}
              <textarea
                placeholder="Describe your issue"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                rows={5}
              ></textarea>
              <div className="flex items-start space-x-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={(e) => handleChange("agree", e.target.checked)}
                  className="mt-1"
                />
                <p>{data.sms_disclaimer}</p>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Submit Ticket
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
    </SiteLayout>
  );
}
