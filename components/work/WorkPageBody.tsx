"use client";

import { DepartmentMarquee } from "@/components/ui/DepartmentMarquee";
import { Departments } from "@/components/work/Departments";
import { ClientSpread } from "@/components/work/ClientSpread";
import type { WorkItem } from "@/lib/content/work";

export function WorkPageBody({ workItems }: { workItems: { en: WorkItem[]; kri: WorkItem[] } }) {
  return (
    <>
      <ClientSpread workItems={workItems} />

      <Departments />

      <section className="pb-16 pt-10 md:pb-20 md:pt-12">
        <DepartmentMarquee fadeFrom="background" />
      </section>
    </>
  );
}
