
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';
import { resolveImageUrl } from '@/lib/imageResolver';

// default placeholder image (user uploaded) — will be left as local path so your tooling can rewrite it.
const DEFAULT_IMAGE = '/mnt/data/4a40d4a3-baba-486e-b58f-b9816139a797.png';

export type LogoItem = {
  src?: string; // url or relative path
  alt?: string;
  name?: string;
};

export type TabItem = {
  title?: string;
  logos?: LogoItem[];
};

export interface IntegrationBlockProps {
  id?: string;
  background?: string; // tailwind class or color
  fontColor?: string;
  title?: string;
  subtitle?: string;
  tabs?: TabItem[];
  // layout options
  columns?: number; // number of logos per row (visually used via flex-basis)
   isGlobal?: boolean;
  globalKey?: string;
}

function isTailwindClass(s?: string) {
  return typeof s === 'string' && /^[a-z0-9:-]+$/i.test(s);
}

export default function IntegrationBlock({
  id = 'integration-block',
  background = 'bg-gradient-to-tr from-[#E8F7FE] to-white',
  fontColor = '#002D42',
  title = 'Seamless integrations for your practice',
  subtitle = 'Our platform integrates effortlessly with the most widely used practice management systems (PMS)...',
  tabs = [
    {
      title: 'Dental',
      logos: [
        { src: DEFAULT_IMAGE, alt: 'default', name: 'Default' },
        { src: DEFAULT_IMAGE, alt: 'default', name: 'Default 2' },
      ],
    },
  ],
  columns = 5,
  isGlobal
}: Readonly<IntegrationBlockProps>) {
  const { shouldGlow } = useEditorGlow(isGlobal);
  
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // compute a CSS-friendly background
  const wrapperClass = isTailwindClass(background) ? background : '';
  const wrapperStyle: React.CSSProperties = !wrapperClass && background ? { background } : {};
  const titleStyle: React.CSSProperties = { color: isTailwindClass(fontColor) ? undefined : fontColor };

  return (
    <section
      id={id}
      ref={ref}
      className={`${wrapperClass} py-8 sm:py-12 md:py-16 lg:py-20 text-center overflow-hidden ${shouldGlow ? 'editor-global-glow' : ''}`}
      style={{ ...wrapperStyle }}
    >
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5" style={titleStyle}>
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-[95%] sm:max-w-[90%] mx-auto text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 lg:mb-10">
            {subtitle}
          </p>
        ) : null}

        {/* Tabs */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="flex gap-1 sm:gap-2 md:gap-4 justify-center overflow-x-auto w-[98%] sm:w-[95%] md:w-[80%] lg:w-[60%] border-b border-sky-200 pb-2">
            {tabs.map((t, i) => (
              <button
                key={`${t.title}-${i}`}
                type="button"
                onClick={() => setActiveTab(i)}
                aria-pressed={activeTab === i}
                className={`px-2 sm:px-4 md:px-8 py-2 md:py-3 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap transition-all ${
                  activeTab === i
                    ? 'text-orange-500 border-b-2 border-orange-500 font-semibold'
                    : 'text-[#002D42] hover:text-orange-500'
                }`}
              >
                {t.title || `Tab ${i + 1}`}
              </button>
            ))}
          </div>
        </div>

        {/* Logos grid */}
        <div
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-[1000px] mx-auto transition-all ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {(tabs[activeTab]?.logos || []).map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="min-w-[80px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[140px] h-[32px] sm:h-[40px] md:h-[50px] lg:h-[60px] flex items-center justify-center px-2 sm:px-3 md:px-4 bg-white/90 rounded-lg border border-sky-200 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${idx * 0.04}s` }}
            >
              {logo.src ? (
                <Image
                src={resolveImageUrl(logo.src)}
                alt={logo.alt || logo.name || `logo-${idx}`}
                width={100}
                height={60}
                style={{ maxHeight: 'clamp(28px, 8vw, 60px)', objectFit: 'contain' }}
                unoptimized
              />
              ) : (
                <div className="text-xs sm:text-sm text-slate-400">Logo</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

