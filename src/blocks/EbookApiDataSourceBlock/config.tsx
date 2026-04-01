import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import EbookApiDataSourceBlock, {
  EbookApiDataSourceBlockProps,
} from "./component.client";

export const EbookApiDataSourceBlockConfig: Omit<
  ComponentConfig<EbookApiDataSourceBlockProps>,
  "type"
> = {

  label: "Ebook API Data Source",

  fields: {

    collection: {
      type: "text",
      label: "Strapi Collection Name",
    },

  },

  defaultProps: {
    collection: "e-books",
  },

  render: (props) => <EbookApiDataSourceBlock {...props} />,
};