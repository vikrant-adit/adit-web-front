'use client';

import { useEditorGlow } from "@/hooks/useEditorGlow";
import { submitForm } from "@/lib/formSubmitDispatcher";
import { handleUiAction } from "@/lib/handleUiAction";
import { SubmitConfig } from "@/types/submit";
import DOMPurify from "dompurify";

type Props = {
  html: string;
  submitConfig: SubmitConfig;
  isGlobal?: boolean;
};

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function FormRenderer({ html, submitConfig, isGlobal }: Props) {
    const { shouldGlow } = useEditorGlow(isGlobal);

  async function onSubmit(e: React.FormEvent<HTMLDivElement>) {
    
    const target = e.target as HTMLElement;

    // Only handle real form submits
    if (target.tagName !== "FORM") return;

    e.preventDefault();

    const form = target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await submitForm(submitConfig, data);
      handleUiAction(submitConfig.onSuccess);
      form.reset();
    } catch (err) {
      console.error(err);
      handleUiAction(submitConfig.onError);
    }
  }

  const decodedHtml = decodeHtml(html);
  const safeHtml = DOMPurify.sanitize(decodedHtml, {
    ADD_ATTR: ["target"], // optional
  });

  return (
    <div
    className={shouldGlow ? 'editor-global-glow' : ''}
      onSubmit={onSubmit}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
