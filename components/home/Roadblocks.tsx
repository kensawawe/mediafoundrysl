"use client";

import { DepartmentMarquee } from "@/components/ui/DepartmentMarquee";

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
      "We clarify what matters. By asking the right questions and stripping away the clutter, we uncover the real story and shape brands that are hard to ignore.",
    Icon: SimplicityIcon,
    title: "We cut through the noise",
  },
  {
    description:
      "Every idea we craft is intentional. We create work that connects, converts, and creates real value, for your audience and your bottom line.",
    Icon: ResultsIcon,
    title: "We build for impact",
  },
  {
    description:
      "Strategy gives our work direction. Creativity gives it life. Together, they produce ideas that not only look good, but move people to act.",
    Icon: ExpertiseIcon,
    title: "We blend strategy + creativity",
  },
  {
    description:
      "Your success is the goal, not the handoff. We partner with you for the long run, adapting, optimizing, and helping you scale with confidence.",
    Icon: SupportIcon,
    title: "We grow with you",
  },
];

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

        <DepartmentMarquee className="mt-12" />

        <div className="mt-16 grid grid-cols-1 divide-dashed divide-border-subtle border-t border-dashed border-border-subtle sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-5 px-5 py-8 last:border-b-0 lg:border-b-0 lg:px-6 lg:py-10"
            >
              <Icon className="size-12 text-foreground/60" />
              <div className="flex flex-col gap-2 pt-4">
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
