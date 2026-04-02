export async function getGlobal() {
  try {
    const res = await fetch(
        `${process.env.STRAPI_API}global?
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
`,
      {
        cache: "force-cache", // ✅ strong caching
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_AUTH_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Global API failed:", res.status);
      return null;
    }

    const json = await res.json();
    return json?.data?.[0] ?? null;

  } catch (err) {
    console.error("Global fetch error:", err);
    return null; // ✅ prevent crash + stop retries
  }
}