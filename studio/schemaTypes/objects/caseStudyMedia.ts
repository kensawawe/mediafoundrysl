import { defineType, defineField } from "sanity";

/** A gallery item, or the hero media label, on a case-study page — a
 *  captioned placeholder frame rather than an uploaded file, matching the
 *  site's current Slate-placeholder gallery convention. */
export const caseStudyMedia = defineType({
  name: "caseStudyMedia",
  title: "Media placeholder",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: { list: ["video", "photo"] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "label", title: "Caption", type: "localeString", validation: (rule) => rule.required() }),
    defineField({
      name: "category",
      title: "Category tag (optional)",
      type: "string",
      description: "Shown as a small tag on the placeholder frame — leave blank to show none.",
    }),
  ],
  preview: {
    select: { title: "label.en", subtitle: "variant" },
  },
});
