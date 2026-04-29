
// File: component.client.tsx
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { resolveImageUrl } from '@/lib/imageResolver';
import Link from 'next/link';
export type FlexDirection = 'row' | 'column';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface SectionProps {
  id?: string;
  isGlobal?: boolean;
  globalKey?: string;

  layout?: 'flex' | 'grid';

  // flex
  flexDirection?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
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
flexDirectionMobile?: FlexDirection;
flexDirectionTablet?: FlexDirection;
flexDirectionDesktop?: FlexDirection;

alignMobile?: FlexAlign;
alignTablet?: FlexAlign;
alignDesktop?: FlexAlign;

justifyMobile?: FlexJustify;
justifyTablet?: FlexJustify;
justifyDesktop?: FlexJustify;
  allow?: Array<{ name?: string } | string> | string;
  dropZone?: any;
}

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const MOBILE_MAX = 639;
const TABLET_MAX = 1023;

const getBpFromWidth = (w: number): Breakpoint => {
  if (w <= MOBILE_MAX) return 'mobile';
  if (w <= TABLET_MAX) return 'tablet';
  return 'desktop';
};

const useBreakpoint = (): Breakpoint => {
  const [bp, setBp] = useState<Breakpoint>(() =>
    typeof globalThis === 'undefined' ? 'desktop' : getBpFromWidth(globalThis.innerWidth)
  );

  useEffect(() => {
    if (typeof globalThis === 'undefined') return;
    const onResize = () => {
      const next = getBpFromWidth(globalThis.innerWidth);
      setBp((prev) => (prev === next ? prev : next));
    };
    globalThis.addEventListener('resize', onResize);
    onResize();
    return () => globalThis.removeEventListener('resize', onResize);
  }, []);

  return bp;
};

const getResponsiveValue = <T,>(bp: Breakpoint, defaultVal: T, mobileVal?: T, tabletVal?: T, desktopVal?: T): T => {
  if (bp === 'mobile' && mobileVal !== undefined) return mobileVal;
  if (bp === 'tablet' && tabletVal !== undefined) return tabletVal;
  if (bp === 'desktop' && desktopVal !== undefined) return desktopVal;
  return defaultVal;
};

const getEffectiveColumns = (bp: Breakpoint, col: number, mobile?: number, tablet?: number, desktop?: number) => {
  if (bp === 'mobile' && typeof mobile === 'number') return Math.max(1, mobile);
  if (bp === 'tablet' && typeof tablet === 'number') return Math.max(1, tablet);
  if (bp === 'desktop' && typeof desktop === 'number') return Math.max(1, desktop);
  return Math.max(1, col);
};

const getAlignCls = (al: string) => {
  if (al === 'start') return 'items-start';
  if (al === 'end') return 'items-end';
  return 'items-center';
};

const getJustifyCls = (just: string) => {
  if (just === 'start') return 'justify-start';
  if (just === 'end') return 'justify-end';
  if (just === 'between') return 'justify-between';
  if (just === 'around') return 'justify-around';
  return 'justify-center';
};

const getContainerWidthCls = (cont: string, mw: string) => {
  if (cont === 'full') return 'w-full';
  if (cont === 'screen') return 'max-w-screen-xl mx-auto';
  if (cont === '6xl') return 'max-w-6xl mx-auto';
  if (cont === '5xl') return 'max-w-5xl mx-auto';
  if (cont === 'custom') return `${mw} mx-auto`;
  return 'max-w-7xl mx-auto';
};

const getAllowedArray = (allow: any) => {
  if (!allow) return undefined;
  if (typeof allow === 'string') {
    return allow.split(',').map((s) => s.trim()).filter(Boolean);
  }
  if (Array.isArray(allow)) {
    const arr: string[] = [];
    for (const it of allow) {
      if (!it) continue;
      if (typeof it === 'string') {
        arr.push(it);
      } else if (typeof it === 'object' && 'name' in it && typeof it.name === 'string') {
        arr.push(it.name);
      }
    }
    return arr.length ? arr : undefined;
  }
  return undefined;
};

