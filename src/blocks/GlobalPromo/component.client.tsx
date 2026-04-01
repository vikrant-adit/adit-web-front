/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import DOMPurify from "dompurify";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/imageResolver";
import SignupCustomerForm from "@/components/Modals/SignUpCustomerForm";

export type GlobalPromoProps = {
  title?: string;
  offer?: string;
  message?: string;
  ctaText?: string;
  ctaUrl?: string;
  /**
   * Accepts either a CSS color (e.g. "#fff", "rgba(...)", "blue")
   * OR an image URL (absolute, protocol-relative or path starting with '/').
   * If an image URL is provided, it will be used as background-image (cover).
   */
  backgroundColor?: string;
  countdownDays?: number;
  position?: "relative" | "absolute" | "fixed" | "sticky";
  className?: string;
  zIndex?: number;
  hiddenRoutes?: string;
  promoImage?: string;
  colorTitle?: string;
  colorSubTitle?: string;
  showButton?: boolean;
};

function routeMatchesPatterns(
  pathname: string,
  patterns: string[] = []
): boolean {
  if (!patterns || patterns.length === 0) return false;
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return patterns.some((patternRaw) => {
    if (!patternRaw) return false;
    const pat = patternRaw.trim();
    if (!pat) return false;
    const pattern = pat === "/" ? "/" : pat.replace(/\/+$/, "");
    if (pattern.includes("*")) {
      const escaped = pattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\\\*/g, ".*");
      const re = new RegExp(`^${escaped}$`);
      return re.test(normalized);
    }
    return normalized === pattern;
  });
}

/**
 * Heuristic to determine if a given string is an image URL/path.
 * Treat as image when it starts with http(s)://, //, / or ends with a common image extension.
 */
function looksLikeImage(value?: string): boolean {
  if (!value) return false;
  const v = value.trim();
  if (/^(https?:\/\/|\/\/|\/)/i.test(v)) return true;
  if (/\.(jpg|jpeg|png|gif|webp|avif|svg)(\?.*)?$/i.test(v)) return true;
  return false;
}

