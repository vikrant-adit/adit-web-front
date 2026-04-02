'use client';

import { Editor } from "@wecre8websites/strapi-page-builder-react";
import config from "../../blocks/PageBuilderConfig";

const apiUrlForImages =
  process.env.STRAPI_API_FOR_IMAGES ||
  "http://localhost:1337";

const authToken = process.env.STRAPI_API_AUTH_TOKEN;

const siteOrigin =
  typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:1337";

// const proxyBase = `${siteOrigin}/api/strapi-proxy`;

const strapiConfig = {
  url: siteOrigin,
  authToken: authToken as string,
  imageUrl: apiUrlForImages as string,
};
console.log("[EditorClient] using config", config);
console.log("proxyBase used by editor:");
console.log("authToken exists?", !!authToken);
export default function EditorClient() {
  return (
    <Editor
      config={config}
      apiKey={"e6ec22ff8a5a82beb32ad6cc1ad6eec5"}
      strapi={strapiConfig}
    />
  );
}
