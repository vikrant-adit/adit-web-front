'use client';

import { createContext, useContext } from "react";

const EditorContext = createContext(false);

export const EditorProvider = EditorContext.Provider;

export function useIsEditor() {
    console.log("[useIsEditor] called");
  return useContext(EditorContext);
}
