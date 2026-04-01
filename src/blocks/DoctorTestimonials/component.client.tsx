
'use client';
import { resolveImageUrl } from '@/lib/imageResolver';
import Image from 'next/image';
import React, { useState } from 'react';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export type DoctorTestimonialItem = {
  id: string;
  name: string;
  title: string;
  website?: string;
  quote: string;
  videoUrl: string;
  videoThumbnail: string;
  avatar: string;
};

export type DoctorTestimonialsProps = {
  heading?: string;
  items?: DoctorTestimonialItem[];
  background?: string;
    isGlobal?: boolean;
  globalKey?: string;
};

const DoctorTestimonials: React.FC<DoctorTestimonialsProps> = ({
  heading = 'What our doctors have to say',
  items = [],
  isGlobal
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openVideo, setOpenVideo] = useState(false);

  const active = items[activeIndex];
  if (!active) return null;


  return (
<div className={shouldGlow ? 'editor-global-glow' : ''}>
  <section
    style={{
      padding: 'clamp(48px, 8vw, 96px) clamp(20px, 6vw, 80px)',
      background: '#eaf6fb',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 'clamp(32px, 6vw, 64px)',
      }}
      className="md:flex-row md:items-center"
    >
      {/* LEFT SIDE */}
      <div className="md:w-1/2">
        <h2
          style={{
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 800,
            color: '#062c4e',
            marginBottom: 24,
          }}
        >
          {heading}
        </h2>

        <div style={{ position: 'relative', paddingLeft: 36 }}>
          {/* BIG QUOTE */}
          <span
            style={{
              position: 'absolute',
              left: 0,
              top: -6,
              fontSize: 'clamp(60px, 8vw, 80px)',
              lineHeight: 1,
              color: '#7dd5f5',
              fontWeight: 700,
            }}
          >
            “
          </span>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              lineHeight: 1.9,
              color: '#1f3b57',
              maxWidth: 640,
            }}
          >
            {active.quote}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 text-center">
        <div
          style={{
            borderRadius: 28,
            border: '2px solid #9ddfff',
            padding: 10,
            background: '#fff',
          }}
        >
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 22,
            }}
          >
            <Image
              src={resolveImageUrl(active.videoThumbnail)}
              alt={active.name || 'Image'}
              width={600}
              height={360}
              unoptimized
              style={{
                width: '100%',
                height: 'clamp(240px, 28vw, 360px)',
                objectFit: 'cover',
              }}
            />

            {/* PLAY BUTTON */}
            <button
              onClick={() => setOpenVideo(true)}
              type="button"
              style={{
                position: 'absolute',
                right: 28,
                bottom: 28,
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: 'none',
                background: '#ffffff',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  marginLeft: 4,
                  width: 0,
                  height: 0,
                  borderTop: '12px solid transparent',
                  borderBottom: '12px solid transparent',
                  borderLeft: '18px solid #ff7a2f',
                }}
              />
            </button>
          </div>
        </div>

        {/* NAME + WEBSITE */}
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              fontWeight: 800,
              color: '#062c4e',
            }}
          >
            {active.name}
          </div>

          {active.website && (
            <a
              href={`https://${active.website}`}
              target="_blank"
              style={{
                fontSize: 14,
                color: '#00a0e3',
                display: 'inline-block',
                marginTop: 6,
              }}
            >
              {active.website}
            </a>
          )}
        </div>
      </div>
    </div>

    {/* AVATAR STRIP */}
    <div
      style={{
        marginTop: 'clamp(48px, 6vw, 80px)',
        padding: 'clamp(24px, 4vw, 40px)',
        borderRadius: 40,
        background:
          'linear-gradient(90deg, rgba(224,246,255,0.95), rgba(239,252,255,0.95))',
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(40px, 6vw, 80px)',
        flexWrap: 'wrap',
      }}
    >
      {items.map((t, idx) => {
        const isActive = idx === activeIndex;

        return (
          <button
            key={t.id ?? `${t.name}-${idx}`}
            onClick={() => setActiveIndex(idx)}
            type="button"
            style={{
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all .3s ease',
              opacity: isActive ? 1 : 0.6,
            }}
          >
            <div
              style={{
                width: 'clamp(80px, 9vw, 100px)',
                height: 'clamp(80px, 9vw, 100px)',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: 12,
                border: isActive
                  ? '4px solid #00b5e9'
                  : '3px solid #d7f4ff',
                transition: 'all .3s ease',
              }}
            >
              <Image
                src={resolveImageUrl(t.avatar)}
                alt={t.name || 'Image'}
                width={100}
                height={100}
                unoptimized
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#062c4e',
              }}
            >
              {t.name}
            </div>

            <div
              style={{
                fontSize: 12,
                color: '#00a0e3',
                marginTop: 2,
              }}
            >
              {t.title}
            </div>
          </button>
        );
      })}
    </div>
  </section>

  {/* VIDEO MODAL */}
  {openVideo && (
    <div
      onClick={() => setOpenVideo(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 1000,
          aspectRatio: '16 / 9',
          background: '#000',
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        <iframe
          src={active.videoUrl}
          title={active.name}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </div>
  )}
</div>

  );
};

export default DoctorTestimonials;
