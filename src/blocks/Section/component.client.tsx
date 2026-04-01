/* eslint-disable @typescript-eslint/no-explicit-any */
// File: component.client.tsx
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { DropZone } from '@wecre8websites/strapi-page-builder-react';
import { resolveImageUrl } from '@/lib/imageResolver';
import Link from 'next/link';
export interface SectionProps {
  id?: string;
  isGlobal?: boolean;
  globalKey?: string;

  layout?: 'flex' | 'grid';

  // flex
  flexDirection?: 'row' | 'column';
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  flexWrap?: 'wrap' | 'nowrap';

  // grid
  columns?: number;
  gap?: number;
  columnsMobile?: number;
  columnsTablet?: number;
  columnsDesktop?: number;

  // appearance
  padding?: string;
  paddingMobile?: string;
  paddingTablet?: string;
 

  marginTop?: string;
  marginBottom?: string;

  backgroundColor?: string;
  borderRadius?: string;
  backgroundImage?: string;
  backgroundSize?: 'cover' | 'contain' | 'auto';
  backgroundPosition?: string;
  backgroundOverlay?: string;
  navigateTo?: string;
  // sizing
  minHeight?: string;

  // container
  container?: 'full' | 'screen' | '7xl' | '6xl' | '5xl' | 'custom';
  maxWidth?: string;

  // visibility
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;

  // positioning
  position?: 'static' | 'relative' | 'absolute';
  zIndex?: number;
  overflow?: 'visible' | 'hidden' | 'auto';
// flex
flexDirectionMobile?: 'row' | 'column'
flexDirectionTablet?: 'row' | 'column'
flexDirectionDesktop?: 'row' | 'column'

alignMobile?: 'start' | 'center' | 'end'
alignTablet?: 'start' | 'center' | 'end'
alignDesktop?: 'start' | 'center' | 'end'

justifyMobile?: 'start' | 'center' | 'end' | 'between' | 'around'
justifyTablet?: 'start' | 'center' | 'end' | 'between' | 'around'
justifyDesktop?: 'start' | 'center' | 'end' | 'between' | 'around'
  allow?: Array<{ name?: string } | string> | string;
}

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const MOBILE_MAX = 639;
const TABLET_MAX = 1023;

const getBpFromWidth = (w: number): Breakpoint =>
  w <= MOBILE_MAX ? 'mobile' : w <= TABLET_MAX ? 'tablet' : 'desktop';

