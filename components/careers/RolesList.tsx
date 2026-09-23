"use client";

import { FadeIn } from "@/components/ui/RevealText";
import { careersPageCopy as copyEn, type Role } from "@/lib/content/careers";
import { careersPageCopy as copyKri } from "@/lib/content/careers.kri";
import { useTranslated } from "@/lib/content/useTranslated";
import { site } from "@/lib/content/site";

export function RolesList({ roles: rolesByLang }: { roles: { en: Role[]; kri: Role[] } }) {
  const roles = useTranslated(rolesByLang.en, rolesByLang.kri);
  const copy = useTranslated(copyEn, copyKri);

  return (
    <div>
      <div className="divide-y divide-border-subtle border-y border-border-subtle">
        {roles.map((role, i) => (
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
    </div>
  );
}
