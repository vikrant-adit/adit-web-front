/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { getStrapiApiUrl } from "@/lib/defaults";


export type DropImage = {
  id?: string | number;
  src: string ;
  alt?: string;
};

export type DropzoneProps = Readonly<{
  images?: DropImage[];
  layout?: "row" | "column";
  gap?: number;
  imgSize?: number;
  editable?: boolean;
  uploader?: (file: File) => Promise<string>;
  onChange?: (next: Partial<DropzoneProps>) => void;
}>;

const uid = () => globalThis.crypto.randomUUID();
function normalizeSrc(raw: unknown): string {
  const STRAPI_BASE = getStrapiApiUrl();

  if (!raw && raw !== "") return "";

  if (typeof raw === "string") {
    const s = raw.trim();
    if (!s) return "";

    if (
      s.startsWith("blob:") ||
      s.startsWith("data:") ||
      s.startsWith("http://") ||
      s.startsWith("https://")
    ) return s;

    if (s.startsWith("/")) return `${STRAPI_BASE}${s}`;

    try {
      return new URL(s, STRAPI_BASE).toString();
    }catch (e) {
  console.warn("Invalid URL:", raw, e);
  return "";
}
  }

  if (typeof raw === "object" && raw !== null) {
    const obj = raw as Record<string, unknown>;

    return (
      normalizeSrc(obj.src) ||
      normalizeSrc(obj.url) ||
      normalizeSrc((obj.data as any)?.attributes?.url) ||
      ""
    );
  }

  return "";
}

export default function DropzoneClient({
  images = [],
  layout = "row",
  gap = 8,
  imgSize = 160,
  editable = false,
  uploader,
  onChange,
}: DropzoneProps) {
  const [localImages, setLocalImages] = useState<DropImage[]>([...images]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLocalImages([...images]);
  }, [images]);

  const commit = (updater: (prev: DropImage[]) => DropImage[]) => {
    setLocalImages((prev) => {
      const next = updater(prev);
      try {
        onChange?.({ images: next });
      } catch (e) {
        console.error("onChange failed", e);
      }
      return next;
    });
  };

  async function handleFiles(filesList: FileList | null) {
    if (!filesList) return;

    const files = Array.from(filesList);

    if (uploader) {
      const uploaded: DropImage[] = [];

      for (const file of files) {
        try {
          const url = await uploader(file);
          uploaded.push({ id: uid(), src: url, alt: file.name });
        } catch (e) {
          console.error("Upload failed:", e);
        }
      }

      commit((prev) => [...prev, ...uploaded]);
      return;
    }

    const previews = files.map((f) => ({
      id: uid(),
      src: URL.createObjectURL(f),
      alt: f.name,
    }));

    commit((prev) => [...prev, ...previews]);
  }

  function removeAt(index: number) {
    commit((prev) => prev.filter((_, i) => i !== index));
  }



  const containerStyle: React.CSSProperties =
    layout === "row"
      ? { display: "flex", gap, flexWrap: "wrap" }
      : { display: "flex", flexDirection: "column", gap };

  return (
    <div>
      {editable && (
        <div className="border border-dashed rounded p-4">
          <button
  type="button"
  onClick={() => inputRef.current?.click()}
  className="py-6 text-center cursor-pointer w-full"
>
  Upload images
</button>

          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="flex gap-3 mt-3">
            <label htmlFor="layout">Layout</label>
            <select
              id="layout"
              value={layout}
              onChange={(e) =>
                onChange?.({ layout: e.target.value as "row" | "column" })
              }
            >
              <option value="row">Row</option>
              <option value="column">Column</option>
            </select>
          </div>
        </div>
      )}

      <div style={containerStyle}>
        {localImages.map((img, i) => {
          const finalSrc = normalizeSrc(img.src);

          return (
            <div key={img.id ?? i} className="relative">
              {finalSrc && (
                <Image
                  src={finalSrc}
                  alt={img.alt || "Image"}
                  width={imgSize}
                  height={imgSize}
                />
              )}

              {editable && (
                <button onClick={() => removeAt(i)}>Remove</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}