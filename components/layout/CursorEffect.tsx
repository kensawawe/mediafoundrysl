"use client";

import { usePathname } from "next/navigation";
import { EmberTrail } from "@/components/ui/EmberTrail";
import { GradientBlurTrail } from "@/components/home/GradientBlurTrail";

/**
 * The homepage gets the green/white/blue gradient-blob cursor trail;
 * every other page keeps EmberTrail, the site's original single-glow
 * cursor effect. Only one runs at a time.
 */
export function CursorEffect() {
  const pathname = usePathname();
  return pathname === "/" ? <GradientBlurTrail /> : <EmberTrail />;
}
