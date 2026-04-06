/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import GlobalPromo from '@/blocks/GlobalPromo/component.client';
import React, { useEffect, useState } from 'react';
import { getStrapiApiUrl, getEnvVar } from '@/lib/defaults';

type FormState = {
  practiceName: string;
  yourName: string;
  role: string;
  email: string;
  phone: string;
  currentPMS: string;
  callbackPreference: 'instant' | 'human' | '';
  notes: string;
  optInSms: boolean;
};

export default function SignupCustomerForm({ onClose, initial = {} as Partial<FormState> }: {
  onClose?: () => void;
  initial?: Partial<FormState>;
}) {
  const [form, setForm] = useState<FormState>({
    practiceName: initial.practiceName || '',
    yourName: initial.yourName || '',
    role: initial.role || '',
    email: initial.email || '',
    phone: initial.phone || '',
    currentPMS: initial.currentPMS || '',
    callbackPreference: (initial.callbackPreference as any) || '',
    notes: initial.notes || '',
    optInSms: initial.optInSms || false,
  });
  const apiUrl = getStrapiApiUrl();
  const [promos, setPromos] = useState<any[]>([]);
  const [loadingPromo, setLoadingPromo] = useState(true);

  useEffect(() => {
    if (!apiUrl) {
      console.warn("STRAPI_API is not set; skipping promos fetch");
      setLoadingPromo(false);
      return;
    }
    let mounted = true;

    const fetchPromos = async () => {
      try {
        const headers: Record<string, string> = {
          "Accept": "application/json",
          "Content-Type": "application/json",
        };
        const authToken = getEnvVar('STRAPI_API_AUTH_TOKEN');
        if (authToken) {
          headers["Authorization"] = `Bearer ${authToken}`;
        }
        const resp = await fetch(
          `${apiUrl}/global-promos?filters[active][$eq]=true&populate=*`,
          { method: "GET", headers }
        );
        if (resp.ok) {
          const json = await resp.json();
          if (mounted) setPromos(json?.data ?? []);
        } else if (resp.status === 403) {
          console.warn("GlobalPromos fetch returned 403 Forbidden — skipping promos");
          if (mounted) setPromos([]);
        } else {
          const text = await resp.text().catch(() => "");
          console.warn("GlobalPromos fetch returned", resp.status, text);
          if (mounted) setPromos([]);
        }
      } catch (err) {
        console.warn("Failed to fetch global-promos:", err);
        if (mounted) setPromos([]);
      } finally {
        if (mounted) setLoadingPromo(false);
      }
    };
    fetchPromos();
    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  const promo = promos?.[0];
  const isActive = promo?.active;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.practiceName.trim()) e.practiceName = 'Practice name required';
    if (!form.yourName.trim()) e.yourName = 'Your name required';
    if (!form.role.trim()) e.role = 'Role required';
    if (!form.email.trim()) e.email = 'Email required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone required';
    if (!form.currentPMS.trim()) e.currentPMS = 'Current PMS required';
    if (!form.callbackPreference) e.callbackPreference = 'Choose a callback preference';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/signup-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Submit failed');
      setSuccess(true);
      setTimeout(() => {
        onClose?.();
      }, 1200);
    } catch (err) {
      console.error(err);
      setErrors({ ...errors, email: 'Submission failed — try again' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Thanks — we got it!</h3>
        <p className="mb-4 text-sm text-gray-600">Someone will contact you shortly.</p>
        <div className="text-right">
          <button onClick={() => onClose?.()} className="px-4 py-2 bg-amber-500 text-white rounded">Close</button>
        </div>
      </div>
    );
  }

  // Show loading state while promo is fetching
  if (loadingPromo) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      {/* Close Button (X) */}
      <button
        type="button"
        onClick={() => onClose?.()}
        className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-xl font-bold z-10"
      >
        ×
      </button>

      {/* Promo Banner at top */}
      {promo && isActive && (
        // <div className='pr-4'>
          <GlobalPromo
          title={promo.title}
          message={promo.subtitle}
          countdownDays={promo.showOfferDuration ? promo.offerDays : 0}
          backgroundColor={
            promo.backgroundColor == null
              ? promo.backgroundImg?.url
              : promo.backgroundColor
          }
          promoImage={promo.promoImage?.url}
          colorSubTitle={promo.colorSubTitle}
          colorTitle={promo.colorTitle}
          ctaText={promo.ctaText}
          showButton={false}
        />
      )}

      <h2 className="text-xl font-semibold text-center mb-4 mt-4">Sign up by filling out the form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-4">
        <div>
          <label className="text-sm">Practice Name*</label>
          <input value={form.practiceName} onChange={(e)=>onChange('practiceName', e.target.value)} className="block w-full border-b p-2 focus:outline-none" placeholder="Practice Name" />
          {errors.practiceName && <p className="text-xs text-red-600 mt-1">{errors.practiceName}</p>}
        </div>

        <div>
          <label className="text-sm">Your Name*</label>
          <input value={form.yourName} onChange={(e)=>onChange('yourName', e.target.value)} className="block w-full border-b p-2 focus:outline-none" placeholder="Full Name" />
          {errors.yourName && <p className="text-xs text-red-600 mt-1">{errors.yourName}</p>}
        </div>

        <div>
          <label className="text-sm">Your Role*</label>
          <input value={form.role} onChange={(e)=>onChange('role', e.target.value)} className="block w-full border-b p-2 focus:outline-none" placeholder="Role" />
          {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
        </div>

        <div>
          <label className="text-sm">Work Email*</label>
          <input value={form.email} onChange={(e)=>onChange('email', e.target.value)} className="block w-full border-b p-2 focus:outline-none" placeholder="Email" />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm">Phone # *</label>
          <input value={form.phone} onChange={(e)=>onChange('phone', e.target.value)} className="block w-full border-b p-2 focus:outline-none" placeholder="Phone" />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="text-sm">Current PMS*</label>
          <input value={form.currentPMS} onChange={(e)=>onChange('currentPMS', e.target.value)} className="block w-full border-b p-2 focus:outline-none" placeholder="Current PMS" />
          {errors.currentPMS && <p className="text-xs text-red-600 mt-1">{errors.currentPMS}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="text-sm block">Callback preference*</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2"><input type="radio" name="cb" checked={form.callbackPreference==='instant'} onChange={()=>onChange('callbackPreference','instant')} /> Instant AI Callback</label>
            <label className="flex items-center gap-2"><input type="radio" name="cb" checked={form.callbackPreference==='human'} onChange={()=>onChange('callbackPreference','human')} /> Book Human Callback</label>
          </div>
          {errors.callbackPreference && <p className="text-xs text-red-600 mt-1">{errors.callbackPreference}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="text-sm">Additional info you&apos;d like for us to know</label>
          <textarea value={form.notes} onChange={(e)=>onChange('notes', e.target.value)} rows={4} className="block w-full border p-2 mt-2" placeholder="Additional info you'd like for us to know" />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input id="sms" type="checkbox" checked={form.optInSms} onChange={(e)=>onChange('optInSms', e.target.checked)} />
          <label htmlFor="sms" className="text-sm">Opt me in for text messages!</label>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button disabled={loading} type="submit" className="inline-block px-8 py-3 bg-amber-500 text-white rounded-full text-lg">
          {loading ? 'Submitting...' : 'Activate offer'}
        </button>
      </div>
    </form>
  );
}

