/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import ImageSlider, { ImageSliderBlockProps } from "./component.client";

const ImageSliderConfig: ComponentConfig<
  ImageSliderBlockProps,
  ImageSliderBlockProps
> = {
  label: "Image Slider",

  fields: {
    backgroundFrom: {
      type: "text",
      label: "Gradient From",
    },
    backgroundTo: {
      type: "text",
      label: "Gradient To",
    },
    titleSize: {
      type: "text",
      label: "Title Size",
    },
    descriptionSize: {
      type: "text",
      label: "Description Size",
    },
    slides: {
      type: "array",
      label: "Slides",
      arrayFields: {
        src: {
          type: "media",
          mediaType: "image",
          label: "Image File",
        },
        alt: {
          type: "text",
          label: "Alt Text",
        },
        title: {
          type: "text",
          label: "Title",
        },
        description: {
          type: "textarea",
          label: "Description",
        },
      },
    },
  },

  render: (props: any) => {
    const slides = Array.isArray(props.slides)
      ? props.slides.map((s: any) => {
          let imageObj;

          const media = s?.image?.src;

          if (media) {
            let url;

            // Case 1: direct string
            if (typeof media === "string") {
              url = media;
            }

            // Case 2: Strapi v4 flat object
            else if (media?.url) {
              url = media.url;
            }

            // Case 3: Strapi nested data structure
            else if (media?.data?.attributes?.url) {
              url = media.data.attributes.url;
            }

            // Case 4: attributes only
            else if (media?.attributes?.url) {
              url = media.attributes.url;
            }

            if (url) {
              imageObj = {
                src: url,
                alt: s?.image?.alt || "",
              };
            }
          }

          return {
            ...s,
            image: imageObj,
          };
        })
      : [];

    return <ImageSlider {...props} slides={slides} />;
  },
};

export default ImageSliderConfig;
