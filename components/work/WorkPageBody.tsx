"use client";

import { DepartmentMarquee } from "@/components/ui/DepartmentMarquee";
import { Departments } from "@/components/work/Departments";
import { ClientSpread } from "@/components/work/ClientSpread";

export function WorkPageBody() {
  return (
    <>
      <ClientSpread />

      <Departments />

      <section className="pb-16 pt-10 md:pb-20 md:pt-12">
        <DepartmentMarquee fadeFrom="background" />
      </section>
    </>
  );
}
