/* eslint-disable @next/next/no-html-link-for-pages */
'use client';
import React, { useState } from "react";
import Counter from "@/components/common/CounterAnimation";
import SiteLayout from "@/components/layout/SiteLayout";
import { getStrapiApiUrl, getStrapiAuthToken } from "@/lib/defaults";

export default function ScheduleDemo() {
  const [form, setForm] = useState({
    practiceName: "",
    firstName: "",
    lastName: "",
    designation: "",
    workEmail: "",
    officePhone: "",
    pms: "",
    bestTime: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const stats = [
    { value: "5",unit:'K+', label: "Practices choose Adit" },
    { value: "20",unit:'K+', label: "Active users on Adit" },
    { value: "2.4",unit:"M+", label: "Calls handled every month" },
    { value: "200",unit:'K+', label: "Confirmed monthly appointments" },
    { value: "15",unit:'K+', label: "Appointments scheduled online every month" },
    { value: "60",secondaryUnit:'Up to',unit:'%', label: "Savings on software costs" },
  ];

  const pmsOptions = [
    "AbelDent",
    "ClearDent",
    "Curve",
    "Denticon",
    "Dentrix",
    "Dentrix Ascend",
    "Eaglesoft",
    "Open Dental",
    "Other",
  ];
   const bestTimeToCall = [
    "Best time to call",
    "Call Now(AI)",
    "Morning(8-12)",
    "Afternoon(12-4)",
    "Evening(4-7)"
  ];
const handlePhoneChange = (value: string) => {
  // Remove all non-digit characters
  const digits = value.replaceAll(/\D/g, "");

  // Limit to max 10 digits
  const limited = digits.slice(0, 10);

  // Format as (XXX) XXX-XXXX
  let formatted = "";
  if (limited.length > 0) {
    formatted += "(" + limited.substring(0, Math.min(3, limited.length));
  }
  if (limited.length >= 4) {
    formatted += ") " + limited.substring(3, Math.min(6, limited.length));
  }
  if (limited.length >= 7) {
    formatted += "-" + limited.substring(6, 10);
  }

  return formatted;
};

  const handleChange = (key: string, value: string | boolean) =>
    setForm((s) => ({ ...s, [key]: value }));

  const validatePhone = (phone: string) => {
    // Matches format like (114) 144-1421
    const regex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    return regex.test(phone);
  };
const submitScheduleDemo = async (payload: typeof form) => {
  const res = await fetch(
 `${getStrapiApiUrl()}/schedule-a-demo-form`,
{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getStrapiAuthToken()}`,
  },
  body: JSON.stringify({ data: payload}),
}
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to submit form");
  }

  return res.json();
};

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!form.workEmail || !form.officePhone || !form.practiceName) return;

  if (validatePhone(form.officePhone)) {
    setPhoneError("");
  } else {
    setPhoneError("Phone number must be in format (XXX) XXX-XXXX");
    return;
  }

  setSubmitting(true);

  try {
    const payload = {
      practiceName: form.practiceName,
      firstName: form.firstName,
      lastName: form.lastName,
      designation: form.designation,
      workEmail: form.workEmail,
      officePhone: form.officePhone,
      pms: form.pms,
      bestTime: form.bestTime,
    };

    await submitScheduleDemo(payload);

    alert("Request submitted — we'll reach out to schedule a demo.");

    setForm({
      practiceName: "",
      firstName: "",
      lastName: "",
      designation: "",
      workEmail: "",
      officePhone: "",
      pms: "",
      bestTime: "",
      // agree: false,
    });
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again later.");
  } finally {
    setSubmitting(false);
  }
};


  return (
 <SiteLayout>
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Heading + stats */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Ready to boost your revenue?
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl">
              Because your patients deserve the best! Book a 30-minute demo to
              explore how our platform can streamline operations, attract new
              patients, and boost your revenue.
            </p>

            <div className="mt-6 bg-white text-center rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-1 text-center sm:grid-cols-3 gap-y-6 gap-x-8">
                {stats.map((s, idx) => (
                  <div
                    key={s.label}
                    className={`flex flex-col text-center items-center ${
                      idx % 3 === 2 ? "" : "sm:border-r sm:pr-6"
                    }`}
                  >
                    <span className="text-3xl md:text-4xl font-extrabold text-orange-500">
                    
                   <p className="text-xl">{s.secondaryUnit} </p> <Counter value={Number(s.value)} duration={800} />{s.unit}
                    </span>
                    <span className="mt-0 text-sm text-slate-600 text-center">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-6">
                *Results may vary based on individual factors.
              </p>
            </div>
          </div>

          {/* Right: Form card */}
          <aside>
            <form
              onSubmit={handleSubmit}
              className="bg-[rgba(235,249,253,0.95)] rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200"
            >
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm text-slate-600">
                    Practice name *
                  </span>
                  <input
                    type="text"
                    value={form.practiceName}
                    onChange={(e) =>
                      handleChange("practiceName", e.target.value)
                    }
                    className="mt-0 w-full bg-transparent border-b border-slate-300 py-0 px-1 focus:outline-none"
                    required
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <label className="block">
    <span className="text-sm text-slate-600 block mb-1">First name*</span>
    <input
      type="text"
      value={form.firstName}
      onChange={(e) => handleChange("firstName", e.target.value)}
      className="w-full bg-transparent placeholder:text-slate-400 border-b border-slate-300 py-3 px-1 focus:outline-none"
      placeholder="First name"
    />
  </label>

  <label className="block">
    <span className="text-sm text-slate-600 block mb-1">Last name*</span>
    <input
      type="text"
      value={form.lastName}
      onChange={(e) => handleChange("lastName", e.target.value)}
      className="w-full bg-transparent placeholder:text-slate-400 border-b border-slate-300 py-3 px-1 focus:outline-none"
      placeholder="Last name"
    />
  </label>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <label className="block">
    <span className="text-sm text-slate-600 block mb-1">Designation</span>
    <input
      type="text"
      value={form.designation}
      onChange={(e) => handleChange("designation", e.target.value)}
      className="w-full bg-transparent placeholder:text-slate-400 border-b border-slate-300 py-3 px-1 focus:outline-none"
      placeholder="Designation"
    />
  </label>

  <label className="block">
    <span className="text-sm text-slate-600 block mb-1">Work Email*</span>
    <input
      type="email"
      value={form.workEmail}
      onChange={(e) => handleChange("workEmail", e.target.value)}
      className="w-full bg-transparent placeholder:text-slate-400 border-b border-slate-300 py-3 px-1 focus:outline-none"
      placeholder="you@company.com"
      required
    />
  </label>
</div>

<label className="block">
  <span className="text-sm text-slate-600 block mb-1">
    Office phone* 
  </span>
  <input
    type="tel"
    value={form.officePhone}
    onChange={(e) =>
      handleChange("officePhone", handlePhoneChange(e.target.value))
    }
    className={`w-full bg-transparent placeholder:text-slate-400 border-b py-3 px-1 focus:outline-none ${
      phoneError ? "border-red-500" : "border-slate-300"
    }`}
    placeholder="(123) 456-7890"
    required
  />
  {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
</label>

<label className="block">
  <span className="text-sm text-slate-600 block mb-1">Please select current PMS</span>
  <div className="relative">
    <select
      value={form.pms}
      onChange={(e) => handleChange("pms", e.target.value)}
      className="appearance-none w-full bg-transparent py-3 px-1 border-b border-slate-300 focus:outline-none"
    >
      <option value="">Select PMS</option>
      {pmsOptions.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    {/* dropdown arrow */}
    <div className="pointer-events-none absolute right-0 top-3 mr-2 text-slate-400">
      ▾
    </div>
  </div>
</label>
<label className="block">
  <span className="text-sm text-slate-600 block mb-1">Best time to contact you to schedule a demo*</span>
  <div className="relative">
    <select
      value={form.bestTime}
      onChange={(e) => handleChange("bestTime", e.target.value)}
      className="appearance-none w-full bg-transparent py-3 px-1 border-b border-slate-300 focus:outline-none"
    >
      <option value="">Schedule a time</option>
      {bestTimeToCall.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    {/* dropdown arrow */}
    <div className="pointer-events-none absolute right-0 top-3 mr-2 text-slate-400">
      ▾
    </div>
  </div>
</label>
{/* <div>
  <div className="text-sm text-slate-700 font-semibold mb-2">Callback preference*</div>
  <div className="flex flex-col gap-2">
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="bestCallback"
        value="instant"
        checked={form.bestTime === "instant" || form.bestTime === "Instant" ? true : form.bestTime === "instant"}
        onChange={() => handleChange("bestTime", "instant")}
        className="w-4 h-4 text-orange-500 border-slate-400"
      />
      <span className="text-sm text-slate-700">Instant AI Callback</span>
    </label>

    <label className="inline-flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="bestCallback"
        value="human"
        checked={form.bestTime === "human" || form.bestTime === "Human" ? true : form.bestTime === "human"}
        onChange={() => handleChange("bestTime", "human")}
        className="w-4 h-4 text-orange-500 border-slate-400"
      />
      <span className="text-sm text-slate-700">Book Human Callback</span>
    </label>
  </div>
</div> */}

<label className="flex items-start gap-3 text-sm text-slate-700">
  <input
    type="checkbox"
    // checked={form.agree}
    onChange={(e) => handleChange("agree", e.target.checked)}
    className="peer sr-only"
    required
  />
  <span
    className="w-5 h-5 inline-block rounded-sm border-2 border-slate-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex-shrink-0"
    aria-hidden="true"
  />
  <span>
    By submitting this form, you agree to Adit&apos;s{' '}
    <a className="text-sky-600 underline" href="/privacy-policy">terms of service and privacy policy</a>{' '}
    and to receive email and phone calls. You can unsubscribe or opt out at any time.
  </span>
</label>

{/* reCAPTCHA placeholder - replace with actual reCAPTCHA widget */}
{/* <div className="mt-2">
  <div className="w-full rounded-md border border-slate-200 bg-white p-3 flex items-center gap-3">
    <div className="min-w-[112px] min-h-[44px] bg-slate-100 rounded-sm flex items-center justify-center text-xs text-slate-400">
      reCAPTCHA
    </div>
    <div className="text-sm text-slate-600">protected by reCAPTCHA — Privacy - Terms</div>
  </div>
</div> */}

<button
  type="submit"
  disabled={
    submitting ||
    // !form.agree ||
    !form.practiceName ||
    !form.workEmail ||
    !form.officePhone
  }
  className="mt-4 w-full bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full text-lg shadow-xl transition-all"
>
  {submitting ? "Scheduling..." : "Schedule A Demo"}
</button>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </main>
    </SiteLayout>
  );
}
