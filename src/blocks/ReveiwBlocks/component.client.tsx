/* ----------------------------------------------------- */

// File: reviews-component.client.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import type {  ReviewItem } from './config';
import { useEditorGlow } from '@/hooks/useEditorGlow';
export type ReviewsWidgetProps = {
  id?: string;
  reviews?: ReviewItem[];
  maxHeight?: string; // CSS height value (e.g. '360px' or '40vh')
  showHeader?: boolean;
  showPoweredBy?: boolean;
  className?: string;
  isGlobal?: boolean;
  globalKey?: string;
};
const ReviewsWidget: React.FC<ReviewsWidgetProps> = ({
  reviews = [],
  maxHeight = '360px',
  showHeader = true,
  showPoweredBy = true,
  className = '',
  isGlobal
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);
  
  // normalize reviews (builder might pass object)
  const reviewsArr: ReviewItem[] = Array.isArray(reviews) ? reviews : Object.values(reviews ?? {});

  const listRef = useRef<HTMLDivElement | null>(null);

  // small effect: wire up Read more buttons (works even if scripts are stripped from content areas since this runs in React)
  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const btns = Array.from(root.querySelectorAll('[data-expand-for]')) as HTMLButtonElement[];
    const handler = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const id = btn.dataset.expandFor;
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('clamp-3');
      btn.textContent = el.classList.contains('clamp-3') ? 'Read more' : 'Show less';
    };

    btns.forEach((b) => b.addEventListener('click', handler));
    return () => btns.forEach((b) => b.removeEventListener('click', handler));
  }, [reviewsArr]);

  // helper to compute average
  const avg = (() => {
    if (!reviewsArr.length) return 0;
    const sum = reviewsArr.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    return Math.round((sum / reviewsArr.length) * 10) / 10;
  })();

  return (
    <div className={`reviews-widget max-w-3xl mx-auto bg-white rounded-lg sm:rounded-2xl shadow-md overflow-hidden border border-gray-200 ${className}`}>
      {showHeader && (
        <div className="px-3 sm:px-6 py-3 sm:py-5 bg-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center w-full">
            <div className="flex items-center gap-2">
              <div>
                <div className="text-xs text-gray-600">Total Reviews</div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{reviewsArr.length}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-xs text-gray-600">Average Rating</div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{avg}</div>
                <div className="flex items-center text-amber-400 text-sm sm:text-base" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 sm:w-5 h-4 sm:h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.951c.3.921-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.784.57-1.84-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.063 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="ml-auto">
            <button className="text-sm bg-orange-500 text-white px-3 py-2 rounded-md" aria-label="leave review">Leave a Review</button>
          </div> */}
        </div>
      )}

      <div className="p-0">
        <div
          ref={listRef}
          className="max-h-[360px] overflow-y-auto scrollbox"
          style={{ maxHeight }}
          tabIndex={0}
          aria-label="reviews list"
        >
          {reviewsArr.map((r, idx) => (
            <div key={r.id ?? idx} className="px-6 py-5 reviframerow rev-divider flex gap-4 items-start">
              <div className="w-12 flex-shrink-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center">
                  {/* source icon: simple fallback */}
                  {r.source === 'facebook' ? (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12"/></svg>
                  ) : (
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png" alt="source" className="w-6 h-6" />
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-gray-800">{r.name}</h4>
                  <div className="text-sm text-gray-500">{r.date}</div>
                </div>

                <div className="flex items-center gap-3 mt-1 mb-2">
                  <div className="text-sm text-amber-400">{r.rating ?? '-'}</div>
                  <div className="flex text-amber-400" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.951c.3.921-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.784.57-1.84-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.063 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z"/></svg>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm clamp-3" id={`comment-${r.id ?? idx}`}>
                  {r.comment}
                </p>

                <div className="mt-2">
                  <button data-expand-for={`comment-${r.id ?? idx}`} className="text-xs text-orange-500 hover:underline">Read more</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPoweredBy && (
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-center">
          <span className="text-xs text-gray-400 mr-2">Powered by</span>
          <img src="https://static.adit.com/images/power-by-adit.png" alt="adit" className="h-6" />
        </div>
      )}
    </div>
  );
};

export default ReviewsWidget;
