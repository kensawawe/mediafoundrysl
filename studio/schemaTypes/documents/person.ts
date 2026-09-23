import { defineType, defineField } from "sanity";

/**
 * A real person at the studio. Used both for the Team section (about page)
 * and as a Journal article's author credit — the same person shouldn't be
 * two separate records, so editing a name or photo here updates it
 * everywhere it's shown.
 */
export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "role",
      title: "Role / title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Optional — without one, the site shows a plain placeholder frame with their initials.",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
      description: "Only used on Journal article credits. Leave empty rather than guess a profile URL.",
    }),
    defineField({
      name: "showOnTeamPage",
      title: "Show on the Team page",
      type: "boolean",
      initialValue: false,
      description: "Turn on for people who should appear in the About page's Team section.",
    }),
    defineField({
      name: "teamOrder",
      title: "Team page order",
      type: "number",
      description: "Lower numbers appear first. Only matters when \"Show on the Team page\" is on.",
      hidden: ({ document }) => !document?.showOnTeamPage,
    }),
  ],
  orderings: [
    {
      title: "Team order",
      name: "teamOrderAsc",
      by: [{ field: "teamOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role.en", media: "image" },
  },
});
