/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import DynamicForm from "@/components/forms/DynamicForm";
import { useFormMap } from "@/context/FormMapContext";
import { resolveImageUrl } from "@/lib/imageResolver";

export type NewFormBlockProps = {
  formKey: string;
  display_mode?: "inline" | "popup";
  popup_button_text?: string;
};

export default function NewFormBlock(props: Readonly<NewFormBlockProps>) {
  const { formKey, display_mode = "inline", popup_button_text = "Open Form" } =
    props;

  const safeKey = (formKey || "").trim();

  const formMap = useFormMap();
  const hasFormMap = formMap && Object.keys(formMap).length > 0;

  const formSchema = formMap?.[safeKey];
  // debug: confirm whether we received the form schema
  // eslint-disable-next-line no-console
  // console.log('[NewFormBlock] formKey:', safeKey, 'hasFormMap:', !!hasFormMap, 'formSchemaExists:', !!formSchema, 'formSchema:', formSchema);

  // ✅ Editor safe message (no confusion)
  if (!hasFormMap) {
    return (
      <div className="rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
        ⚠️ Form preview not available in editor.
        <br />
        Form Key: <b>{safeKey || "N/A"}</b>
        <br />
        It will render correctly on the live page.
      </div>
    );
  }

  // ❌ Form key mismatch case
  if (!formSchema) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
        ❌ Form not found: <b>{safeKey}</b>
        <br />
        Available keys:{" "}
        <span className="font-medium">
          {Object.keys(formMap || {}).join(", ")}
        </span>
      </div>
    );
  }

  const schema = {
    ...formSchema,
    id: safeKey,
    submit: {
      endpoint: "form-lead",
      method: "POST",
    },
  };

  // ✅ INLINE
  if (display_mode === "inline") {
    return <DynamicForm schema={schema} />;
  }

  // ✅ POPUP
  return <FormPopup schema={schema} buttonText={popup_button_text} />;
}

function FormPopup({
  schema,
  buttonText,
}: Readonly<{
  schema: any;
  buttonText: string;
}>) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="rounded bg-black px-4 py-2 text-white"
        onClick={() => {
          setSubmitted(false); // reset when reopening
          setOpen(true);
        }}
      >
        {buttonText}
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 sm:p-6">
          <div
            className="relative w-full max-w-sm sm:max-w-2xl md:max-w-5xl rounded-lg sm:rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            {submitted ? (
              // ✅ Success state (no header)
            <div className="p-4 sm:p-8 md:p-10 text-center space-y-4 sm:space-y-6 overflow-y-auto">
  {/* SUCCESS IMAGE */}
  {schema?.confirmation?.successImage?.src && (
    <img
      src={resolveImageUrl(schema.confirmation.successImage.src)}
      alt={schema.confirmation.successImage.alt || "Success"}
      className="mx-auto max-h-32 sm:max-h-40 object-contain"
    />
  )}

  {/* SUCCESS TITLE */}
  {schema?.confirmation?.successTitle && (
    <h3 className="text-lg sm:text-2xl font-semibold">
      {schema.confirmation.successTitle}
    </h3>
  )}

  {/* SUCCESS MESSAGE */}
  <p className="text-sm sm:text-base text-gray-600">
    {schema?.confirmation?.successMessage}
  </p>

  {/* CLOSE BUTTON */}
  {schema?.confirmation?.showCloseButton !== false && (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="mt-4 rounded bg-black px-4 sm:px-6 py-2 text-white text-sm sm:text-base"
    >
      Close
    </button>
  )}
</div>

            ) : (
              <>
                {/* ✅ Header only before submission (if configured) */}
                {schema?.popup?.headerTitle && (
                  <div className="relative flex items-center justify-center border-b px-3 py-2 sm:px-6 sm:py-3">
                    <h2 className="text-sm sm:text-base md:text-xl font-semibold">
                      {schema.popup.headerTitle}
                    </h2>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="absolute right-2 sm:right-4 rounded-lg px-2 py-1 sm:px-3 text-xs sm:text-sm hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Body */}
                <div className="p-3 sm:p-6 overflow-y-auto">
                  <DynamicForm
                    schema={schema}
                    variant="popup"
                    onSuccess={() => setSubmitted(true)} // ✅ trigger success view
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

