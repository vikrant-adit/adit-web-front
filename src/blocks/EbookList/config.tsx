import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import EbookListBlock, {
  EbookListBlockProps,
} from "./component.client";

export const EbookListBlockConfig: Omit<
  ComponentConfig<EbookListBlockProps>,
  "type"
> = {
  label: "Ebook List",

  fields: {
    title: {
      type: "text",
      label: "Section Title",
    },

    limit: {
      type: "number",
      label: "Number of Items",
    },

    fetchFromApi: {
      type: "text",
      label: "Use Page API Data",
      placeholder:
        "If enabled, ebooks will be read from page content instead of fetching from API.",
    },
  },

  defaultProps: {
    title: "Guides for Dental Practice Growth",
    limit: 12,
    fetchFromApi: false,
  },

  render: (props) => <EbookListBlock {...props} />,
};