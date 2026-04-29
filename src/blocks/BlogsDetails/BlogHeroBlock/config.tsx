import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import BlogHeroBlock, { BlogHeroBlockProps } from "./component.client"; // make sure it's imported

const BlockConfig: ComponentConfig<BlogHeroBlockProps> = {
  label: "Blog Hero",

  render: (props) => <BlogHeroBlock {...props} />,

  fields: {
    title: {
      type: "text",
      label: "Title",
    },

    image: {
      type: "text",
      label: "Image",
    },
  },
};

export default BlockConfig;