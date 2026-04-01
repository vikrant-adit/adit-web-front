import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import WhyDownloadGuideBlock, {
  WhyDownloadGuideBlockProps,
} from "./component.client";

export const WhyDownloadGuideBlockConfig: Omit<
  ComponentConfig<WhyDownloadGuideBlockProps>,
  "type"
> = {
  label: "Why Download Guide",

  fields: {
    fetchFromApi: {
      type: "text",
      label: "Use Page API Data",
      placeholder:
        "If enabled, items will load from page API instead of manual items.",
    },

    title: {
      type: "text",
      label: "Title",
    },

    description: {
      type: "textarea",
      label: "Description",
    },

    items: {
      type: "array",
      label: "Features",

      arrayFields: {
        title: {
          type: "text",
          label: "Title",
        },

        description: {
          type: "textarea",
          label: "Description",
        },

        icon: {
          type: "media",
          mediaType: "image",
          label: "Icon",
        },
      },
    },
  },

  defaultProps: {
    title: "Why Download This Guide?",
  },

  render: (props) => <WhyDownloadGuideBlock {...props} />,
};