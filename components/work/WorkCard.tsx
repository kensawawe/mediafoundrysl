import Link from "next/link";
import clsx from "clsx";
import { WorkThumb } from "@/components/work/WorkThumb";
import { FadeIn } from "@/components/ui/RevealText";
import { caseStudiesPublic, type WorkItem } from "@/lib/content/work";

// Until `caseStudiesPublic` is flipped on, cards stay clickable locally (so
// case studies can be worked on) but render as inert, non-navigating cards in
// production — same dev-only-interactivity convention used for the
// not-yet-public merch link in Navbar.tsx.
const isDev = process.env.NODE_ENV === "development";

export function WorkCard({ item, delay = 0 }: { item: WorkItem; delay?: number }) {
  const isLarge = item.size === "lg";
  const clickable = (caseStudiesPublic && item.hasCaseStudy) || isDev;
  const href = item.hasCaseStudy ? `/work/${item.slug}` : "/work";

  const card = (
    <>
      <div className="relative overflow-hidden rounded-2xl">
        <WorkThumb
          item={item}
          aspect={isLarge ? "aspect-square sm:aspect-[4/3]" : "aspect-[4/5] sm:aspect-square"}
          className="rounded-2xl"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-1 max-w-xs font-body text-xs text-current/55 sm:text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <FadeIn delay={delay} className={clsx(isLarge && "sm:col-span-2 sm:row-span-2")}>
      {clickable ? (
        <Link href={href} className="focus-ring group relative block">
          {card}
        </Link>
      ) : (
        <div className="group relative block">{card}</div>
      )}
    </FadeIn>
  );
}