const getSectionStyle = (
  backgroundColor: string | undefined,
  backgroundImage: string | undefined,
  backgroundOverlay: string | undefined,
  backgroundSize: string | undefined,
  backgroundPosition: string | undefined,
  borderRadius: string | undefined,
  zIndex?: number
) => {
  const style: React.CSSProperties = {};
  if (borderRadius) style.borderRadius = borderRadius;
  if (zIndex !== undefined) style.zIndex = zIndex;

  const isRawColor = backgroundColor?.startsWith('#') || backgroundColor?.startsWith('rgb') || backgroundColor?.startsWith('linear');
  if (isRawColor && !backgroundColor?.startsWith('linear')) {
    style.backgroundColor = backgroundColor;
  }

  const backgroundLayers: string[] = [];
  if (backgroundColor?.startsWith('linear')) backgroundLayers.push(backgroundColor);
  if (backgroundOverlay) backgroundLayers.push(`linear-gradient(${backgroundOverlay}, ${backgroundOverlay})`);
  if (backgroundImage) backgroundLayers.push(`url(${resolveImageUrl(backgroundImage)})`);

  if (backgroundLayers.length > 0) {
    style.backgroundImage = backgroundLayers.join(', ');
    style.backgroundSize = backgroundSize || 'cover';
    style.backgroundPosition = backgroundPosition || 'center';
    style.backgroundRepeat = 'no-repeat';
  }

  return { style, isRawColor };
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
  dropZone: DropZoneSlot,
})  => {
  const bp = useBreakpoint();

  const effectiveColumns = useMemo(() => getEffectiveColumns(bp, columns, columnsMobile, columnsTablet, columnsDesktop), [bp, columns, columnsMobile, columnsTablet, columnsDesktop]);
  const effectiveFlexDirection = useMemo(() => getResponsiveValue(bp, flexDirection, flexDirectionMobile, flexDirectionTablet, flexDirectionDesktop), [bp, flexDirection, flexDirectionMobile, flexDirectionTablet, flexDirectionDesktop]);
  const effectiveAlign = useMemo(() => getResponsiveValue(bp, align, alignMobile, alignTablet, alignDesktop), [bp, align, alignMobile, alignTablet, alignDesktop]);
  const effectiveJustify = useMemo(() => getResponsiveValue(bp, justify, justifyMobile, justifyTablet, justifyDesktop), [bp, justify, justifyMobile, justifyTablet, justifyDesktop]);
  const alignCls = getAlignCls(effectiveAlign);
  const justifyCls = getJustifyCls(effectiveJustify);
  const wrapCls = flexWrap === 'wrap' ? 'flex-wrap' : 'flex-nowrap';

  const allowedArray = useMemo(() => getAllowedArray(allow), [allow]);

  const flexDirCls = effectiveFlexDirection === 'row' ? 'flex-row' : 'flex-col';
  const containerBaseCls = layout === 'grid'
    ? `grid ${justifyCls} ${alignCls}`
    : `flex ${flexDirCls} ${wrapCls} ${alignCls} ${justifyCls}`;
  const containerStyle: React.CSSProperties =
    layout === 'grid'
      ? {
          gap: `${gap}px`,
          gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))`,
        }
      : { gap: `${gap}px` };

  const containerWidthCls = getContainerWidthCls(container, maxWidth);

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


  const { style: sectionStyle, isRawColor } = useMemo(() => 
    getSectionStyle(backgroundColor, backgroundImage, backgroundOverlay, backgroundSize, backgroundPosition, borderRadius, zIndex),
    [backgroundColor, backgroundImage, backgroundOverlay, backgroundSize, backgroundPosition, borderRadius, zIndex]
  );
const wrapperClass = `
  ${isRawColor ? '' : backgroundColor}
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
      {DropZoneSlot ? (
        <DropZoneSlot
          className={`${containerBaseCls} w-full`}
          style={containerStyle}
          allow={allowedArray}
        />
      ) : null}
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
