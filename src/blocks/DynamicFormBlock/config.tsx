import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import NewFormBlock from "./component.client";
import { NewFormBlockProps } from "./component.client";


const FormBlockConfig: ComponentConfig<NewFormBlockProps> = {
  label: "Form",
  fields: {
    formKey: {
      type: "text",
      label: "Form Key (example: test-promo-form)",
    },

    display_mode: {
      type: "select",
      label: "Form Display Mode",
      options: [
        { label: "Inline (Show in page)", value: "inline" },
        { label: "Popup (Open in modal)", value: "popup" },
      ],
    },

    popup_button_text: {
      type: "text",
      label: "Popup Button Text",
    },
  },
  render: (data) => <NewFormBlock {...data} />,
};

export default FormBlockConfig;
