/**
 * One-time (and re-runnable) seed: loads the site's local lib/content/*.ts
 * data into this Sanity project, so Studio starts with real content instead
 * of empty document lists.
 *
 * Every document gets a deterministic _id (derived from a slug or name), so
 * running this again updates existing documents in place via
 * createOrReplace rather than creating duplicates.
 *
 * Run from studio/: npx sanity exec scripts/seed.ts --with-user-token
 */
import path from "node:path";
import fs from "node:fs";
import { getCliClient } from "sanity/cli";

import { teamMembers as teamMembersEn, teamSectionLabel as teamSectionLabelEn } from "../../lib/content/team";
import { teamMembers as teamMembersKri, teamSectionLabel as teamSectionLabelKri } from "../../lib/content/team.kri";
import {
  careersHero as careersHeroEn,
  careersPageCopy as careersPageCopyEn,
  pillars as pillarsEn,
  departments as departmentsEn,
  roles as rolesEn,
  applicationSteps as applicationStepsEn,
} from "../../lib/content/careers";
import {
  careersHero as careersHeroKri,
  careersPageCopy as careersPageCopyKri,
  pillars as pillarsKri,
  departments as departmentsKri,
  roles as rolesKri,
  applicationSteps as applicationStepsKri,
} from "../../lib/content/careers.kri";
import { articles as articlesEn, journalHero as journalHeroEn, journalCopy as journalCopyEn, readSuffix as readSuffixEn } from "../../lib/content/journal";
import { articles as articlesKri, journalHero as journalHeroKri, journalCopy as journalCopyKri, readSuffix as readSuffixKri } from "../../lib/content/journal.kri";
import { workItems as workItemsEn, workCopy as workCopyEn } from "../../lib/content/work";
import { workItems as workItemsKri, workCopy as workCopyKri } from "../../lib/content/work.kri";
import { caseStudies as caseStudiesEn, caseStudyCopy as caseStudyCopyEn } from "../../lib/content/case-studies";
import { caseStudies as caseStudiesKri, caseStudyCopy as caseStudyCopyKri } from "../../lib/content/case-studies.kri";

const client = getCliClient({ apiVersion: "2026-01-01" });
const publicDir = path.resolve(__dirname, "../../public");

// --- helpers ---------------------------------------------------------------

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const assetIdCache = new Map<string, string>();

