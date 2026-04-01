import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import BlogRichTextBlock from "./component.client"; // make sure it's imported
import { BlogRichTextBlockProps } from "./component.client";

const BlockConfig: ComponentConfig<BlogRichTextBlockProps> = {
  label: "Blog Rich Text",

  render: (props) => <BlogRichTextBlock {...props} />,

  fields: {
    content: {
      type: "textarea",
      label: "Content",
    }
  },
};

export default BlockConfig;