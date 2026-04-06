/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import type { FormSchema, Field } from "../../../packages/schemas/form";

import { getStoredUTMs } from "@/lib/utm-client";
import { getDefaultUTMs } from "@/lib/LeadControll/utm-default-data";
import { getLeadSourceConfigCached } from "@/lib/LeadControll/leadSourceConfig";
import { trackLeadSourceTS } from "@/lib/LeadControll/leadSourceResolver";
import { buildApiUrl, getEnvVar } from "@/lib/defaults";

type Props = {
  schema: FormSchema;
  variant?: "inline" | "popup";
  onSuccess?: () => void;
};

export default function DynamicForm({
  schema,
  variant = "inline",
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const confirmation = schema?.confirmation || {};

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const stored = getStoredUTMs();
    const utms = {
      ...getDefaultUTMs(),
      ...(stored || {}),
    };

    const leadSourceConfig = await getLeadSourceConfigCached();

    const forcedSource =
      (values.check_for_fb_rsrc as string) ||
      (values.forced_source as string) ||
      "";

    const { leadsrc } = trackLeadSourceTS(
      {
        trfcsrc: utms?.utm_source || "direct",
        forcedSource,
        utm_medium: utms?.utm_medium || "",
        utm_campaign: utms?.utm_campaign || "",
      },
      leadSourceConfig,
    );

    const payload = {
      ...values,
      practice_name: values.practice_name || null,
      full_name: values.full_name || null,
      email: values.email || null,
      phone: values.phone || null,
      role: values.role || null,
      pms: values.pms || null,
      other_pms: values.other_pms || null,
      dental_practice: values.dental_practice || null,
      best_time: values.best_time || null,
      note: values.note || null,
      gift_card: values.gift_card || null,
      referrer: document.referrer || null,
      traffic_source: utms?.utm_source || "direct",
      uuid: values.uuid || null,
      utm_campaign: utms?.utm_campaign || null,
      utm_medium: utms?.utm_medium || null,
      utm_term: utms?.utm_term || null,
      utm_content: utms?.utm_content || null,
      gclid: utms?.gclid || null,
      utm_lead_source: leadsrc,
    };

    try {
      const res = await fetch(
        buildApiUrl(schema.submit.endpoint),
        {
          method: schema.submit.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getEnvVar('STRAPI_API_AUTH_TOKEN')}`,
          },
          body: JSON.stringify({ data: payload }),
        },
      );

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch {
      setError(confirmation.errorMessage || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // INLINE SUCCESS ONLY
  if (success && variant === "inline") {
    return <FormSuccess confirmation={confirmation} />;
  }

  const promo = (schema as any)?.promo;
  const showSplitPromo =
    (schema as any)?.layout === "split-left-promo" && promo;
  const columns =
    schema?.layout === "single-column"
      ? 1
      : schema?.layout === "three-column"
        ? 3
        : 2;
  const gridClass =
    columns === 1
      ? "grid grid-cols-1 gap-6"
      : columns === 2
        ? "grid grid-cols-1 md:grid-cols-2 gap-6"
        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  const formElement = (
    <form
      onSubmit={handleSubmit}
      className={`${variant === "popup" ? "space-y-3" : "space-y-4"} w-[90%]`}
    >
      <div className={gridClass}>
        {schema.fields.map((field, index) => {
          const isLastAndOdd =
            columns === 2 &&
            index === schema.fields.length - 1 &&
            schema.fields.length % 2 !== 0;
          return (
            <div
              key={field.id}
              className={`col-span-1 ${isLastAndOdd ? "md:col-span-2" : ""}`}
            >
              <FormField field={field} />
            </div>
          );
        })}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit"}
      </button>
    </form>
  );

  if (showSplitPromo) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
        <div
          className="p-6 rounded-lg flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: promo?.backgroundColor || undefined }}
        >
          {promo?.image?.src ? (
            <img
              src={resolveImageUrl(promo.image.src)}
              alt={promo.image.alt || promo.title || "Promo"}
              className="mx-auto max-h-48 object-contain"
            />
          ) : (
            promo?.title && (
              <h3 className="text-xl font-semibold">{promo.title}</h3>
            )
          )}
        </div>

        <div className="col-span-2 flex items-stretch">
          <div className="w-full">{formElement}</div>
        </div>
      </div>
    );
  }

  return formElement;
}
export function FormSuccess({ confirmation }: { confirmation: any }) {
  const layout = confirmation?.successLayout || "minimal";

  return (
    <div className="text-center space-y-4 p-4">
      {layout === "image-top" && confirmation?.successImage?.src && (
        <img
          src={resolveImageUrl(confirmation.successImage.src)}
          alt={confirmation.successImage.alt || "Success"}
          className="mx-auto max-h-40 object-contain"
        />
      )}

      {confirmation?.successTitle && (
        <h3 className="text-xl font-semibold">{confirmation.successTitle}</h3>
      )}

      <p className="text-gray-600">{confirmation?.successMessage}</p>
    </div>
  );
}
/* ----------------------------------
 * Field Renderer
 * ---------------------------------- */

function FormField({ field }: { field: Field }) {
  const [value, setValue] = useState("");

  switch (field.type) {
    case "text":
    case "email":
    case "tel":
      return (
        <div>
          <label className="mb-1 block font-medium">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            required={field.required}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => {
              if (field.type === "tel") {
                setValue(formatPhone(e.target.value));
              } else {
                setValue(e.target.value);
              }
            }}
            inputMode={field.type === "tel" ? "numeric" : undefined}
            className="w-full rounded border px-3 py-2"
          />
        </div>
      );

    case "select":
      return (
        <div>
          <label className="mb-1 block font-medium">{field.label}</label>
          <select
            name={field.name}
            required={field.required}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case "checkbox":
      return (
        <label className="flex items-center gap-2">
          <input type="checkbox" name={field.name} />
          {field.label}
        </label>
      );

    default:
      return null;
  }
}
function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 10);

  const parts = [];

  if (numbers.length > 0) {
    parts.push("(" + numbers.slice(0, 3));
  }

  if (numbers.length >= 4) {
    parts[0] += ")";
    parts.push(" " + numbers.slice(3, 6));
  }

  if (numbers.length >= 7) {
    parts.push("-" + numbers.slice(6, 10));
  }

  return parts.join("");
}