const useBreakpoint = (): Breakpoint => {
  const [bp, setBp] = useState<Breakpoint>(() =>
    typeof window !== 'undefined' ? getBpFromWidth(window.innerWidth) : 'desktop'
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => {
      const next = getBpFromWidth(window.innerWidth);
      setBp((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return bp;
};


const Section: React.FC<SectionProps> = ({
  id = 'section',

  layout = 'flex',

  // flex base
  flexDirection = 'column',
  align = 'center',
  justify = 'center',

  // responsive flex
  flexDirectionMobile,
  flexDirectionTablet,
  flexDirectionDesktop,

  alignMobile,
  alignTablet,
  alignDesktop,

  justifyMobile,
  justifyTablet,
  justifyDesktop,

  // grid
  columns = 3,
  gap = 24,
  columnsMobile,
  columnsTablet,
  columnsDesktop,

  flexWrap = 'nowrap',

  navigateTo = '',

  padding = 'py-12 px-6',
  paddingMobile,
  paddingTablet,

  marginTop = '',
  marginBottom = '',

  backgroundColor = 'transparent',
  backgroundImage = '',
  backgroundSize = 'cover',
  borderRadius = '',
  backgroundPosition = 'center',
  backgroundOverlay = '',

  minHeight = '',

  container = '7xl',
  maxWidth = '',

  hideOnMobile,
  hideOnTablet,
  hideOnDesktop,

  position = 'relative',
  zIndex,
  overflow = 'visible',

  allow,
})  => {
  const bp = useBreakpoint();

  const effectiveColumns = useMemo(() => {
    if (bp === 'mobile' && typeof columnsMobile === 'number') return Math.max(1, columnsMobile);
    if (bp === 'tablet' && typeof columnsTablet === 'number') return Math.max(1, columnsTablet);
    if (bp === 'desktop' && typeof columnsDesktop === 'number') return Math.max(1, columnsDesktop);
    return Math.max(1, columns);
  }, [bp, columns, columnsMobile, columnsTablet, columnsDesktop]);
const effectiveFlexDirection = useMemo(() => {
  if (bp === 'mobile' && flexDirectionMobile) return flexDirectionMobile
  if (bp === 'tablet' && flexDirectionTablet) return flexDirectionTablet
  if (bp === 'desktop' && flexDirectionDesktop) return flexDirectionDesktop
  return flexDirection
}, [bp, flexDirection, flexDirectionMobile, flexDirectionTablet, flexDirectionDesktop])

const effectiveAlign = useMemo(() => {
  if (bp === 'mobile' && alignMobile) return alignMobile
  if (bp === 'tablet' && alignTablet) return alignTablet
  if (bp === 'desktop' && alignDesktop) return alignDesktop
  return align
}, [bp, align, alignMobile, alignTablet, alignDesktop])

const effectiveJustify = useMemo(() => {
  if (bp === 'mobile' && justifyMobile) return justifyMobile
  if (bp === 'tablet' && justifyTablet) return justifyTablet
  if (bp === 'desktop' && justifyDesktop) return justifyDesktop
  return justify
}, [bp, justify, justifyMobile, justifyTablet, justifyDesktop])
 const alignCls =
  effectiveAlign === 'start'
    ? 'items-start'
    : effectiveAlign === 'end'
    ? 'items-end'
    : 'items-center';
  const justifyCls =
  effectiveJustify === 'start'
    ? 'justify-start'
    : effectiveJustify === 'end'
    ? 'justify-end'
    : effectiveJustify === 'between'
    ? 'justify-between'
    : effectiveJustify === 'around'
    ? 'justify-around'
    : 'justify-center';

  const wrapCls = flexWrap === 'wrap' ? 'flex-wrap' : 'flex-nowrap';

  // allow normalize
  let allowedArray: string[] | undefined;
  if (typeof allow === 'string') {
    allowedArray = allow.split(',').map((s) => s.trim()).filter(Boolean);
  } else if (Array.isArray(allow)) {
    const arr: string[] = [];
    for (const it of allow) {
      if (!it) continue;
      if (typeof it === 'string') arr.push(it);
      else if (typeof it === 'object' && (it as any).name) arr.push((it as any).name);
    }
    allowedArray = arr.length ? arr : undefined;
  }

const containerBaseCls =
  layout === 'grid'
    ? `grid ${justifyCls} ${alignCls}`
    : `flex ${effectiveFlexDirection === 'row' ? 'flex-row' : 'flex-col'} ${wrapCls} ${alignCls} ${justifyCls}`
  const containerStyle: React.CSSProperties =
    layout === 'grid'
      ? {
          gap: `${gap}px`,
          gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))`,
        }
      : { gap: `${gap}px` };

  // container width classes
  const containerWidthCls =
    container === 'full'
      ? 'w-full'
      : container === 'screen'
      ? 'max-w-screen-xl mx-auto'
      : container === '6xl'
      ? 'max-w-6xl mx-auto'
      : container === '5xl'
      ? 'max-w-5xl mx-auto'
      : container === 'custom'
      ? `${maxWidth} mx-auto`
      : 'max-w-7xl mx-auto';

  // responsive padding
  const responsivePadding = `
    ${paddingMobile || padding}
    ${paddingTablet ? `md:${paddingTablet}` : ''}
    ${padding ? `lg:${padding}` : ''}
  `;

  // visibility
  const visibilityCls = `
    ${hideOnMobile ? 'hidden sm:block' : ''}
    ${hideOnTablet ? 'md:hidden lg:block' : ''}
    ${hideOnDesktop ? 'lg:hidden' : ''}
  `;

  // wrapper classes


const sectionStyle: React.CSSProperties = {};

if (borderRadius) sectionStyle.borderRadius = borderRadius;
if (zIndex !== undefined) sectionStyle.zIndex = zIndex;

// Detect raw color
// Detect raw color (hex, rgb, gradient)
const isRawColor =
  backgroundColor?.startsWith('#') ||
  backgroundColor?.startsWith('rgb') ||
  backgroundColor?.startsWith('linear');

// Apply solid color (base layer)
if (isRawColor && !backgroundColor?.startsWith('linear')) {
  sectionStyle.backgroundColor = backgroundColor;
}

// Build layered background images
const backgroundLayers: string[] = [];

// Gradient background (full gradient string)
if (backgroundColor?.startsWith('linear')) {
  backgroundLayers.push(backgroundColor);
}

// Overlay gradient
if (backgroundOverlay) {
  backgroundLayers.push(`linear-gradient(${backgroundOverlay}, ${backgroundOverlay})`);
}

// Background image
if (backgroundImage) {
  backgroundLayers.push(`url(${resolveImageUrl(backgroundImage)})`);
}

// Apply layered background image if any
if (backgroundLayers.length > 0) {
  sectionStyle.backgroundImage = backgroundLayers.join(', ');
  sectionStyle.backgroundSize = backgroundSize || 'cover';
  sectionStyle.backgroundPosition = backgroundPosition || 'center';
  sectionStyle.backgroundRepeat = 'no-repeat';
}
const wrapperClass = `
  ${!isRawColor ? backgroundColor : ''}
  ${responsivePadding}
  ${marginTop}
  ${marginBottom}
  ${minHeight}
  ${visibilityCls}
  ${position}
  ${overflow}
  relative
`.trim();
const sectionContent = (
  <section
    id={id}
    className={`${wrapperClass} stats-section ${navigateTo ? 'cursor-pointer' : ''}`}
    style={sectionStyle}
  >
    <div className={containerWidthCls}>
      <DropZone
        zone={`${id}-dropzone`}
        className={`${containerBaseCls} w-full`}
        style={containerStyle as any}
        allow={allowedArray}
      />
    </div>
  </section>
);

if (navigateTo) {
  return (
    <Link href={navigateTo} className="block">
      {sectionContent}
    </Link>
  );
}

return sectionContent;

};

export default Section;
