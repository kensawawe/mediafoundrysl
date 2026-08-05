"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { FadeIn } from "@/components/ui/RevealText";
import { departments as departmentsEn, roles as rolesEn, careersPageCopy as copyEn } from "@/lib/content/careers";
import { departments as departmentsKri, roles as rolesKri, careersPageCopy as copyKri } from "@/lib/content/careers.kri";
import { useTranslated } from "@/lib/content/useTranslated";
import { site } from "@/lib/content/site";

export function RolesList() {
  const departments = useTranslated(departmentsEn, departmentsKri);
  const roles = useTranslated(rolesEn, rolesKri);
  const copy = useTranslated(copyEn, copyKri);
  // The first entry in `departments` is always the "show everything" filter
  // (English "All" / Krio "Ɔl") — using it by position rather than a
  // hardcoded string keeps this language-agnostic, and resetting on
  // language change avoids filtering to a department label from the
  // previous language that no longer matches any role.
  const [active, setActive] = useState<string>(departments[0]);

  useEffect(() => {
    setActive(departments[0]);
  }, [departments]);

  const filtered = active === departments[0] ? roles : roles.filter((r) => r.department === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-border-subtle pb-8">
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => setActive(dept)}
            className={clsx(
              "focus-ring border px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors",
              active === dept
                ? "border-accent-fill bg-accent-fill text-accent-fill-ink"
                : "border-border-subtle hover:border-accent-text hover:text-accent-text",
            )}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="mt-4 divide-y divide-border-subtle border-b border-border-subtle">
        {filtered.map((role, i) => (
          <FadeIn key={role.title} delay={i * 0.04}>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(`Application — ${role.title}`)}`}
              className="focus-ring group grid grid-cols-2 items-center gap-4 py-6 transition-colors hover:bg-surface sm:grid-cols-[2fr_1fr_1fr_1fr_auto]"
            >
              <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                {role.title}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-current/55">
                {role.department}
              </span>
              <span className="hidden font-mono text-xs uppercase tracking-[0.1em] text-current/55 sm:block">
                {role.type}
              </span>
              <span className="col-span-2 font-mono text-xs uppercase tracking-[0.1em] text-current/55 sm:col-span-1">
                {role.location}
              </span>
              <span className="col-span-2 font-mono text-xs uppercase tracking-[0.1em] text-accent-text opacity-0 transition-opacity group-hover:opacity-100 sm:col-span-1">
                {copy.applyLink}
              </span>
            </a>
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 font-mono text-sm text-current/50">{copy.noRolesInDepartment}</p>
      )}
    </div>
  );
}
