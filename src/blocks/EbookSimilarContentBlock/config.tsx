import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import SimilarEbooksBlock, {
  SimilarEbooksBlockProps,
} from "./component.client";

export const SimilarEbooksBlockConfig: Omit<
  ComponentConfig<SimilarEbooksBlockProps>,
  "type"
> = {
  label: "Similar Ebooks",

  fields: {
    fetchFromApi: {
      type: "text",
      label: "Use Page API Data",
      placeholder:
        "If enabled, ebooks will be loaded from the page API instead of manual items.",
    },

    title: {
      type: "text",
      label: "Section Title",
    },

    limit: {
      type: "number",
      label: "Number of Ebooks",
    },

    excludeSlug: {
      type: "text",
      label: "Exclude Current Ebook Slug",
    },

    items: {
      type: "array",
      label: "Manual Ebooks",

      arrayFields: {
        title: {
          type: "text",
          label: "Title",
        },

        slug: {
          type: "text",
          label: "Slug",
        },

        image: {
          type: "media",
          mediaType: "image",
          label: "Cover Image",
        },
      },
    },
  },

  defaultProps: {
    title: "Similar Content",
    limit: 4,
    fetchFromApi: "true",
  },

  render: (props) => <SimilarEbooksBlock {...props} />,
};