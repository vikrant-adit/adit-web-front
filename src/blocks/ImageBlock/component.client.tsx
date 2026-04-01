'use client';
import React from 'react';
import Image from 'next/image';
import { resolveImageUrl } from '@/lib/imageResolver';
import { useEditorGlow } from '@/hooks/useEditorGlow';

export interface ImageBlockProps {
  image?: {
    src?: string;
    alt?: string;
  };
  width?: number;
  height?: number;
  borderRadius?: number;
  margin?: number;
  isGlobal?: boolean;
  globalKey?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({
  image = { src: '', alt: '' },
  width = 800,
  height = 400,
  borderRadius = 12,
  margin = 0,
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  if (!image?.src) {
    return (
      <div className={shouldGlow ? 'editor-global-glow' : ''}>
        <div className="flex items-center justify-center text-gray-500 w-full py-12 rounded-md border">
          No image selected
        </div>
      </div>
    );
  }

  return (
    <div className={shouldGlow ? 'editor-global-glow' : ''}>
      <div className="flex justify-center my-4 px-3 sm:px-6">
        <Image
          src={resolveImageUrl(image.src)}
          alt={image.alt || 'Image'}
          width={1200}
    height={800}
    className="w-full h-auto object-cover"
          unoptimized
          style={{ borderRadius, margin}}
        />
      </div>
    </div>
  );
};

export default ImageBlock;
