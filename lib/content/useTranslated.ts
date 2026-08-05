"use client";

import { useLanguage } from "@/components/layout/LanguageProvider";

/** Picks the matching-language variant of a content export — call with the
 *  English and Krio versions of the same `lib/content/*` export. */
export function useTranslated<T>(en: T, kri: T): T {
  const { lang } = useLanguage();
  return lang === "kri" ? kri : en;
}
