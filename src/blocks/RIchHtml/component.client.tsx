'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export type RichHtmlProps = {
  id?: string; // provided by builder
  html?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  allowUnsafe?: boolean; // set true only for trusted content
  isGlobal?: boolean;
  globalKey?: string;
};

function fallbackSanitize(content: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');

  // Remove all script tags
  for (const element of Array.from(doc.querySelectorAll('script'))) {
    element.remove();
  }

  // Remove inline event handlers and javascript: URLs
  for (const element of Array.from(doc.querySelectorAll('*'))) {
    for (const attribute of Array.from(element.attributes)) {
      const attributeName = attribute.name.toLowerCase();
      const attributeValue = attribute.value.trim().toLowerCase();

      if (attributeName.startsWith('on')) {
        element.removeAttribute(attribute.name);
      }

      if (
        (attributeName === 'href' || attributeName === 'src') &&
        attributeValue.startsWith('javascript:')
      ) {
        element.setAttribute(attribute.name, '#');
      }
    }
  }

  return doc.body.innerHTML;
}

const RichHtml: React.FC<RichHtmlProps> = ({
  html = '<p>Your <strong>rich</strong> content here</p>',
  className = '',
  align = 'left',
  allowUnsafe = false,
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  const [safeHtml, setSafeHtml] = useState<string>('');

  // Store current html so sanitization only re-runs when html changes
  const content = useMemo(() => html || '', [html]);

  useEffect(() => {
    let mounted = true;

    async function sanitize() {
      if (allowUnsafe) {
        if (mounted) {
          setSafeHtml(content);
        }
        return;
      }

      try {
        const DOMPurify = (await import('dompurify')).default;

        const clean = DOMPurify.sanitize(content, {
          USE_PROFILES: { html: true },
          FORCE_BODY: true,

          ADD_TAGS: [
            'style',
            'input',
            'label',
            'button',
            'section',
          ],

          ADD_ATTR: [
            'class',
            'style',
            'id',
            'type',
            'name',
            'for',
            'value',
            'checked',
            'data-index',
            'data-role',
            'data-dot',
            'data-*',
            'aria-label',
            'allow',
            'allowfullscreen',
            'frameborder',
            'src',
            'width',
            'height',
            'loading',
          ],

          ALLOW_DATA_ATTR: true,

          // Explicitly block unsafe tags and attributes
          FORBID_TAGS: ['script'],
          FORBID_ATTR: [
            'onclick',
            'onchange',
            'oninput',
          ],

          ALLOWED_URI_REGEXP:
            /^(?:(?:https?|mailto|tel|ftp):|data:image\/|[^a-z]|[a-z+.-]{1,50}(?:[^a-z+.:-]|$))/i,
        });

        if (mounted) {
          setSafeHtml(clean);
        }
      } catch {
        // Safe fallback without vulnerable regex
        const fallback = fallbackSanitize(content);

        if (mounted) {
          setSafeHtml(fallback);
        }
      }
    }

    sanitize();

    return () => {
      mounted = false;
    };
  }, [content, allowUnsafe]);

  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
      <div
        className={className}
        style={{
          textAlign: align as React.CSSProperties['textAlign'],
        }}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
};

export default RichHtml;