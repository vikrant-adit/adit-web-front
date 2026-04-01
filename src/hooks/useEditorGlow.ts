'use client';

import { usePathname } from 'next/navigation';
import { isTruthy } from '@/lib/isTruthy';

export function useEditorGlow(isGlobal?: boolean) {
  const pathname = usePathname();
  const isEditor = pathname === '/editor';
  const shouldGlow = isEditor && isTruthy(isGlobal);

  return {
    isEditor,
    shouldGlow,
  };
}
