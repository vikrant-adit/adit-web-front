/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext } from "react";

const FormMapContext = createContext<Record<string, any>>({});

export function FormMapProvider({
  value,
  children,
}: Readonly<{
  value: Record<string, any>;
  children: React.ReactNode;
}>) {
  return (
    <FormMapContext.Provider value={value}>
      {children}
    </FormMapContext.Provider>
  );
}

export function useFormMap() {
  return useContext(FormMapContext);
}
