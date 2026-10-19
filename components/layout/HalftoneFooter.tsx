"use client";

import { useTheme } from "next-themes";
import HalftoneWordmarkFooter from "@/components/ui/HalftoneWordmarkFooter";

// Site colours for the halftone dots. Dark = the site's navy background with
// the Sierra Leone green as the "warm" colour dots shift to when pushed.
const DARK = { background: "#0d1b3f", ink: "#dfe7ff", warm: "#1eb53a" };
const LIGHT = { background: "#ffffff", ink: "#14120f", warm: "#2451d6" };

/** next/font hashes its family names; the CSS variable holds the real one. */
function wordmarkFamily() {
  if (typeof document === "undefined") return undefined;
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--font-inter");
  const primary = raw.split(",")[0]?.trim();
  return primary ? `${primary}, "Helvetica Neue", Arial, sans-serif` : undefined;
}

/**
 * The giant halftone "foundry" wordmark that closes every page, below the
 * regular footer. The site defaults to dark, so that's what renders until
 * the theme resolves.
 */
export function HalftoneFooter() {
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === "light" ? LIGHT : DARK;

  return (
    <HalftoneWordmarkFooter
      wordmark="foundry"
      showText={false}
      palette={palette}
      fontFamily={wordmarkFamily()}
      fontWeight={900}
      letterSpacing="-0.06em"
      monoFamily={'var(--font-inter), "Helvetica Neue", Arial, sans-serif'}
      dotGap={6}
      crop={0.12}
      height="19.7vw"
    />
  );
}
