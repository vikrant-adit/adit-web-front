// src/components/Button.Config.tsx
"use client";
import React from "react";
import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import Button, { ButtonProps } from "./componet.client";

export const ButtonConfig: Omit<
  ComponentConfig<ButtonProps, ButtonProps>,
  "type"
> = {
  label: "Button",

  fields: {
    label: { type: "text", label: "Button Text" },

    align: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },

    width: {
      type: "text",
      label: "Width (e.g. w-full, w-40, 200px, 50%)",
    },

    // NEW: simple action fields (no extra component)
    actionName: {
      type: "select",
      label: "Action Name",
      options: [
        { label: "None", value: "none" },
        { label: "Open modal", value: "openModal" },
        { label: "Navigate (internal)", value: "navigate" },
        { label: "Open external URL", value: "external" },
        { label: "Scroll to anchor", value: "scrollTo" },
      ],
    },

    actionValue: {
      type: "text",
      label: "Action value (modalId / url / anchorId or JSON for advanced)",
    },
    isGlobal: {
      type: "text",
      label: "Set as Global",
    },

    globalKey: {
      type: "text",
      label: "Global Component Key",
    },
    newTab: { type: "text", label: "Open link in new tab" },
  },

  defaultProps: {
    label: "Learn More",
    align: "center",
    width: "w-auto",
    actionName: "none",
    actionValue: "",
    newTab: false,
    isGlobal: false,
    globalKey: "",
  },

  render: (data) => <Button {...data} />,
};

export default ButtonConfig;
