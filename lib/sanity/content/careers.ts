import { fetchWithFallback } from "@/lib/sanity/fetchWithFallback";
import {
  pillars as pillarsEnLocal,
  applicationSteps as applicationStepsEnLocal,
  roles as rolesEnLocal,
  type Pillar,
  type ApplicationStep,
  type Role,
} from "@/lib/content/careers";
import {
  pillars as pillarsKriLocal,
  applicationSteps as applicationStepsKriLocal,
  roles as rolesKriLocal,
} from "@/lib/content/careers.kri";

type SanityLocaleString = { en: string; kri: string };

type SanityPillar = { _id: string; title: SanityLocaleString; description: SanityLocaleString };
type SanityApplicationStep = { _id: string; title: SanityLocaleString; description: SanityLocaleString };
type SanityRole = {
  _id: string;
  title: string;
  employmentType: Role["type"];
  location: SanityLocaleString;
  department: { label: SanityLocaleString } | null;
  isOpen: boolean;
};

const PILLARS_QUERY = `*[_type == "pillar"] | order(order asc) { _id, title, description }`;
const APPLICATION_STEPS_QUERY = `*[_type == "applicationStep"] | order(order asc) { _id, title, description }`;
const ROLES_QUERY = `*[_type == "role" && isOpen == true] | order(order asc) {
  _id, title, employmentType, location, isOpen,
  department -> { label }
}`;

function toPillars(rows: SanityPillar[], lang: "en" | "kri"): Pillar[] {
  return rows.map((row) => ({ title: row.title[lang], description: row.description[lang] }));
}

function toApplicationSteps(rows: SanityApplicationStep[], lang: "en" | "kri"): ApplicationStep[] {
  return rows.map((row) => ({ title: row.title[lang], description: row.description[lang] }));
}

function toRoles(rows: SanityRole[], lang: "en" | "kri"): Role[] {
  return rows.map((row) => ({
    title: row.title,
    department: row.department?.label[lang] ?? "",
    type: row.employmentType,
    location: row.location[lang],
  }));
}

/**
 * The Careers page's repeatable content — pillars, the "How to Apply"
 * steps, and open roles — each falling back to its local lib/content file
 * independently, so e.g. adding roles in Sanity doesn't require pillars to
 * exist there too.
 *
 * The hero headline/statement and the small page-chrome labels
 * (careersHero, careersPageCopy) stay on local content for now — see
 * studio/schemaTypes/documents/siteCopy.ts for wiring those up next.
 */
export async function getCareersContent(): Promise<{
  pillars: { en: Pillar[]; kri: Pillar[] };
  applicationSteps: { en: ApplicationStep[]; kri: ApplicationStep[] };
  roles: { en: Role[]; kri: Role[] };
}> {
  const [pillarRows, stepRows, roleRows] = await Promise.all([
    fetchWithFallback<SanityPillar[]>(PILLARS_QUERY, []),
    fetchWithFallback<SanityApplicationStep[]>(APPLICATION_STEPS_QUERY, []),
    fetchWithFallback<SanityRole[]>(ROLES_QUERY, []),
  ]);

  return {
    pillars:
      pillarRows.length > 0
        ? { en: toPillars(pillarRows, "en"), kri: toPillars(pillarRows, "kri") }
        : { en: pillarsEnLocal, kri: pillarsKriLocal },
    applicationSteps:
      stepRows.length > 0
        ? { en: toApplicationSteps(stepRows, "en"), kri: toApplicationSteps(stepRows, "kri") }
        : { en: applicationStepsEnLocal, kri: applicationStepsKriLocal },
    roles:
      roleRows.length > 0
        ? { en: toRoles(roleRows, "en"), kri: toRoles(roleRows, "kri") }
        : { en: rolesEnLocal, kri: rolesKriLocal },
  };
}
