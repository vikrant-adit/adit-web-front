import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import CaseStudyHeroBlock, {
  CaseStudyHeroBlockProps,
} from "./component.client";

export const CaseStudyHeroBlockConfig: Omit<
  ComponentConfig<CaseStudyHeroBlockProps>,
  "type"
> = {
  label: "Case Study Hero",

  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },

    description: {
      type: "textarea",
      label: "Description",
    },

    buttonPrimaryText: {
      type: "text",
      label: "Primary Button Text",
    },
    buttonPrimaryLink: {
      type: "text",
      label: "Primary Button Link",
    },
    buttonSecondaryText: {
      type: "text",
      label: "Secondary Button Text",
    },
    buttonSecondaryLink: {
      type: "text",
      label: "Secondary Button Link",
    },
    mainImage: {
      type: "object",
      label: "Main Image",
      objectFields: {
        src: { type: "media", mediaType: "image", label: "Image" },
        alt: { type: "text", label: "Alt Text" },
      },
    },
  subImage: {
      type: "object",
      label: "Main Image",
      objectFields: {
        src: { type: "media", mediaType: "image", label: "Image" },
        alt: { type: "text", label: "Alt Text" },
      },
    },
 
   

    testimonial: {
      type: "textarea",
      label: "Testimonial",
    },

    author: {
      type: "text",
      label: "Author",
    },

    stats: {
      type: "array",
      label: "Stats",
      arrayFields: {
        value: {
          type: "text",
          label: "Value",
        },
        label: {
          type: "text",
          label: "Label",
        },
      },
    },
    statsRowTopPostionValue: {
      type: "text",
      label: "Stats Row Top Position Value",
    },
    statsBackground: {
      type: "text",
      label: "Stats Background Color",
    },
  },

  defaultProps: {
    heading:
      "Amanda Ball DMD Family Dentistry boosts annual collections by $200K while saving 2 hours/day with Adit",

    description:
      "After taking ownership of a practice in Longview, Texas, Dr. Amanda Ball needed a fast, reliable way to stabilize patient communication and reduce operational stress.",

    buttonPrimaryText: "Download Case Study",
    buttonSecondaryText: "Get a Glimpse",

  
    testimonial:
      "Adit is one of the best tools that I've incorporated into my practice.",

    author: "Dr. Amanda Ball, DMD.",

    stats: [
      { value: "2", label: "Hours saved daily" },
      { value: "66%", label: "Increase in annual collections" },
      { value: "7X", label: "New patient growth monthly" },
    ],
    statsRowTopPostionValue: "-73px",
    statsBackground: "#2f9cc3",
  },

  render: (props) => <CaseStudyHeroBlock {...props} />,
};
