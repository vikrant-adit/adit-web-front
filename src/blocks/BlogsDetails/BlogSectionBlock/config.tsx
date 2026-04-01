import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import BlogSectionBlock from "./component.client";
import { BlogSectionBlockProps } from "./component.client";

const BlockConfig: ComponentConfig<BlogSectionBlockProps> = {
  label: "Blog Section",

  render: (props) => <BlogSectionBlock {...props} />,

  fields: {
    id: {
      type: "text",
      label: "Section ID (for TOC)",
    },

    title: {
      type: "text",
      label: "Title",
    },

    content: {
      type: "textarea", // or richtext if supported
      label: "Content",
    },
  },
};

export default BlockConfig;