/** Uploads a public/<path> image once, reusing the asset on later calls. */
async function imageAsset(publicPath: string | undefined) {
  if (!publicPath) return undefined;
  const decoded = decodeURIComponent(publicPath.replace(/^\//, ""));
  if (assetIdCache.has(decoded)) {
    return { _type: "image" as const, asset: { _type: "reference" as const, _ref: assetIdCache.get(decoded)! } };
  }
  const filePath = path.join(publicDir, decoded);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ! missing file, skipping image: ${filePath}`);
    return undefined;
  }
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  assetIdCache.set(decoded, asset._id);
  console.log(`  ↑ uploaded ${decoded}`);
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

const ref = (id: string) => ({ _type: "reference" as const, _ref: id });

async function set(doc: Record<string, unknown> & { _id: string; _type: string }) {
  await client.createOrReplace(doc);
  console.log(`✓ ${doc._type} ${doc._id}`);
}

// --- seed --------------------------------------------------------------

async function seedPeople() {
  // One `person` document per unique name across Team + Journal authors —
  // matches lib/content: the same people are credited in both places.
  type PersonSeed = {
    name: string;
    roleEn: string;
    roleKri: string;
    image?: string;
    socials?: { platform: string; href: string }[];
    showOnTeamPage: boolean;
    teamOrder?: number;
  };
  const byName = new Map<string, PersonSeed>();

  teamMembersEn.forEach((member, i) => {
    byName.set(member.name, {
      name: member.name,
      roleEn: member.role,
      roleKri: teamMembersKri[i]?.role ?? member.role,
      image: member.image,
      showOnTeamPage: true,
      teamOrder: i,
    });
  });

  for (const article of articlesEn) {
    const kriArticle = articlesKri.find((a) => a.slug === article.slug);
    if (!byName.has(article.author.name)) {
      byName.set(article.author.name, {
        name: article.author.name,
        roleEn: article.author.role,
        roleKri: kriArticle?.author.role ?? article.author.role,
        image: article.author.image,
        socials: article.author.socials,
        showOnTeamPage: false,
      });
    } else {
      // Team members credited on an article keep their team record, but
      // pick up that article's socials if the team entry didn't have any.
      const existing = byName.get(article.author.name)!;
      if (!existing.socials?.length && article.author.socials.length) {
        existing.socials = article.author.socials;
      }
    }
  }

  console.log(`\nPeople (${byName.size}):`);
  for (const person of byName.values()) {
    await set({
      _id: `person-${slugify(person.name)}`,
      _type: "person",
      name: person.name,
      role: { en: person.roleEn, kri: person.roleKri },
      image: await imageAsset(person.image),
      socials: person.socials ?? [],
      showOnTeamPage: person.showOnTeamPage,
      teamOrder: person.teamOrder,
    });
  }
}

async function seedDepartments() {
  console.log(`\nDepartments (${departmentsEn.length}):`);
  for (let i = 0; i < departmentsEn.length; i++) {
    await set({
      _id: `department-${slugify(departmentsEn[i])}`,
      _type: "department",
      label: { en: departmentsEn[i], kri: departmentsKri[i] },
      order: i,
    });
  }
}

async function seedRoles() {
  console.log(`\nRoles (${rolesEn.length}):`);
  for (let i = 0; i < rolesEn.length; i++) {
    const en = rolesEn[i];
    const kri = rolesKri[i];
    await set({
      _id: `role-${slugify(en.title)}`,
      _type: "role",
      title: en.title,
      department: ref(`department-${slugify(en.department)}`),
      employmentType: en.type,
      location: { en: en.location, kri: kri.location },
      order: i,
      isOpen: true,
    });
  }
}

async function seedPillars() {
  console.log(`\nPillars (${pillarsEn.length}):`);
  for (let i = 0; i < pillarsEn.length; i++) {
    const en = pillarsEn[i];
    const kri = pillarsKri[i];
    await set({
      _id: `pillar-${slugify(en.title)}`,
      _type: "pillar",
      title: { en: en.title, kri: kri.title },
      description: { en: en.description, kri: kri.description },
      order: i,
    });
  }
}

async function seedApplicationSteps() {
  console.log(`\nApplication steps (${applicationStepsEn.length}):`);
  for (let i = 0; i < applicationStepsEn.length; i++) {
    const en = applicationStepsEn[i];
    const kri = applicationStepsKri[i];
    await set({
      _id: `application-step-${slugify(en.title)}`,
      _type: "applicationStep",
      title: { en: en.title, kri: kri.title },
      description: { en: en.description, kri: kri.description },
      order: i,
    });
  }
}

async function seedWorkItems() {
  console.log(`\nWork items (${workItemsEn.length}):`);
  for (let i = 0; i < workItemsEn.length; i++) {
    const en = workItemsEn[i];
    const kri = workItemsKri[i];
    await set({
      _id: `workItem-${en.slug}`,
      _type: "workItem",
      title: en.title,
      slug: { _type: "slug", current: en.slug },
      hoverTitle: en.hoverTitle,
      category: en.category,
      description: { en: en.description, kri: kri.description },
      client: en.client,
      variant: en.variant,
      size: en.size ?? "md",
      hasCaseStudy: en.hasCaseStudy ?? false,
      restingImage: await imageAsset(en.restingImage),
      hoverImage: await imageAsset(en.hoverImage),
      imageFit: en.imageFit ?? "cover",
      imagePadding: en.imagePadding,
      hoverImageSize: en.hoverImageSize,
      order: i,
    });
  }
}

async function seedCaseStudies() {
  console.log(`\nCase studies (${caseStudiesEn.length}):`);
  for (const en of caseStudiesEn) {
    const kri = caseStudiesKri.find((c) => c.slug === en.slug)!;
    await set({
      _id: `caseStudy-${en.slug}`,
      _type: "caseStudy",
      workItem: ref(`workItem-${en.slug}`),
      slug: { _type: "slug", current: en.slug },
      year: en.year,
      heroMedia: { variant: en.heroMedia.variant, label: { en: en.heroMedia.label, kri: kri.heroMedia.label } },
      useWorkItemImage: en.realHero ?? false,
      overview: { en: en.overview, kri: kri.overview },
      gallery: en.gallery.map((item, i) => ({
        _key: `g${i}`,
        variant: item.variant,
        label: { en: item.label, kri: kri.gallery[i].label },
        category: item.category,
      })),
      impact: en.impact.map((item, i) => ({
        _key: `s${i}`,
        stat: item.stat,
        label: { en: item.label, kri: kri.impact[i].label },
      })),
    });
  }
}

async function seedJournalArticles() {
  console.log(`\nJournal articles (${articlesEn.length}):`);
  for (const en of articlesEn) {
    const kri = articlesKri.find((a) => a.slug === en.slug)!;
    await set({
      _id: `journalArticle-${en.slug}`,
      _type: "journalArticle",
      title: { en: en.title, kri: kri.title },
      slug: { _type: "slug", current: en.slug },
      category: en.category,
      excerpt: { en: en.excerpt, kri: kri.excerpt },
      readTime: en.readTime,
      date: en.date,
      body: { en: en.body, kri: kri.body },
      author: ref(`person-${slugify(en.author.name)}`),
      // `date` is only ever month precision (e.g. "May 2026") — the 1st of
      // that month, not a fabricated day, matching the JSON-LD logic in
      // app/journal/[slug]/page.tsx.
      publishedAt: new Date(`1 ${en.date}`).toISOString(),
    });
  }
}

async function seedSiteCopy() {
  console.log(`\nSite copy:`);
  await set({
    _id: "siteCopy",
    _type: "siteCopy",
    teamSectionLabel: { en: teamSectionLabelEn, kri: teamSectionLabelKri },

    workCastWallHeading: { en: workCopyEn.castWallHeading, kri: workCopyKri.castWallHeading },
    workViewAllLabel: { en: workCopyEn.viewAllWork, kri: workCopyKri.viewAllWork },
    workEmptyCategory: { en: workCopyEn.emptyCategory, kri: workCopyKri.emptyCategory },
    workClientSpreadHeading: { en: workCopyEn.clientSpreadHeading, kri: workCopyKri.clientSpreadHeading },
    workClientSpreadSub: { en: workCopyEn.clientSpreadSub, kri: workCopyKri.clientSpreadSub },

    caseStudyBackToWork: { en: caseStudyCopyEn.backToWork, kri: caseStudyCopyKri.backToWork },
    caseStudyOverviewLabel: { en: caseStudyCopyEn.overview, kri: caseStudyCopyKri.overview },
    caseStudyGalleryLabel: { en: caseStudyCopyEn.gallery, kri: caseStudyCopyKri.gallery },

    careersEyebrow: { en: careersHeroEn.eyebrow, kri: careersHeroKri.eyebrow },
    careersPortalWord: { en: careersHeroEn.portalWord, kri: careersHeroKri.portalWord },
    careersPortalEnterLabel: { en: careersHeroEn.portalEnter, kri: careersHeroKri.portalEnter },
    careersTitle: { en: careersHeroEn.title, kri: careersHeroKri.title },
    careersStatement: { en: careersHeroEn.statement, kri: careersHeroKri.statement },
    careersRolesHeading: { en: careersPageCopyEn.rolesHeading, kri: careersPageCopyKri.rolesHeading },
    careersNoRoleListed: { en: careersPageCopyEn.noRoleListed, kri: careersPageCopyKri.noRoleListed },
    careersIntroduceYourself: { en: careersPageCopyEn.introduceYourself, kri: careersPageCopyKri.introduceYourself },
    careersHowToApply: { en: careersPageCopyEn.howToApply, kri: careersPageCopyKri.howToApply },
    careersApplyLink: { en: careersPageCopyEn.applyLink, kri: careersPageCopyKri.applyLink },
    careersNoRolesInDepartment: {
      en: careersPageCopyEn.noRolesInDepartment,
      kri: careersPageCopyKri.noRolesInDepartment,
    },

    journalEyebrow: { en: journalHeroEn.eyebrow, kri: journalHeroKri.eyebrow },
    journalTitle: { en: journalHeroEn.title, kri: journalHeroKri.title },
    journalBody: { en: journalHeroEn.body, kri: journalHeroKri.body },
    journalReadSuffix: { en: readSuffixEn, kri: readSuffixKri },
    journalBackToJournal: { en: journalCopyEn.backToJournal, kri: journalCopyKri.backToJournal },
    journalWrittenBy: { en: journalCopyEn.writtenBy, kri: journalCopyKri.writtenBy },
    journalReadArticle: { en: journalCopyEn.readArticle, kri: journalCopyKri.readArticle },
  });
}

async function main() {
  console.log(`Seeding project ${client.config().projectId} / dataset ${client.config().dataset}\n`);
  await seedPeople();
  await seedDepartments();
  await seedRoles();
  await seedPillars();
  await seedApplicationSteps();
  await seedWorkItems();
  await seedCaseStudies();
  await seedJournalArticles();
  await seedSiteCopy();
  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
