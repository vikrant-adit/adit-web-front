import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import BlogListBlock from "./component.client";
import {BlogListBlockProps} from "./component.client";
const BlogListBlockConfig:  Omit<
  ComponentConfig<BlogListBlockProps>, "type"> = {

  label: "Blog List",

  fields: {
    title: {
      type: "text",
      label: "Section Title",
    },

    limit: {
      type: "number",
      label: "Number of Blogs",
    },

    fetchFromApi: {
      type: "text",
      label: "Fetch From Page (disable API)",
    },
  },

  defaultProps: {
    title: "Latest Blogs",
    limit: 9,
    fetchFromApi: "false",
  },


  render: (props) => {
    return <BlogListBlock {...props} />;
  },
};

export default BlogListBlockConfig;