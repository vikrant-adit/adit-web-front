"use client";

import React from "react";
import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import CallIntelBLock, { CallIntelBLockProps } from "./component.client";

export const CallIntelBLockSectionConfig: Omit<
  ComponentConfig<CallIntelBLockProps, CallIntelBLockProps>,
  "type"
> = {
  label: "Call Intel Block Section",

  fields: {
    items: {
      type: "array",
      label: "Sections",

      arrayFields: {
        index: {
          type: "number",
          label: "Index Number",
        },

        title: {
          type: "text",
          label: "Title",
        },

        subtitle: {
          type: "text",
          label: "Subtitle",
        },

        benefit: {
          type: "text",
          label: "Benefit Text",
        },

        // ✅ TRUE repeatable cards array
        cards: {
          type: "array",
          label: "Cards",

          arrayFields: {
            image: {
              type: "media",
              mediaType: "image",
              label: "Card Image",
            },

            alt: {
              type: "text",
              label: "Image Alt",
            },

            description: {
              type: "text",
              label: "Description",
            },
          },
        },
      },
    },

    isGlobal: {
      type: "text",
      label: "Set as Global",
    },

    globalKey: {
      type: "text",
      label: "Global Component Key",
    },
  },

  // defaultProps: {
  //   items: [
  //     {
  //       index: 1,
  //       title: "Never miss another booking",
  //       subtitle: "Adit flags each call as scheduled, not scheduled, or lost",
  //       benefit: "Easily re-engage patients who didn't book",

       
  //     },
  //   ],

  //   isGlobal: false,
  //   globalKey: "",
  // },

  render: (props) => <CallIntelBLock {...props} />,
};

export default CallIntelBLockSectionConfig;
