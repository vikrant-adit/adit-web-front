/* eslint-disable @typescript-eslint/no-explicit-any */
// blocks/Dropzone/config.tsx
"use client";
import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import DropzoneClient, { DropzoneProps } from "./component.client";

export const DropzoneConfig: Omit<ComponentConfig<DropzoneProps, DropzoneProps>, "type"> = {
  label: "Image Gallery",
  fields: {
    images: {
      type: "array",
      label: "Images",
      arrayFields: {
        src: { type: "media", mediaType: "image", label: "Image file" },
        alt: { type: "text", label: "Alt text" },
      },
      getItemSummary: (it: any) => it?.alt || it?.src || "Image",
      max: 20,
    },
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Row (wrap)", value: "row" },
        { label: "Column", value: "column" },
      ],
    },
    gap: { type: "number", label: "Gap (px)" },
    imgSize: { type: "number", label: "Image size (px)" },
  },
  defaultProps: {
    images: [],
    layout: "row",
    gap: 8,
    imgSize: 160,
  },
  render: (data) => <DropzoneClient {...data} />,
};

export default DropzoneConfig;
