"use client";

import { DepartmentMarquee } from "@/components/ui/DepartmentMarquee";

const features = [
  {
    description:
      "We clarify what matters. By asking the right questions and stripping away the clutter, we uncover the real story and shape brands that are hard to ignore.",
    title: "We cut through the noise",
  },
  {
    description:
      "Every idea we craft is intentional. We create work that connects, converts, and creates real value, for your audience and your bottom line.",
    title: "We build for impact",
  },
  {
    description:
      "Strategy gives our work direction. Creativity gives it life. Together, they produce ideas that not only look good, but move people to act.",
    title: "We blend strategy + creativity",
  },
  {
    description:
      "Your success is the goal, not the handoff. We partner with you for the long run, adapting, optimizing, and helping you scale with confidence.",
    title: "We grow with you",
  },
];

export function Roadblocks() {
  return (
    <section className="relative bg-background pt-20 text-foreground sm:pt-40">
      <div className="mx-auto max-w-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 px-5 text-center md:px-10">
          <h2 className="whitespace-nowrap font-display text-[clamp(22px,6.4vw,60px)] font-black uppercase leading-[0.95] tracking-tight">
            Great is no longer good enough.
          </h2>
          <p className="max-w-xl font-body text-base text-foreground/70 md:text-lg">
            It&apos;s easy to get lost in a sea of advice, conflicting opinions,
            and endless &quot;must-dos.&quot; We filter out the noise, focus on
            what truly matters, and give you the kind of clarity that lets
            your business shine in the market.
          </p>
        </div>

        <DepartmentMarquee className="mt-12" fadeFrom="background" />

        <div className="mt-16 grid grid-cols-1 divide-dashed divide-border-subtle border-t border-dashed border-border-subtle sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {features.map(({ title, description }) => (
            <div
              key={title}
              className="flex flex-col px-5 py-8 last:border-b-0 lg:border-b-0 lg:px-6 lg:py-10"
            >
              <div className="flex flex-col gap-2">
                <h3 className="awareness-pink-text font-belmonte text-[clamp(18px,6vw,30px)] font-normal uppercase tracking-[-0.03em] whitespace-nowrap lg:text-[clamp(14px,calc(1.75vw-1.5px),30px)]">
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
