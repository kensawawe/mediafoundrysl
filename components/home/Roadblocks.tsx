"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Badge } from "@/components/ui/Badge";

// Placeholder copy from the original snippet — generic business-coaching
// FAQ questions and feature blurbs, not yet written for The Media Foundry.
const marqueeData = [
  "What's the best business structure for my brand?",
  "What risks should I prepare for?",
  "How do I manage my business finances?",
  "How do I protect my intellectual property?",
  "How do I price my services?",
  "How do I stand out from my competitors?",
  "Who is my ideal customer?",
  "How do I know if my idea is viable?",
  "What business model should I choose?",
  "How much capital do I need to start?",
  "What licenses or permits do I need?",
  "How do I build a strong team?",
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

const badgeClass = "rounded-none border-[#edebbe] bg-[#edebbe] px-3 py-1 text-black";

export function Roadblocks() {
  const third = Math.ceil(marqueeData.length / 3);
  const m1 = marqueeData.slice(0, third);
  const m2 = marqueeData.slice(third, third * 2);
  const m3 = marqueeData.slice(third * 2);

  return (
    <section className="relative bg-yellow-50 pt-20 text-black sm:pt-40 dark:bg-yellow-50 dark:text-black">
      <div className="mx-auto max-w-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 px-5 text-center md:px-10">
          <h2 className="max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Removing the roadblocks to your success
          </h2>
          <p className="max-w-xl font-body text-base md:text-lg">
            It&apos;s easy to get lost in a sea of advice, conflicting opinions,
            and endless &quot;must-dos.&quot; We filter out the noise, focus on
            what truly matters, and give you the kind of clarity that lets
            your business shine in the market.
          </p>

          <div className="relative mx-auto max-w-3xl overflow-hidden">
            <div className="absolute left-0 z-10 h-full w-20 bg-linear-to-r from-yellow-50" />
            <div className="absolute right-0 z-10 h-full w-20 bg-linear-to-l from-yellow-50" />

            <div className="-mx-6 flex w-screen flex-col md:-mx-10 lg:-mx-16">
              <Marquee className="[--duration:45s] [--gap:0.75rem]" repeat={4}>
                {m1.map((q) => (
                  <Badge key={q} size="lg" variant="outline" className={badgeClass}>
                    {q}
                  </Badge>
                ))}
              </Marquee>

              <Marquee className="[--duration:50s] [--gap:0.75rem]" repeat={4} reverse>
                {m2.map((q) => (
                  <Badge key={q} size="lg" variant="outline" className={badgeClass}>
                    {q}
                  </Badge>
                ))}
              </Marquee>

              <Marquee className="[--duration:42s] [--gap:0.75rem]" repeat={4}>
                {m3.map((q) => (
                  <Badge key={q} size="lg" variant="outline" className={badgeClass}>
                    {q}
                  </Badge>
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 divide-dashed divide-neutral-600 border-t border-dashed border-neutral-600 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-5 px-5 py-8 last:border-b-0 lg:border-b-0 lg:px-6 lg:py-10"
            >
              <Icon className="size-12 text-neutral-700" />
              <div className="flex flex-col gap-2 pt-10 lg:pt-20">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                  {title}
                </h3>
                <p className="font-body leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
