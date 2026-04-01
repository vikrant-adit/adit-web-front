"use client";
import React from "react";
import { ComponentConfig } from "@wecre8websites/strapi-page-builder-react";
import VideoBlock, { VideoBlockProps } from "./component.client";

export const VideoBlockConfig: Omit<
  ComponentConfig<VideoBlockProps, VideoBlockProps>,
  "type"
> = {
  label: "Video",
  fields: {
    video: {
      type: "object",
      label: "Video",
      objectFields: {
        src: { type: "media", mediaType: "video", label: "Video File" },
        url: {
          type: "text",
          label: "Video URL (YouTube, Vimeo, or direct URL)",
        },
        title: { type: "text", label: "Video Title" },
      },
    },
    width: { type: "number", label: "Width (px)" },
    height: { type: "number", label: "Height (px)" },
    borderRadius: { type: "number", label: "Border Radius (px)" },
    margin: { type: "number", label: "Margin (px)" },
    autoplay: { type: "text", label: "Autoplay" },
    controls: { type: "text", label: "Show Controls" },
    loop: { type: "text", label: "Loop Video" },
    muted: { type: "text", label: "Muted" },
    isGlobal: {
      type: "text",
      label: "Set as Global",
    },

    globalKey: {
      type: "text",
      label: "Global Key",
    },
  },
  defaultProps: {
    video: {
      src: "",
      url: "",
      title: "Video",
    },
    width: 800,
    height: 450,
    borderRadius: 12,
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
  },
  render: (data) => <VideoBlock {...data} />,
};

export default VideoBlockConfig;
