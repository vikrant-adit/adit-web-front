'use client';

import React from "react";
import { useIsEditor } from "@/lib/EditorContext";

interface Props {
  readonly isGlobal?: boolean;
  readonly children: React.ReactNode;
}

function isTruthyGlobal(value: boolean | string | undefined) {
  return value === true || value === "true" || value === "1";
}


export default function GlobalHighlight({ isGlobal, children }: Props) {
  const isEditor = useIsEditor();
  const isGlobalTruthy = isTruthyGlobal(isGlobal);

  if (!isEditor || !isGlobalTruthy) {
    console.log(
      "[GlobalHighlight] skipped",
      {
        isEditor,
        isGlobal,
        isGlobalTruthy,
      }
    );

    return <>{children}</>;
  }

  console.log(
    "[GlobalHighlight] ACTIVE",
    {
      isEditor,
      isGlobal,
      isGlobalTruthy,
    }
  );

  return (
    <div className="relative rounded-lg ring-2 ring-cyan-400 ring-offset-2 ring-offset-transparent">
      <span className="absolute -top-3 left-2 z-10 rounded bg-cyan-500 px-2 py-0.5 text-xs text-white">
        Global
      </span>
      {children}
    </div>
  );
}
