"use client";
import { createContext, useContext } from "react";

const FormMapContext = createContext<Record<string, any>>({});

export function FormMapProvider({
  value,
  children,
}: {
  value: Record<string, any>;
  children: React.ReactNode;
}) {
  return (
    <FormMapContext.Provider value={value}>
      {children}
    </FormMapContext.Provider>
  );
}

export function useFormMap() {
  return useContext(FormMapContext);
}
