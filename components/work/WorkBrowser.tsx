"use client";

import { WorkCard } from "@/components/work/WorkCard";
import { workItems as workItemsEn } from "@/lib/content/work";
import { workItems as workItemsKri } from "@/lib/content/work.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function WorkBrowser() {
  const workItems = useTranslated(workItemsEn, workItemsKri);

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
      {workItems.map((item, i) => (
        <WorkCard key={item.slug} item={item} delay={(i % 8) * 0.04} />
      ))}
    </div>
  );
}
