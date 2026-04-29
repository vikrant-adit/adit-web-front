/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import Section, { SectionProps } from "./component.client";

type AllowItem = { name: string };

export const SectionConfig: Omit<
  ComponentConfig<SectionProps, SectionProps>,
  "type"
> = {
  label: "Section",
  fields: {
    isGlobal: {
      type: "text",
      label: "Set as Global",
    },

    globalKey: {
      type: "text",
      label: "Global Component Key",
    },
    id: {
      type: "text",
      label: "Section ID (html id)",
    },
    // core
    layout: {
      type: "select",
      label: "Layout Type",
      options: [
        { label: "Flex", value: "flex" },
        { label: "Grid", value: "grid" },
      ],
    },

    // FLEX options
    flexDirection: {
      type: "select",
      label: "Flex — Direction",
      options: [
        { label: "Column", value: "column" },
        { label: "Row", value: "row" },
      ],
    },
    flexWrap: {
      type: "select",
      label: "Flex — Wrap",
      options: [
        { label: "No Wrap", value: "nowrap" },
        { label: "Wrap", value: "wrap" },
      ],
    },
    // FLEX responsive options

flexDirectionMobile: {
  type: "select",
  label: "Flex — Direction (Mobile)",
  options: [
    { label: "Column", value: "column" },
    { label: "Row", value: "row" },
  ],
},

flexDirectionTablet: {
  type: "select",
  label: "Flex — Direction (Tablet)",
  options: [
    { label: "Column", value: "column" },
    { label: "Row", value: "row" },
  ],
},

flexDirectionDesktop: {
  type: "select",
  label: "Flex — Direction (Desktop)",
  options: [
    { label: "Column", value: "column" },
    { label: "Row", value: "row" },
  ],
},

alignMobile: {
  type: "select",
  label: "Flex — Align Items (Mobile)",
  options: [
    { label: "Start", value: "start" },
    { label: "Center", value: "center" },
    { label: "End", value: "end" },
  ],
},

alignTablet: {
  type: "select",
  label: "Flex — Align Items (Tablet)",
  options: [
    { label: "Start", value: "start" },
    { label: "Center", value: "center" },
    { label: "End", value: "end" },
  ],
},

alignDesktop: {
  type: "select",
  label: "Flex — Align Items (Desktop)",
  options: [
    { label: "Start", value: "start" },
    { label: "Center", value: "center" },
    { label: "End", value: "end" },
  ],
},

justifyMobile: {
  type: "select",
  label: "Flex — Justify (Mobile)",
  options: [
    { label: "Start", value: "start" },
    { label: "Center", value: "center" },
    { label: "End", value: "end" },
    { label: "Space Between", value: "between" },
    { label: "Space Around", value: "around" },
  ],
},

justifyTablet: {
  type: "select",
  label: "Flex — Justify (Tablet)",
  options: [
    { label: "Start", value: "start" },
    { label: "Center", value: "center" },
    { label: "End", value: "end" },
    { label: "Space Between", value: "between" },
    { label: "Space Around", value: "around" },
  ],
},

justifyDesktop: {
  type: "select",
  label: "Flex — Justify (Desktop)",
  options: [
    { label: "Start", value: "start" },
    { label: "Center", value: "center" },
    { label: "End", value: "end" },
    { label: "Space Between", value: "between" },
    { label: "Space Around", value: "around" },
  ],
},
    align: {
      type: "select",
      label: "Flex — Align Items",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
      ],
    },
    justify: {
      type: "select",
      label: "Flex — Justify Content",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Space Between", value: "between" },
        { label: "Space Around", value: "around" },
      ],
    },

    // GRID options (base)

    gap: {
      type: "number",
      label: "Grid — Gap (px)",
    },

    // responsive columns (kept simple — only columns are responsive)
    columnsMobile: {
      type: "number",
      label: "Grid — Columns (mobile)",
    },
    columnsTablet: {
      type: "number",
      label: "Grid — Columns (tablet)",
    },
    columnsDesktop: {
      type: "number",
      label: "Grid — Columns (desktop)",
    },

    // appearance
    padding: {
      type: "text",
      label: "Padding (Desktop, e.g. 'py-12 px-6')",
    },
    paddingMobile: {
      type: "text",
      label: "Padding (mobile)",
    },

    paddingTablet: {
      type: "text",
      label: "Padding (tablet)",
    },
    navigateTo:{
      type: "text",
      label: "Navigate To (URL or section ID)",
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (Tailwind or Hex)",
    },
    borderRadius: {
      type: "text",
      label: "Border Radius",
    },
    // background image options
    backgroundImage: {
      type: "media",
      mediaType: "image",
      label: "Background Image",
    },
    backgroundSize: {
      type: "select",
      label: "Background Size",
      options: [
        { label: "Cover", value: "cover" },
        { label: "Contain", value: "contain" },
        { label: "Auto", value: "auto" },
      ],
    },
    backgroundPosition: {
      type: "text",
      label: "Background Position (CSS value, e.g. center, top left, 50% 20%)",
    },
    backgroundOverlay: {
      type: "text",
      label: "Background Overlay (color, e.g. rgba(0,0,0,0.4) or #00000080)",
    },
    // container
    container: {
      type: "select",
      label: "Container Width",
      options: [
        { label: "Full Width", value: "full" },
        { label: "Screen", value: "screen" },
        { label: "7xl", value: "7xl" },
        { label: "6xl", value: "6xl" },
        { label: "5xl", value: "5xl" },
        { label: "Custom", value: "custom" },
      ],
    },

    maxWidth: {
      type: "text",
      label: "Custom Max Width (Tailwind class)",
    },

    // margins
    marginTop: {
      type: "text",
      label: "Margin Top",
    },

    marginBottom: {
      type: "text",
      label: "Margin Bottom",
    },

    // height
    minHeight: {
      type: "text",
      label: "Min Height",
    },

    // visibility
    hideOnMobile: {
      type: "text",
      label: "Hide on Mobile(true or false)",
    },

    hideOnTablet: {
      type: "text",
      label: "Hide on Tablet(true or false)",
    },

    hideOnDesktop: {
      type: "text",
      label: "Hide on Desktop(true or false)",
    },

    // positioning
    position: {
      type: "select",
      label: "Position",
      options: [
        { label: "Static", value: "static" },
        { label: "Relative", value: "relative" },
        { label: "Absolute", value: "absolute" },
      ],
    },

    zIndex: {
      type: "number",
      label: "Z-Index",
    },

    overflow: {
      type: "select",
      label: "Overflow",
      options: [
        { label: "Visible", value: "visible" },
        { label: "Hidden", value: "hidden" },
        { label: "Auto", value: "auto" },
      ],
    },

    // allowed child components
    allow: {
      type: "array",
      label: "Allowed Components",
      arrayFields: {
        name: { type: "text", label: "Component name" },
      },
      defaultItemProps: { name: "" },
      getItemSummary: (item: AllowItem) => item?.name ?? "Unnamed",
      min: 0,
      max: 50,
    },
    dropZone: {
      type: "slot",
      label: "Section Content",
    },
  },

  defaultProps: {
    id: "section",
    layout: "flex",
    flexDirection: "column",
    align: "center",
    justify: "center",
    columns: 3,
    gap: 24,

    // responsive columns
    columnsMobile: 1,
    columnsTablet: 2,
    columnsDesktop: 3,
    flexWrap: "nowrap",

    // padding
    padding: "py-12 px-6",
    paddingMobile: "",
    paddingTablet: "",

    // margins
    marginTop: "",
    marginBottom: "",
    navigateTo: '',
    // background
    backgroundColor: "transparent",
    backgroundImage: "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundOverlay: "",

    // sizing
    minHeight: "",

    // container
    container: "7xl",
    maxWidth: "",

    // visibility
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,

    // positioning
    position: "relative",
    zIndex: undefined,
    overflow: "visible",

    dropZone: [],

    allow: [
      { name: "ParagraphBlock" },
      { name: "Button" },
      { name: "TestimonialItem" },
      { name: "ImageBlock" },
      { name: "HeadingBlock" },
      { name: "RichHtml" },
      { name: "ReviewCard" },
      { name: "ReviewContainer" },
      { name: "Section" },
      { name: "Stats" },
      { name: "Divider" },
      { name: "SelectableCards" },
      { name: "FeatureSplit" },
      { name: "FeatureHero" },
      { name: "FormBlock" },
      { name: "TextAreaBlock" },
      { name: "FormCheckbox" },
      { name: "ImageCarousel" },
      { name: "Carousel" },
      { name: "Support Features Grid" },
      { name: "ReviewsWidget" },
      { name: "AditSlider" },
      { name: "Feature" },
      { name: "Video" },
      { name: "VideoBlock" },
      { name: "FeatureVideo" },
      { name: "Adit Testimonial Slider" },
      { name: "Form" },
      { name: "NewFormBlock" },
      { name: "AudioCard" },
      { name: "CaseStudyCard" },
      {name:"CallIntelBLock" },
      {name:"FinalCTABlock"},
      {name:"Link"},
    ],
  },

  render: (data) => {
    // If backgroundImage is a media object (or nested), extract url string expected by component.
    const props = { ...data } as any;
    if (props.backgroundImage && typeof props.backgroundImage === "object") {
      props.backgroundImage =
        props.backgroundImage.url ||
        props.backgroundImage.src ||
        props.backgroundImage.data?.attributes?.url ||
        props.backgroundImage;
    }
    return <Section {...(props as SectionProps)} />;
  },
};

export default SectionConfig;
