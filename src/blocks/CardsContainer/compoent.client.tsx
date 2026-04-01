'use client';
import React from 'react';
import Card from '../CardsBlock/component.client';
import { CardProps } from '../CardsBlock/component.client';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export type CardsContainerProps = {
  title?: string;
  items?: CardProps[];
  showArrows?: boolean;
  gap?: number;
    isGlobal?: boolean;
  globalKey?: string;
};

const CardsContainer: React.FC<CardsContainerProps> = ({
  title = 'Practices switch to Adit because we deliver results!',
  items = [],
  showArrows = true,
  gap = 6,
  isGlobal
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);
  
  return (
    <section className={shouldGlow ? 'editor-global-glow' : '' +`py-10 bg-gradient-to-b from-slate-50 to-white`}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl text-slate-900 font-extrabold text-center mb-8">{title}</h2>

        <div className="relative">
          {/* horizontal scroll container (simple) */}
          <div
            className="flex overflow-x-auto no-scrollbar space-x-6 pb-6"
            style={{ gap: `${gap * 4}px` }}
          >
            {items.map((it, idx) => (
              <div key={it.id ?? idx} className="flex-shrink-0">
                <Card {...it} />
              </div>
            ))}
          </div>

          {showArrows && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={() => {
                  const c = document.querySelector('.no-scrollbar') as HTMLElement | null;
                  if (c) c.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white flex items-center justify-center shadow"
              >
                ←
              </button>
              <button
                onClick={() => {
                  const c = document.querySelector('.no-scrollbar') as HTMLElement | null;
                  if (c) c.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white flex items-center justify-center shadow"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CardsContainer;
