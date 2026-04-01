'use client';

import { useEffect, useState, JSX } from "react";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import SafeHtml from "../common/SafeHtml";
import { apiUrl } from "../../lib/config";

/* ----------------------- Utility: Localized Text ----------------------- */
type LocalizedValue = string | { [key: string]: unknown } | null | undefined;

const getLocalizedString = (val: LocalizedValue): string => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    if (typeof val.en === "string") return val.en;
    const firstString = Object.values(val).find((v) => typeof v === "string");
    return (firstString as string) || "";
  }
  return "";
};

/* ----------------------- Utility: Class Name Injection ----------------------- */
const addClassesToClassAttr = (
  html: string,
  targetClass: string,
  classesToAdd: string
): string => {
  return html.replace(
    new RegExp(`class="([^"]*\\b${targetClass}\\b[^"]*)"`, "gi"),
    (_, existing) => `class="${existing} ${classesToAdd}"`
  );
};

/* ----------------------- Utility: Style CMS HTML ----------------------- */
const styleBodyContent = (html: string): string => {
  if (!html) return "";
  let styled = html;

  // Structural Wrappers
  styled = addClassesToClassAttr(styled, "casestudyhero-section", "py-12 md:py-16");
  styled = addClassesToClassAttr(styled, "wrap-inner", "max-w-7xl mx-auto px-6");
  styled = addClassesToClassAttr(styled, "casestudyhero-row", "md:flex md:items-start md:gap-8");
  styled = addClassesToClassAttr(styled, "casestudyhero-leftcol", "md:w-1/2");
  styled = addClassesToClassAttr(styled, "casestudyhero-rightcol", "md:w-1/2 relative");

  // Buttons
  styled = addClassesToClassAttr(styled, "casestudyhero-btns", "flex gap-4 mt-6");

  // Review Box
  styled = addClassesToClassAttr(
    styled,
    "casestudy-reviewbox",
    "-bottom-10 left-6 right-6 bg-white rounded-2xl shadow-xl p-4 md:p-6 flex items-center gap-4"
  );

  // Stats Band
  styled = addClassesToClassAttr(styled, "ournumber-section", "bg-[#06A6DE] text-white py-8");
  styled = addClassesToClassAttr(
    styled,
    "ournumber-list",
    "max-w-7xl mx-auto grid md:grid-cols-3 gap-6 items-center text-center px-6"
  );

  styled = styled.replace(
    /(<div[^>]*class="[^"]*ournumber-box[^"]*"[^>]*>)([\s\S]*?)<\/div>/gi,
    (m, open, inner) => {
      const replaced = inner
        .replace(
          /<strong([^>]*)>([\s\S]*?)<\/strong>/gi,
          `<strong class="text-4xl md:text-5xl font-bold block"$1>$2</strong>`
        )
        .replace(
          /<p(?![^>]*class=)([^>]*)>([\s\S]*?)<\/p>/gi,
          `<p class="mt-2"$1>$2</p>`
        );
      return `${open}${replaced}</div>`;
    }
  );

  // Headings and Text
  styled = styled.replace(
    /<h1([^>]*)>([\s\S]*?)<\/h1>/gi,
    `<h1 class="text-4xl md:text-5xl leading-tight text-[#06374A] mb-4"$1>$2</h1>`
  );
  styled = styled.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    `<h2 class="text-2xl md:text-3xl font-semibold text-[#06374A] mt-4 mb-3"$1>$2</h2>`
  );
  styled = styled.replace(
    /<p(?![^>]*class=)([^>]*)>([\s\S]*?)<\/p>/gi,
    `<p class="text-lg leading-relaxed text-gray-700 mb-4"$1>$2</p>`
  );

  // Images
  styled = styled.replace(
    /<img([^>]*)\/?>/gi,
    `<img class="w-full object-cover rounded-2xl shadow-lg my-6"$1 />`
  );

  // Buttons & Links
  styled = styled.replace(
    /<a([^>]*)class="([^"]*(site-button|download-case-study|download-case-study1|download-case-study-ppt1)[^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi,
    `<a$1 class="$2 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold inline-block"$4>$5</a>`
  );

  // Blockquotes
  styled = styled.replace(
    /<blockquote([^>]*)>([\s\S]*?)<\/blockquote>/gi,
    `<blockquote class="pl-6 border-l-4 border-blue-100 text-lg italic text-gray-700"$1>$2</blockquote>`
  );

  // Strong tags (without class)
  styled = styled.replace(
    /<strong(?![^>]*class=)([^>]*)>([\s\S]*?)<\/strong>/gi,
    `<strong class="text-[#06374A] font-semibold"$1>$2</strong>`
  );

  return styled;
};

/* ----------------------- Main Component ----------------------- */
interface CaseStudy {
  body?: LocalizedValue;
  [key: string]: unknown;
}

const CaseStudyDetail = (): JSX.Element => {
  const params = useParams<{ slug?: string }>();
  const slug = params?.slug;

  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(apiUrl(`casestudy/${encodeURIComponent(slug)}`));

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const data = await res.json();

        const cs = Array.isArray(data.casestudy)
          ? data.casestudy[0]
          : data.casestudy;

        setCaseStudy(cs ?? null);
      } catch (err) {
        console.error("Failed to fetch case study:", err);
        setCaseStudy(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  if (loading)
    return <div className="text-center py-12 text-gray-600">Loading...</div>;

  if (!caseStudy)
    return <div className="text-center py-12 text-gray-600">Case study not found.</div>;

  const rawBody = getLocalizedString(caseStudy.body);
  const styledBody = styleBodyContent(rawBody);
  const sanitized = DOMPurify.sanitize(styledBody, {
    ADD_ATTR: ["target", "data-pdf-url", "data-pdf-title"],
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <SafeHtml
        html={sanitized}
        className="max-w-full prose lg:prose-xl prose-img:rounded-2xl prose-img:shadow-lg"
      />
    </div>
  );
};

export default CaseStudyDetail;
