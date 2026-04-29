import { getStrapiApiUrl, getStrapiAuthToken, buildApiUrl } from "./defaults";

export async function getGlobal() {
  try {
    const strapiUrl = getStrapiApiUrl();
    if (!strapiUrl) {
      console.error(
        "STRAPI_API is not defined. Set it in .env (e.g. https://my-strapi.example.com/).",
      );
      return null;
    }

    // Guard against offline ngrok tunnels

    const res = await fetch(
      buildApiUrl(`global?
populate[footer][fields][0]=copyright
&populate[footer][fields][1]=logo_description
&populate[footer][fields][2]=googlePlayLink
&populate[footer][fields][3]=appStoreLink
&populate[footer][populate][logo][fields][0]=url
&populate[footer][populate][logo][fields][1]=alternativeText
&populate[footer][populate][columns][populate][links][fields][0]=label
&populate[footer][populate][columns][populate][links][fields][1]=href
&populate[footer][populate][columns][populate][links][populate][children][fields][0]=label
&populate[footer][populate][columns][populate][links][populate][children][fields][1]=href
&populate[header][populate][links][populate][children][populate]=*
`),
      {
        cache: "force-cache", // ✅ strong caching
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getStrapiAuthToken()}`,
        },
      },
    );

    if (!res.ok) {
      console.error("Global API failed:", res.status, await res.text());
      return null;
    }

    const text = await res.text();
    const contentType = res.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      console.error(
        "Global API did not return JSON:",
        contentType,
        text.slice(0, 512),
        "(did you set STRAPI_API to the proper Strapi endpoint?)",
      );
      return null;
    }

    try {
      const json = JSON.parse(text);
      return json?.data?.[0] ?? null;
    } catch (err) {
      console.error("Global JSON parse error:", err, text.slice(0, 512));
      return null;
    }
  } catch (err) {
    console.error("Global fetch error:", err);
    return null; // ✅ prevent crash + stop retries
  }
}
