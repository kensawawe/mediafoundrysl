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

const iconShared = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  fill: "none",
};

function SimplicityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="10" y="10" width="28" height="28" {...iconShared} />
      <path d="M14 34L34 14" {...iconShared} />
    </svg>
  );
}

function ResultsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="6" y="6" width="36" height="36" {...iconShared} />
      <rect x="15" y="15" width="18" height="18" {...iconShared} />
      <rect x="22" y="22" width="4" height="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ExpertiseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M8 16V8h8" {...iconShared} />
      <path d="M40 16V8h-8" {...iconShared} />
      <path d="M8 32v8h8" {...iconShared} />
      <path d="M40 32v8h-8" {...iconShared} />
      <circle cx="24" cy="24" r="7" {...iconShared} />
    </svg>
  );
}

function SupportIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M6 38L18 26L26 34L42 12" {...iconShared} />
      <path d="M32 12H42V22" {...iconShared} />
    </svg>
  );
}

const features = [
  {
    description:
      "No jargon, no overcomplication — just clear steps you can follow to start and grow your business confidently.",
    Icon: SimplicityIcon,
    title: "We make things simple",
  },
  {
    description:
      "Every strategy we create is designed to help you launch faster, grow smarter, and increase profits.",
    Icon: ResultsIcon,
    title: "We focus on real results",
  },
  {
    description:
      "With years of hands-on experience across industries, we bring proven strategies and practical solutions to the table.",
    Icon: ExpertiseIcon,
    title: "We know what works",
  },
  {
    description:
      "From your first idea to scaling your business, we provide ongoing support, not just a one-time plan.",
    Icon: SupportIcon,
    title: "With you all the way",
  },
];

const badgeClass =
  "rounded-full border-border-subtle bg-surface-2 px-4 py-2 text-foreground/80";

export function Roadblocks() {
  return (
    <section className="relative bg-surface pt-20 text-foreground sm:pt-40">
      <div className="mx-auto max-w-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 px-5 text-center md:px-10">
          <h2 className="max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Removing the roadblocks to your success
          </h2>
          <p className="max-w-xl font-body text-base text-foreground/70 md:text-lg">
            It&apos;s easy to get lost in a sea of advice, conflicting opinions,
            and endless &quot;must-dos.&quot; We filter out the noise, focus on
            what truly matters, and give you the kind of clarity that lets
            your business shine in the market.
          </p>
        </div>

        <div className="mt-12 space-y-1">
          {departments.map((dept) => (
            <div
              key={dept.code}
              className="flex items-center gap-4 px-5 sm:gap-8 md:px-10 lg:px-16"
            >
              <span className="w-20 shrink-0 font-mono text-[11px] font-bold uppercase leading-tight tracking-tight text-foreground/50 sm:w-32 sm:text-xs">
                {dept.label}
              </span>
              <div className="relative min-w-0 flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-surface sm:w-20" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-surface sm:w-20" />
                <Marquee
                  style={{ "--duration": dept.duration, "--gap": "1.25rem" } as React.CSSProperties}
                  repeat={4}
                  reverse={dept.reverse}
                >
                  {dept.items.map((item) => (
                    <Badge key={item} size="lg" variant="outline" className={badgeClass}>
                      {item}
                    </Badge>
                  ))}
                </Marquee>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 divide-dashed divide-border-subtle border-t border-dashed border-border-subtle sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-5 px-5 py-8 last:border-b-0 lg:border-b-0 lg:px-6 lg:py-10"
            >
              <Icon className="size-12 text-foreground/60" />
              <div className="flex flex-col gap-2 pt-10 lg:pt-20">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                  {title}
                </h3>
                <p className="font-body leading-relaxed text-foreground/70">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
