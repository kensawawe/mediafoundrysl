"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import HalftoneWordmarkFooter from "@/components/ui/HalftoneWordmarkFooter";
import { AwarenessRibbons } from "@/components/home/AwarenessRibbons";

// Site colours for the halftone dots. Dark = the site's navy background with
// the Sierra Leone green as the "warm" colour dots shift to when pushed.
const DARK = { background: "#0d1b3f", ink: "#dfe7ff", warm: "#1eb53a" };
const LIGHT = { background: "#ffffff", ink: "#14120f", warm: "#2451d6" };
// October (Breast Cancer Awareness Month): the dots print in pink.
const DARK_PINK = { background: "#0d1b3f", ink: "#ffb3d6", warm: "#ffffff" };
const LIGHT_PINK = { background: "#ffffff", ink: "#e5338a", warm: "#14120f" };

const noopSubscribe = () => () => {};
/** Reads the <html data-awareness> flag set by the inline script in layout.tsx;
 *  false on the server so hydration matches, then flips on the client. */
function useAwareness() {
  return useSyncExternalStore(
    noopSubscribe,
    () => document.documentElement.dataset.awareness === "pink",
    () => false,
  );
}

/** next/font hashes its family names; the CSS variable holds the real one. */
function wordmarkFamily() {
  if (typeof document === "undefined") return undefined;
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--font-inter");
  const primary = raw.split(",")[0]?.trim();
  return primary ? `${primary}, "Helvetica Neue", Arial, sans-serif` : undefined;
}

/**
 * The giant halftone "foundry" wordmark that closes every page, below the
 * regular footer. The site defaults to light, so that's what renders until
 * the theme resolves.
 */
export function HalftoneFooter() {
  const { resolvedTheme } = useTheme();
  const pink = useAwareness();
  // The server can't know the saved theme or font, so render the default
  // (light) until mounted — otherwise hydration sees different styles.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const light = !mounted || resolvedTheme !== "dark";
  const palette = pink ? (light ? LIGHT_PINK : DARK_PINK) : light ? LIGHT : DARK;

  return (
    <>
      <div
        className="awareness-only overflow-hidden"
        style={{ background: light ? "#ffffff" : "#0d1b3f" }}
      >
        <AwarenessRibbons className="py-2 md:py-4" />
      </div>
      <HalftoneWordmarkFooter
      wordmark="the media foundry"
      showText={false}
      palette={palette}
      fontFamily={mounted ? wordmarkFamily() : undefined}
      fontWeight={900}
      letterSpacing="-0.06em"
      monoFamily={'var(--font-inter), "Helvetica Neue", Arial, sans-serif'}
      dotGap={6}
      crop={0.12}
      fill={0.95}
      height="8.4vw"
      />
    </>
  );
}
