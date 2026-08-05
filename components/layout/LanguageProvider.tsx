"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "kri";

const STORAGE_KEY = "language";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "kri") setLangState(stored);
  }, []);

  function setLang(next: Language) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

/** Defaults to English until the client hydrates and reads localStorage —
 *  matches the server-rendered markup, same pattern as next-themes'
 *  pre-mount default. */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