const GlobalPromo: React.FC<GlobalPromoProps> = ({
  title = "Free phones & VoIP for life",
  promoImage = "",
  offer = "",
  message = "when you sign up with Adit!",
  ctaText = "Schedule a Demo",
  ctaUrl = "#",
  backgroundColor = "#1f2937", // default dark background or image url
  countdownDays = 20,
  colorTitle = "white",
  colorSubTitle = "orange-400",
  position = "sticky",
  className = "",
  zIndex = 50,
  hiddenRoutes = null,
  showButton = true,
}) => {
  const hiddenPatterns = useMemo(() => {
    if (!hiddenRoutes) return [];
    return hiddenRoutes
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [hiddenRoutes]);

  const computeShouldHide = (): boolean | null => {
    if (typeof window === "undefined") return null;
    if (!hiddenPatterns || hiddenPatterns.length === 0) return false;
    const pathname = window.location.pathname || "/";
    return routeMatchesPatterns(pathname, hiddenPatterns);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // --- Phone Formatting State and Handler ---
  const [phoneValue, setPhoneValue] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbersOnly = input.replace(/\D/g, "");
    let formattedNumber = numbersOnly;
    if (numbersOnly.length > 0) {
      formattedNumber = `(${numbersOnly.slice(0, 3)}`;
    }
    if (numbersOnly.length >= 4) {
      formattedNumber += `) ${numbersOnly.slice(3, 6)}`;
    }
    if (numbersOnly.length >= 7) {
      formattedNumber += `-${numbersOnly.slice(6, 10)}`;
    }
    setPhoneValue(formattedNumber);
  };
  // ------------------------------------------

  // --- Scroll Lock & Mount Logic ---
  useEffect(() => {
    // defer mounting flag to next rAF to avoid sync setState warnings
    const id = requestAnimationFrame(() => setIsMounted(true));
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  // initialize shouldHide lazily
  const [shouldHide, setShouldHide] = useState<boolean | null>(() =>
    computeShouldHide()
  );

  useEffect(() => {
    const newValue = computeShouldHide();
    setShouldHide((prev) => (prev === newValue ? prev : newValue));
    const onPop = () => {
      const nv = computeShouldHide();
      setShouldHide((prev) => (prev === nv ? prev : nv));
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("pushstate" as any, onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("pushstate" as any, onPop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(hiddenPatterns)]);

  if (shouldHide === null) return null;
  if (shouldHide) return null;

  // countdown
  const [daysLeft, setDaysLeft] = useState<number>(
    Math.max(0, Math.floor(countdownDays ?? 0))
  );
  useEffect(() => {
    setDaysLeft(Math.max(0, Math.floor(countdownDays ?? 0)));
    if (!countdownDays || countdownDays <= 0) return;
    const id = setInterval(() => {
      setDaysLeft((d) => (d > 0 ? d - 1 : 0));
    }, 1000 * 60 * 60 * 24);
    return () => clearInterval(id);
  }, [countdownDays]);

  const safeMessage = DOMPurify.sanitize(message, {
    USE_PROFILES: { html: true },
  });

  // Compute style once (deterministic from props)
  const containerStyle = useMemo<React.CSSProperties>(() => {
    const s: React.CSSProperties = { zIndex: zIndex ?? 60 };

    // Resolve possible Strapi image object or string
    let bgVal: string | undefined;
    if (!backgroundColor) {
      bgVal = undefined;
    } else if (typeof backgroundColor === "string") {
      bgVal = backgroundColor.trim();
    } else if (typeof backgroundColor === "object") {
      // support Strapi style object: { data: { attributes: { url: "/uploads/..." } } } or { url: "/uploads/..." }
      const maybeUrl =
        (backgroundColor as any)?.url ??
        (backgroundColor as any)?.data?.attributes?.url ??
        (backgroundColor as any)?.data?.attributes?.formats?.thumbnail?.url;
      bgVal = maybeUrl ? String(maybeUrl).trim() : undefined;
    }

    // If looks like image, prefix relative paths with env base and set background-image
    if (bgVal && looksLikeImage(bgVal)) {
      let bgUrl = bgVal;
      const base =
        (process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES ?? "").replace(
          /\/$/,
          ""
        );
      if (bgUrl.startsWith("/") && base) {
        bgUrl = `${base}${bgUrl}`;
      }
      // ensure proper quoting in CSS url()
      s.backgroundImage = `url("${bgUrl}")`;
     
      s.backgroundPosition = "center";
      s.backgroundRepeat = "no-repeat";
       s.backgroundSize = "cover";
      //  s.backgroundSize = "contain";
      // optional: ensure text remains readable when image is dark/light
      // s.backgroundColor = s.backgroundColor ?? "rgba(0,0,0,0.2)";
    } else if (bgVal) {
      // treat as plain color string
      s.background = bgVal;
    } else {
      // fallback background if nothing provided
      s.background = "#1f2937";
    }
    // if(showButton==true){
    //   s.paddingRight="60px";
    //   console.log("Padding right set to 60px because showButton is true");
    // }else{
    //   s.paddingRight="0px";
    //   console.log("Padding right set to 0px because showButton is false");
    // }
    return s;
  }, [backgroundColor, zIndex]);

  const popupContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white fixed top-2  rounded-xl  shadow-xl">
        {/* <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={() => setIsPopupOpen(false)}
        >
          ✕
        </button> */}

        <SignupCustomerForm onClose={() => setIsPopupOpen(false)} />
      </div>
    </div>
  );

  return (
    <>
      <div
        className={className || ""}
        style={containerStyle}
        role="region"
        aria-label="Global promotion banner"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-3 text-white">
          {promoImage ? (
            <div className="flex items-center gap-2">
              <Image
                src={resolveImageUrl(promoImage)}
                alt="Promo"
                className="h-8 w-auto object-contain"
                width={32}
                height={32}
                unoptimized
              />
            </div>
          ) : (
            offer && (
              <div className="flex items-center gap-2">
                <div className="bg-orange-600 text-xs font-bold px-2 py-1 rounded">
                  {offer}
                </div>
              </div>
            )
          )}

          <div className="min-w-[200px] text-center md:text-left">
            <span
              className="font-semibold"
              style={{ color: colorTitle || "white" }}
            >
              {title}{" "}
            </span>
            <span
              className="font-semibold"
              style={{ color: colorSubTitle || "white" }}
              dangerouslySetInnerHTML={{ __html: safeMessage }}
            />
          </div>

          {Number(countdownDays) > 0 && (
            <div className="flex items-center gap-1 text-sm bg-blacc/40 px-3 py-1 rounded">
              <span className="flex flex-col items-end">
                <span className="uppercase tracking-wide text-[8px] font-bold">
                  Offer{" "}
                </span>
                <span className="uppercase tracking-wide text-[8px] font-bold">
                  ends in
                </span>
              </span>
              <span className="bg-white text-black font-bold px-2 py-[2px] rounded">
                {daysLeft}
              </span>
              <span className="text-xs font-bold">Days</span>
            </div>
          )}

          {ctaText && showButton && (
            <button
              onClick={() => setIsPopupOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-full text-sm transition-colors"
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>

      {isMounted &&
        isPopupOpen &&
        ReactDOM.createPortal(popupContent, document.body)}
    </>
  );
};

export default GlobalPromo;