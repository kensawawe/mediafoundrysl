"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Badge } from "@/components/ui/Badge";

const departments = [
  {
    code: "PR",
    label: "Production",
    duration: "40s",
    items: [
      "Brand Films",
      "Commercials",
      "Documentary Films",
      "Social Impact Films",
      "Corporate Films",
      "Photography",
      "Podcast Production",
      "Post-Production",
    ],
  },
  {
    code: "CR",
    label: "Creative",
    duration: "46s",
    reverse: true,
    items: [
      "Brand Identity",
      "Brand Naming",
      "Campaign Concepts",
      "Creative Direction",
      "Graphic Design",
      "Content Creation",
      "Copywriting",
      "Editorial Design",
    ],
  },
  {
    code: "ST",
    label: "Strategy",
    duration: "36s",
    items: [
      "Brand Strategy",
      "Communications Strategy",
      "Content Strategy",
      "Campaign Strategy",
      "Digital Strategy",
      "Brand Positioning",
    ],
  },
  {
    code: "DV",
    label: "Development",
    duration: "42s",
    reverse: true,
    items: [
      "Concept Development",
      "Product Development",
      "Story Development",
      "Web Development",
      "Content Series Development",
      "Digital Product Development",
    ],
  },
  {
    code: "DG",
    label: "Distribution & Growth",
    duration: "38s",
    items: [
      "Social Media Management",
      "Content Distribution",
      "Community Building",
      "Digital Marketing",
      "Paid Advertising",
      "Influencer Marketing",
    ],
  },
  {
    code: "RI",
    label: "Research & Insights",
    duration: "44s",
    reverse: true,
    items: [
      "Brand Research",
      "Competitive Analysis",
      "Consumer Insights",
      "Cultural Research",
      "Trend Analysis",
      "Impact Research",
    ],
  },
];

const badgeClass =
  "rounded-full border-border-subtle bg-surface-2 px-3 py-1.5 text-xs text-foreground/80";

/**
 * The scrolling department/skill-tag rows — factored out of Roadblocks so
 * the marquee alone (no heading, no feature grid) can also run on its own
 * elsewhere on the site.
 */
export function DepartmentMarquee({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative overflow-hidden">
        {/* Positioned at 10% (the content padding below), not 0 — with
            padding on the content instead of the edges, a plain left-0/
            right-0 fade would sit in the empty padding gutter rather
            than over the actual edge of the scrolling pills. */}
        <div className="pointer-events-none absolute inset-y-0 left-[10%] z-10 w-10 bg-linear-to-r from-surface sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-[10%] z-10 w-10 bg-linear-to-l from-surface sm:w-20" />

        <div className="flex flex-col space-y-2 px-[10%]">
          {departments.map((dept) => (
            <Marquee
              key={dept.code}
              style={{ "--duration": dept.duration, "--gap": "0.5rem" } as React.CSSProperties}
              repeat={4}
              reverse={dept.reverse}
            >
              {dept.items.map((item) => (
                <Badge key={item} variant="outline" className={badgeClass}>
                  {item}
                </Badge>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </div>
  );
}
