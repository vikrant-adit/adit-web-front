/* eslint-disable @typescript-eslint/no-explicit-any */
// apps/frontend/app/[slug]/page.tsx

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Render } from "@wecre8websites/strapi-page-builder-react";
import config from "../../blocks/PageBuilderConfig";
import { resolveGlobalRefs } from "@/lib/globalComponentResolver";
import { FormMapProvider } from "@/context/FormMapContext";
import SiteLayout from "@/components/layout/SiteLayout";

/* -------------------------------------------------
 * ENV
 * ------------------------------------------------- */
const STRAPI_BASE = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL as string; // already includes /api/
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_LOCAL_AUTH_TOKEN as string;

type StrapiRaw = any;

/* -------------------------------------------------
 * HELPERS
 * ------------------------------------------------- */
function normalizePath(path?: string) {
  if (!path) return "/";
  let p = String(path).trim();
  if (!p.startsWith("/")) p = "/" + p;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

/* -------------------------------------------------
 * ENSURE UNIQUE IDS FOR BLOCKS
 * ------------------------------------------------- */
function ensureBlockIds(templateJson: any) {
  if (!templateJson?.content || !Array.isArray(templateJson.content)) {
    return templateJson;
  }

  return {
    ...templateJson,
    content: templateJson.content.map((block: any, index: number) => {
      if (block?.props?.id) return block;

      return {
        ...block,
        props: {
          ...block.props,
          id: `${block.type}-${index}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        },
      };
    }),
  };
}

/* -------------------------------------------------
 * FETCH PAGE CONTENT (react-pages)
 * ------------------------------------------------- */
async function getCMSContent(locale: string, slug: string | undefined) {
  if (!slug) throw new Error("Missing slug for CMS fetch");

  const routePath = normalizePath(slug);

  // ✅ STRAPI_BASE already has /api/
  const url = new URL(`${STRAPI_BASE}react-pages`);
  // url.searchParams.set("populate", "*");

  if (locale) url.searchParams.set("locale", locale);

  url.searchParams.set("filters[enabled][$eq]", "true");
  url.searchParams.set("filters[routePath][$eq]", routePath);
url.searchParams.set("populate", "*");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url.toString(), {
    method: "GET",
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch react-pages: ${res.status} - ${text}`);
  }

  const json: StrapiRaw = await res.json();
  const rawEntry = json?.data?.[0] ?? null;
// console.log("Fetching CMS content from:", json?.data[0].layout);
  if (!rawEntry) {
    return { templateJson: null, content: null, raw: json };
  }

  const content = rawEntry.attributes ?? rawEntry;
  const layout = json?.data[0].layout ?? null;
  const templateJson =
    content?.template?.json ??
    content?.template?.data?.attributes?.json ??
    null;
console.log(
  "getCMSContent runtime:",
  typeof window === "undefined" ? "SERVER" : "BROWSER"
);
  return { templateJson, content, raw: json, layout };
}

/* -------------------------------------------------
 * FETCH REDIRECT (redirects)
 * ------------------------------------------------- */
async function getRedirectByOldSlug(oldSlug: string) {
  const url = new URL(`${STRAPI_BASE}redirects`);
  url.searchParams.set("populate", "*");
  url.searchParams.set("filters[oldSlug][$eq]", normalizePath(oldSlug));

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url.toString(), {
    method: "GET",
    headers,
    next: { revalidate: 0 },
  });

  const json: any = await res.json();

  const entry = json?.data?.[0] ?? null;
  return entry ? entry.attributes ?? entry : null;
}


/* -------------------------------------------------
 * METADATA
 * ------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) return { title: "Page not found" };

  try {
    const { content } = await getCMSContent("en", slug);
    const seo = content?.seo ?? {};

    return {
      title: seo.metaTitle ?? content?.title ?? "Adit",
      description: seo.metaDescription ?? "",
      robots: seo.metaRobots ?? "index,follow",
      alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
      openGraph: {
        title: seo.ogTitle ?? seo.metaTitle,
        description: seo.ogDescription ?? seo.metaDescription,
        images: seo.metaImage?.url ? [{ url: seo.metaImage.url }] : undefined,
      },
    };
  } catch {
    return { title: "Page not found" };
  }
}

/* -------------------------------------------------
 * PAGE RENDER
 * ------------------------------------------------- */
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string; locale?: string }>;
}) {
  const { slug, locale } = await params;

  const routePath = normalizePath(slug);

  let data: any = null;

  try {
    data = await getCMSContent(locale ?? "en", slug);
  } catch (err: any) {
    console.log("❌ getCMSContent error:", err?.message || err);
  }

  const { templateJson, content, raw, layout } = data ?? {};

  // ✅ If page not found or disabled, check redirects
if (!templateJson || !content) {
  const redirectEntry = await getRedirectByOldSlug(routePath);

  if (redirectEntry) {
    const to = redirectEntry?.newSlug || redirectEntry?.targetPage?.routePath;
    if (to && to !== routePath) {
      redirect(to);
    }
  }

return (
  <div style={{ padding: 20 }}>
    <h1
      className="text-[42px] text-center"
      style={{ color: "#f97316", fontFamily: "system-ui" }}
    >
      Oops! That page can’t be found.
    </h1>
  </div>
);
}


  // Resolve global components
  const resolvedTemplateJson = await resolveGlobalRefs(templateJson);

  // Ensure stable block IDs
  const normalizedTemplateJson = ensureBlockIds(resolvedTemplateJson);

  // Forms mapping (if you use forms relation)
const formsData = content?.form
  ? [content.form]
  : [];
  // console.log("[Page] formsData:", content);
  const formMap = Object.fromEntries(
    (Array.isArray(formsData) ? formsData : [])
      .map((f: any) => f?.attributes ?? f)
      .filter((f: any) => f?.enabled)
      .map((f: any) => [
        f.slug,
        {
          id: f.slug,
          ...(f.schema ?? {}),
        },
      ])
  );

  return (
    <section>
          <SiteLayout pageLayout={layout}>

      <FormMapProvider value={formMap}>
        <Render
          config={config}
          data={{
            templateJson: normalizedTemplateJson,
            content,
            formMap,
          }}
          strapi={{
            url: STRAPI_BASE,
            authToken: STRAPI_TOKEN,
            imageUrl: `${process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES}/uploads/`,
            locale,
          }}
        />
      </FormMapProvider>
          </SiteLayout>

    </section>
  );
}
