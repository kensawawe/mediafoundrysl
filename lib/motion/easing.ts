export const EASE_OUT = "power2.out";
export const EASE_OUT_SOFT = "power1.out";
export const EASE_INOUT = "power2.inOut";

export const DURATION_SHORT = 0.35;
export const DURATION_BASE = 0.45;
export const DURATION_LONG = 0.9;

export const REVEAL_Y = 14;

export const framerEase = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: REVEAL_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_LONG, ease: framerEase },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION_LONG, ease: framerEase } },
};
