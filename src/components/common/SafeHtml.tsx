import React from "react";
import DOMPurify from "dompurify";

type SafeHtmlProps = {
  html: string;
  className?: string;
  // Optionally allow a custom sanitization config (whitelist of tags/attributes)
  // We accept unknown and cast to DOMPurify.Config at call site to avoid
  // incompatible DOM types across environments.
  sanitizeConfig?: unknown;
};

/**
 * SafeHtml
 * Sanitizes untrusted HTML (from APIs) and renders it using
 * `dangerouslySetInnerHTML`. Uses DOMPurify to remove scripts, event handlers
 * and other dangerous content. Applies Tailwind's typography classes by
 * default so HTML content looks consistent.
 *
 * Rationale:
 * - Prevent XSS by sanitizing server-provided or user-generated HTML.
 * - Keep markup semantics and styles while ensuring safety.
 */
const SafeHtml: React.FC<SafeHtmlProps> = ({ html, className = "prose prose-slate", sanitizeConfig }) => {
  // DOMPurify.sanitize is fast and safe for client-side cleaning. If server-side
  // sanitization is available, prefer that and use this as a defense-in-depth.
  const clean = React.useMemo(() => {
    // Some TypeScript setups have incompatible DOM type definitions which
    // cause DOMPurify.Config to be incompatible. Cast to unknown and provide
    // a minimal sanitize signature to avoid using `any` directly (keeps lint happy).
    const purifier = DOMPurify as unknown as { sanitize: (s: string, cfg?: unknown) => string };
    return purifier.sanitize(html, sanitizeConfig);
  }, [html, sanitizeConfig]);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: clean }} aria-label="Sanitized HTML content" />
  );
};

export default SafeHtml;
