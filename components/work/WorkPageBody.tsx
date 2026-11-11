"use client";

import { WorkIndex } from "@/components/work/WorkIndex";
import { ClientSpread } from "@/components/work/ClientSpread";
import type { WorkItem } from "@/lib/content/work";

export function WorkPageBody({ workItems }: { workItems: { en: WorkItem[]; kri: WorkItem[] } }) {
  return (
    <>
      <WorkIndex workItems={workItems} />
      {/* The client scatter is three screens of scroll; on phones it only repeats the
          project index above, so it shows from tablet width up. */}
      <div className="hidden md:block">
        <ClientSpread workItems={workItems} />
      </div>
    </>
  );
}
