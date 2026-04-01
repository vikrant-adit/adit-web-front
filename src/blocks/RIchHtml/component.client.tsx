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

const RichHtml: React.FC<RichHtmlProps> = ({
  html = '<p>Your <strong>rich</strong> content here</p>',
  className = '',
  align = 'left',
  allowUnsafe = false,
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  const [safeHtml, setSafeHtml] = useState<string>('');

  // store current html so sanitization only re-runs when html changes
  const content = useMemo(() => html || '', [html]);

  useEffect(() => {
    let mounted = true;

    async function sanitize() {
      if (allowUnsafe) {
        if (mounted) setSafeHtml(content);
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
            'script',
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
            'onclick',
            'onchange',
            'oninput',
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
          FORBID_ATTR: [],
          ALLOWED_URI_REGEXP: /.*/,
        });

        if (mounted) setSafeHtml(clean);
      } catch {
        // Fallback sanitizer
        const fallback = content
          .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
          .replace(/\son\w+=(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
          .replace(
            /(href|src)\s*=\s*(['"]?)\s*javascript:[^'"]*\2/gi,
            '$1="#"'
          );

        if (mounted) setSafeHtml(fallback);
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
        style={{ textAlign: align as React.CSSProperties['textAlign'] }}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
};

export default RichHtml;
