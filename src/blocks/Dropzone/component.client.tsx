/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
// blocks/Dropzone/component.client.tsx
"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

export type DropImage = { id?: string | number; src: string | any; alt?: string };
export type DropzoneProps = {
  images?: DropImage[]; // existing images (from template props)
  layout?: "row" | "column";
  gap?: number; // px
  imgSize?: number; // px (square)
  editable?: boolean; // when true show the editor UI (drop/upload/reorder)
  uploader?: (file: File) => Promise<string>;
  onChange?: (next: Partial<DropzoneProps>) => void;
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function normalizeSrc(raw: any, opts?: { strapiBase?: string }) {
  const STRAPI_BASE = process.env.STRAPI_API as string;
  if (!raw && raw !== "") return "";
  if (typeof raw === "string") {
    const s = raw.trim();
    if (!s) return "";
    if (s.startsWith("blob:") || s.startsWith("data:")) return s;
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    if (s.startsWith("/")) return `${STRAPI_BASE}${s}`;
    try { return new URL(s, STRAPI_BASE).toString(); } catch { return ""; }
  }
  try {
    if (typeof raw.src === "string") return normalizeSrc(raw.src, opts);
    if (typeof raw.url === "string") return normalizeSrc(raw.url, opts);
    if (raw.data?.attributes?.url) return normalizeSrc(raw.data.attributes.url, opts);
    if (raw.url) return normalizeSrc(raw.url, opts);
    if (raw.fields?.file?.url) return normalizeSrc(raw.fields.file.url, opts);
    const formats = raw.data?.attributes?.formats ?? raw.formats ?? raw.attributes?.formats;
    if (formats) {
      const pick = formats.small ?? formats.thumbnail ?? Object.values(formats)[0];
      const pUrl = pick?.url ?? pick?.source_url ?? pick?.path;
      if (pUrl) return normalizeSrc(pUrl, opts);
    }
    if (Array.isArray(raw) && raw.length > 0) return normalizeSrc(raw[0], opts);
  } catch {}
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
  const [localImages, setLocalImages] = useState<DropImage[]>(
    (images ?? []).map((it) => ({ ...it }))
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  // keep localImages synced with incoming images prop
  useEffect(() => {
    setLocalImages((_) => (images ?? []).map((it) => ({ ...it })));
  }, [images]);

  // helper: commit using functional update to avoid stale closure
  const commit = (updater: (prev: DropImage[]) => DropImage[]) => {
    setLocalImages((prev) => {
      const next = updater(prev);
      try { onChange?.({ images: next }); } catch (e) { /* ignore */ }
      return next;
    });
  };

  // handle files dropped/selected
  async function handleFiles(filesList: FileList | null) {
    if (!filesList || filesList.length === 0) return;
    const files = Array.from(filesList);

    if (uploader) {
      // upload in parallel but collect results
      const uploaded: DropImage[] = [];
      for (const file of files) {
        try {
          const url = await uploader(file);
          uploaded.push({ id: uid(), src: url, alt: file.name });
        } catch (err) {
          console.error("upload failed", err);
        }
      }
      // functional update: append uploaded items
      commit((prev) => [...prev, ...uploaded]);
      // clear input so same file can be selected again
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    // create object URLs for preview (dev)
    const created = files.map((f) => ({ id: uid(), src: URL.createObjectURL(f), alt: f.name }));
    commit((prev) => [...prev, ...created]);

    // clear file input so user can re-add same file if needed
    if (inputRef.current) inputRef.current.value = "";
  }

  // remove using functional update
  function removeAt(index: number) {
    commit((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(index, 1);
      if (removed?.src && typeof removed.src === "string" && removed.src.startsWith("blob:")) {
        try { URL.revokeObjectURL(removed.src); } catch {}
      }
      return copy;
    });
  }

  // reorder using functional update to avoid stale closures
  function onDrop(e: React.DragEvent, idx: number) {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData("text/index"));
    if (isNaN(from)) return;
    commit((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(from, 1);
      copy.splice(idx, 0, item);
      return copy;
    });
  }

  function onDragStart(e: React.DragEvent, idx: number) {
    e.dataTransfer.setData("text/index", String(idx));
    e.dataTransfer.effectAllowed = "move";
  }
  function onDragOver(e: React.DragEvent) { e.preventDefault(); }

  const containerStyle: React.CSSProperties =
    layout === "row"
      ? { display: "flex", flexDirection: "row", gap, flexWrap: "wrap", alignItems: "flex-start" }
      : { display: "flex", flexDirection: "column", gap };

  const DropzoneUI = (
    <div className="border border-dashed rounded p-3 sm:p-4">
      <div
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        onDragOver={(e) => e.preventDefault()}
        className="py-6 px-3 rounded-md text-center cursor-pointer"
        style={{ background: "rgba(0,0,0,0.02)" }}
        onClick={() => inputRef.current?.click()}
      >
        <div className="text-sm text-gray-600">Drag & drop images here or click to select</div>
        <div className="text-xs text-gray-400 mt-2">Supports multiple files</div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 px-2 sm:px-0">
        <label className="text-xs text-gray-600">Layout</label>
        <select value={layout} onChange={(e) => onChange?.({ layout: e.target.value as "row" | "column" })} className="text-sm p-1 border rounded">
          <option value="row">Row (wrap)</option>
          <option value="column">Column</option>
        </select>

        <label className="text-xs text-gray-600 ml-3">Gap</label>
        <input type="number" value={gap} onChange={(e) => onChange?.({ gap: Number(e.target.value || 0) })} className="text-sm w-16 p-1 border rounded" />

        <label className="text-xs text-gray-600 ml-3">Image size</label>
        <input type="number" value={imgSize} onChange={(e) => onChange?.({ imgSize: Number(e.target.value || 0) })} className="text-sm w-20 p-1 border rounded" />
      </div>
    </div>
  );

  return (
    <div>
      {editable && DropzoneUI}

      <div style={containerStyle} className="mt-3 px-3 sm:px-0">
        {localImages.map((img, i) => {
          const rawSrc = (img as any)?.src ?? "";
          const finalSrc = normalizeSrc(rawSrc);

          return (
            <div
              key={img.id ?? `${i}-${String(rawSrc).slice(0, 8)}`}
              draggable={editable}
              onDragStart={(e) => onDragStart(e, i)}
              onDrop={(e) => onDrop(e, i)}
              onDragOver={onDragOver}
              className="relative bg-gray-50 rounded overflow-hidden border flex-shrink-0"
              style={{ width: layout === "row" ? imgSize : "100%", height: imgSize, display: "flex", alignItems: "center", justifyContent: "center" }}
              title={img.alt}
            >
              {finalSrc ? (
                <Image
                  src={finalSrc}
                  alt={img.alt  || 'Image'}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                  width={imgSize}
                  height={imgSize}
                  unoptimized={finalSrc.startsWith("blob:") || finalSrc.startsWith("data:") || finalSrc.startsWith("http://localhost")}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" />
                  </svg> */}
                </div>
              )}

              {editable && (
                <div style={{ position: "absolute", top: 6, right: 6, display: "flex", gap: 6 }}>
                  <button onClick={() => {
                    const nextAlt = prompt("Alt text", img.alt || "") ?? img.alt;
                    commit((prev) => { const copy = [...prev]; copy[i] = { ...copy[i], alt: nextAlt }; return copy; });
                  }} className="p-1 bg-white rounded shadow text-xs">Alt</button>

                  <button onClick={() => removeAt(i)} className="p-1 bg-white rounded shadow text-xs">Remove</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
