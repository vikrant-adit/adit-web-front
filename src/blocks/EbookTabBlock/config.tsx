import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import EbookInsideTabsBlock, {
  EbookInsideTabsBlockProps,
} from "./component.client";

export const EbookInsideTabsBlockConfig: Omit<
  ComponentConfig<EbookInsideTabsBlockProps>,
  "type"
> = {
  label: "Ebook Inside Tabs Block",

  fields: {
    fetchFromApi: {
      type: "text",
      label: "Use Page API Data",
      placeholder:
        "If enabled, tabs will be loaded from the page content instead of manual items.",
    },

    items: {
      type: "array",
      label: "Tabs",
      min: 1,

      // defaultItemProps: {
      //   label: "Understanding Dental Billing",
      //   title: "Understanding Dental Billing",
      //   description:
      //     "Gain insights into common billing challenges and how software can solve them.",
      // },

      arrayFields: {
        label: {
          type: "text",
          label: "Tab Label",
        },

        title: {
          type: "text",
          label: "Title",
        },

        description: {
          type: "textarea",
          label: "Description",
        },

        image: {
          type: "media",
          mediaType: "image",
          label: "Image",
        },
      },
    },
  },

  // defaultProps: {
  //   fetchFromApi: false,

  //   items: [
  //     {
  //       label: "Understanding Dental Billing",
  //       title: "Understanding Dental Billing",
  //       description:
  //         "Gain insights into common billing challenges and how software can solve them.",
  //     },
  //     {
  //       label: "The Power of AI",
  //       title: "The Power of AI",
  //       description:
  //         "Dive into how automation and AI-driven dental billing software can improve the long-term success of your practice.",
  //     },
  //     {
  //       label: "Enhancing Long-Term Practice Growth",
  //       title: "Enhancing Long-Term Practice Growth",
  //       description:
  //         "Discover how these tools impact the future of your dental office.",
  //     },
  //     {
  //       label: "Best Practices",
  //       title: "Best Practices",
  //       description:
  //         "Learn best practices for integrating new billing software into your workflow.",
  //     },
  //   ],
  // },

  render: (props) => <EbookInsideTabsBlock {...props} />,
};