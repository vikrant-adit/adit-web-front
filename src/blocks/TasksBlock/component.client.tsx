'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';
import { resolveImageUrl } from '@/lib/imageResolver';
import Image from 'next/image';

export type TaskItem = {
  id: string;
  title: string;
  description: string;
  features: { value: string }[];
  image: string;
};

export interface TasksBlockProps {
  title?: string;
  subtitle?: string;
  items?: TaskItem[];
  ctaText?: string;
  ctaLink?: string;
  isGlobal?: boolean;
  globalKey?: string;
}

const TasksBlock: React.FC<TasksBlockProps> = ({
  title = 'Stay on top of every task, every time',
  subtitle = "No more sticky notes or spreadsheets. Adit's tasks helps your team create, assign, and complete work all from a single, integrated platform.",
  items,
  ctaText = 'Schedule a Demo',
  ctaLink = '/schedule-a-demo',
  isGlobal,
}) => {
  const safeItems = items && Array.isArray(items) ? items : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { shouldGlow } = useEditorGlow(isGlobal);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const id = (entry.target as HTMLElement).dataset.id;
          if (!id) continue;

          const index = safeItems.findIndex((t) => t.id === id);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [safeItems]);

  if (!safeItems || safeItems.length === 0) return null;

 return (
  <section
    className={`${shouldGlow ? 'editor-global-glow' : ''} relative w-full`}
  >
    {/* ================= MOBILE VERSION ================= */}
    <div className="block md:hidden bg-gradient-to-br from-[#062c3d] to-[#0b3f53] text-white px-6 py-12 space-y-16">
  {safeItems.map((item) => (
    <div key={item.id}>
      {item.image && (
        <div className="mb-6">
          <Image
            width={600}
            height={400}
            src={resolveImageUrl(item.image)}
            alt={item.title || 'Image'}
            className="rounded-xl shadow-xl w-full"
            unoptimized
          />
        </div>
      )}

      <h2 className="text-2xl font-semibold leading-snug mb-4">
        {item.title}
      </h2>

      <ul className="space-y-3 mb-6">
        {item.features?.map((f, idx) => {
          const text = typeof f === 'string' ? f : f?.value;
          return (
            <li key={text ?? `feature-${idx}`} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
              <span className="text-sm leading-relaxed">{text}</span>
            </li>
          );
        })}
      </ul>

      {ctaText && (
        <Link
          href={ctaLink}
          className="inline-block bg-[#ff7a00] text-white px-8 py-3 rounded-full font-semibold"
        >
          {ctaText}
        </Link>
      )}
    </div>
  ))}
</div>


    {/* ================= DESKTOP VERSION ================= */}
    <div className="hidden md:block relative w-[90%] mx-auto py-16">
      <div className="flex gap-12 relative">
        {/* LEFT - Timeline Content */}
        <div className="flex-1 relative pl-6">
          {/* Vertical Line */}
          <div className="absolute top-0 right-0 w-[4px] h-full bg-[#A4E4FF] rounded" />

          <div className="flex flex-col gap-20">
            {safeItems.map((item) => (
              <div
                key={item.id}
                data-id={item.id}
                ref={(el) => {
                  sectionRefs.current[item.id] = el;
                }}
                className={`transition-all duration-300 ${
                  safeItems[activeIndex].id === item.id
                    ? 'opacity-100 translate-x-3'
                    : 'opacity-60'
                }`}
              >
                <h3 className="text-3xl font-semibold mb-4 text-[#002b5b]">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mb-6 text-[#444]">{item.description}</p>
                )}

                <ul className="space-y-3 mb-6">
                  {item.features?.map((f, idx) => {
                    const text = typeof f === 'string' ? f : f?.value;
                    return (
                      <li key={text ?? `feature-${idx}`} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[#00d084] rounded-full mt-2"></span>
                        <span className="text-[#333]">{text}</span>
                      </li>
                    );
                  })}
                </ul>

                {ctaText && (
                  <Link
                    href={ctaLink}
                    className="inline-block bg-[#ff7a00] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e56a00]"
                  >
                    {ctaText}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Sticky Image */}
        <div className="flex-1 sticky top-[120px] h-fit">
          {safeItems[activeIndex]?.image && (
            <Image
              width={700}
              height={600}
              key={safeItems[activeIndex].id}
              src={resolveImageUrl(safeItems[activeIndex].image)}
              alt={safeItems[activeIndex].title || 'Image'}
              className="rounded-xl shadow-xl transition-opacity duration-300"
              unoptimized
            />
          )}
        </div>
      </div>
    </div>
  </section>
);

};

export default TasksBlock;
