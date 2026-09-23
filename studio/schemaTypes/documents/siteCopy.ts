import { defineType, defineField } from "sanity";

/**
 * The small page-chrome copy that doesn't belong to any one record — hero
 * headlines, section labels, empty-state text. One document, since there's
 * only ever one of these; the Studio's desk structure prevents creating a
 * second copy.
 */
export const siteCopy = defineType({
  name: "siteCopy",
  title: "Site copy",
  type: "document",
  groups: [
    { name: "team", title: "Team section", default: true },
    { name: "work", title: "Work page" },
    { name: "caseStudy", title: "Case-study page" },
    { name: "careers", title: "Careers page" },
    { name: "journal", title: "Journal" },
  ],
  fields: [
    // --- Team ---
    defineField({ name: "teamSectionLabel", title: "Section label", type: "localeString", group: "team" }),

    // --- Work index page ---
    defineField({ name: "workCastWallHeading", title: "\"The Cast Wall\" heading", type: "localeString", group: "work" }),
    defineField({ name: "workViewAllLabel", title: "\"View all work\" button", type: "localeString", group: "work" }),
    defineField({ name: "workEmptyCategory", title: "Empty-category message", type: "localeString", group: "work" }),
    defineField({
      name: "workClientSpreadHeading",
      title: "Client-spread heading (two lines)",
      type: "object",
      group: "work",
      fields: [
        defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }], validation: (rule) => rule.required().length(2) }),
        defineField({ name: "kri", title: "Krio", type: "array", of: [{ type: "string" }], validation: (rule) => rule.required().length(2) }),
      ],
    }),
    defineField({ name: "workClientSpreadSub", title: "Client-spread subheading", type: "localeText", group: "work" }),
    defineField({ name: "workClientSpreadScrollHint", title: "\"Scroll\" hint label", type: "localeString", group: "work" }),

    // --- Case-study page chrome ---
    defineField({ name: "caseStudyBackToWork", title: "\"Back to work\" link", type: "localeString", group: "caseStudy" }),
    defineField({ name: "caseStudyOverviewLabel", title: "\"Overview\" label", type: "localeString", group: "caseStudy" }),
    defineField({ name: "caseStudyGalleryLabel", title: "\"Gallery\" label", type: "localeString", group: "caseStudy" }),

    // --- Careers hero ---
    defineField({ name: "careersEyebrow", title: "Eyebrow", type: "localeString", group: "careers" }),
    defineField({ name: "careersPortalWord", title: "Portal word (giant scroll-camera word)", type: "localeString", group: "careers" }),
    defineField({ name: "careersPortalEnterLabel", title: "\"Enter section\" skip-link label", type: "localeString", group: "careers" }),
    defineField({ name: "careersTitle", title: "Hero title", type: "localeString", group: "careers" }),
    defineField({
      name: "careersStatement",
      title: "Hero statement (paragraphs)",
      type: "localeParagraphs",
      group: "careers",
    }),
    defineField({ name: "careersRolesHeading", title: "Roles-list heading", type: "localeString", group: "careers" }),
    defineField({ name: "careersNoRoleListed", title: "\"Don't see the right role?\" prompt", type: "localeString", group: "careers" }),
    defineField({ name: "careersIntroduceYourself", title: "\"Introduce yourself anyway\" link", type: "localeString", group: "careers" }),
    defineField({ name: "careersHowToApply", title: "\"How to Apply\" label", type: "localeString", group: "careers" }),
    defineField({ name: "careersApplyLink", title: "\"Apply →\" link", type: "localeString", group: "careers" }),
    defineField({ name: "careersNoRolesInDepartment", title: "No-roles-in-department message", type: "localeString", group: "careers" }),

    // --- Journal ---
    defineField({ name: "journalEyebrow", title: "Eyebrow", type: "localeString", group: "journal" }),
    defineField({ name: "journalTitle", title: "Hero title", type: "localeString", group: "journal" }),
    defineField({ name: "journalBody", title: "Hero body", type: "localeText", group: "journal" }),
    defineField({ name: "journalReadSuffix", title: "\"read\" suffix (e.g. \"4 min read\")", type: "localeString", group: "journal" }),
    defineField({ name: "journalBackToJournal", title: "\"Back to Journal\" link", type: "localeString", group: "journal" }),
    defineField({ name: "journalWrittenBy", title: "\"Written by\" label", type: "localeString", group: "journal" }),
    defineField({ name: "journalReadArticle", title: "\"Read article\" link", type: "localeString", group: "journal" }),
  ],
  preview: {
    prepare: () => ({ title: "Site copy" }),
  },
});
