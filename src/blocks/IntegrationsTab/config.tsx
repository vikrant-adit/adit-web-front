/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import IntegrationBlock, { IntegrationBlockProps } from "./component.client";
export const IntegrationBlockConfig: Omit<ComponentConfig<IntegrationBlockProps, IntegrationBlockProps>, 'type'> = {
  label: 'Integrations (Tabs + Logos)',
  fields: {
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'text', label: 'Subtitle' },
    background: { type: 'text', label: 'Background (Tailwind class or CSS color)' },
    fontColor: { type: 'text', label: 'Font color (CSS or Tailwind text-*)' },
    columns: { type: 'number', label: 'Logos per row (visual sizing)' },

    tabs: {
      type: 'array',
      label: 'Tabs',
      arrayFields: {
        title: { type: 'text', label: 'Tab title' },
        logos: {
          type: 'array',
          label: 'Logos',
          arrayFields: {
            src: { type: 'media', mediaType: 'image', label: 'Logo image' },
            alt: { type: 'text', label: 'Alt text' },
            name: { type: 'text', label: 'Name' },
          },
          defaultItemProps: { src: '', alt: '', name: '' },
          getItemSummary: (it: any) => it?.name || it?.alt || 'Logo',
          min: 0,
          max: 200,
        },
      },
      defaultItemProps: { title: '', logos: [] },
      getItemSummary: (it: any) => it?.title || 
      'Tab',
      min: 0,
      max: 50,
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

  defaultProps: {
    title: 'Seamless integrations for your practice',
    subtitle:
      'Our platform integrates effortlessly with the most widely used practice management systems (PMS), ensuring a smooth, efficient workflow without the headaches of complex setups or disconnected tools.',
    background: 'bg-gradient-to-tr from-[#E8F7FE] to-white',
    fontColor: '#002D42',
    columns: 5,
    tabs: [
      {
        title: 'Dental',
        logos: [{ src: 'DEFAULT_IMAGE', alt: 'default', name: 'Default' }],
      },
      {
        title: 'Optometry',
        logos: [{ src: 'DEFAULT_IMAGE', alt: 'default', name: 'Default' }],
      },
    ],
  },

  render: (data) => {
    const props = { ...data } as any;

    // normalize media objects in tabs -> logos[].src
    if (Array.isArray(props.tabs)) {
      props.tabs = props.tabs.map((t: any) => {
        const copy = { ...t };
        if (Array.isArray(copy.logos)) {
          copy.logos = copy.logos.map((l: any) => {
            const li = { ...l };
            if (li?.src && typeof li.src === 'object') {
              li.src = li.src.url || li.src.src || li.src.data?.attributes?.url || li.src;
            }
            return li;
          });
        } else {
          copy.logos = copy.logos || [];
        }
        return copy;
      });
    } else {
      props.tabs = props.tabs || [];
    }

    return <IntegrationBlock {...(props as IntegrationBlockProps)} />;
  },
};

export default IntegrationBlockConfig;


