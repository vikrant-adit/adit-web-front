import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import { SimilarBlogsBlockProps } from "./component.client";
import SimilarBlogsBlock from "./component.client";

const config: ComponentConfig<SimilarBlogsBlockProps> = {
  label: "Similar Blogs",



  fields: {
    title: {
      type: "text",
      label: "Title",
    },

    limit: {
      type: "number",
      label: "Limit",
    },

    excludeSlug: {
      type: "text",
      label: "Exclude Slug",
    },

    fetchFromApi: {
      type: "select",
      label: "Fetch Mode",
      options: [
        { label: "API", value: "true" },
        { label: "Manual", value: "false" },
      ],
    },
  },

  defaultProps: {
    title: "Similar Blogs",
    limit: 3,
    fetchFromApi: "true",
  },
    render: (props) => <SimilarBlogsBlock {...props as any} />
};

export default config;