export type SectorSlot = {
  label: string;
  /** 2-3 stop colors for that sector's molten swatch — deliberately the one
   *  place outside the signature motion primitives where color runs free. */
  gradient: string[];
};

export const sectorSlots: SectorSlot[] = [
  { label: "Technology", gradient: ["#ffffff", "#2451d6"] },
  { label: "Hospitality & Travel", gradient: ["#fbbf24", "#f97316", "#ef4444"] },
  { label: "Financial Services", gradient: ["#374151", "#9ca3af"] },
  { label: "Health & Wellness", gradient: ["#22c55e", "#14b8a6"] },
  { label: "Retail & CPG", gradient: ["#ec4899", "#a855f7"] },
  { label: "Entertainment", gradient: ["#6366f1", "#d946ef"] },
  { label: "Non-Profit", gradient: ["#f59e0b", "#fb7185"] },
  { label: "Education", gradient: ["#1e3a8a", "#38bdf8"] },
];
