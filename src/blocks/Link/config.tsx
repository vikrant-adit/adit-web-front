import type { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import LinkBlock, { LinkBlockProps } from "./component.client";

export const LinkBlockConfig: ComponentConfig<LinkBlockProps> = {
//   id: "link",

  label: "Link",

  fields: {
    text: {
      type: "text",
      label: "Link Text",
    },

    url: {
      type: "text",
      label: "URL",
    },

    newTab: {
      type: "text",
      label: "Open in new tab",
    },

    variant: {
      type: "select",
      label: "Style",
      options: [
        { label: "Link", value: "link" },
        { label: "Primary Button", value: "primary" },
        { label: "Secondary Button", value: "secondary" },
      ],
    },
  },

  defaultProps: {
    text: "Click Here",
    url: "#",
    newTab: false,
    variant: "link",
  },

  render: (props) => <LinkBlock {...props} />,
};