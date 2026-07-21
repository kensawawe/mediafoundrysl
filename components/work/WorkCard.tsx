import Link from "next/link";
import clsx from "clsx";
import { Slate } from "@/components/ui/Slate";
import { FadeIn } from "@/components/ui/RevealText";
import type { WorkItem } from "@/lib/content/work";

export function WorkCard({ item, delay = 0 }: { item: WorkItem; delay?: number }) {
  const isLarge = item.size === "lg";
  const href = item.hasCaseStudy ? `/work/${item.slug}` : "/work";

  return (
    <FadeIn delay={delay} className={clsx(isLarge && "sm:col-span-2 sm:row-span-2")}>
      <Link href={href} className="focus-ring group block">
        <Slate
          label={item.title}
          category={item.category}
          variant={item.variant}
          aspect={isLarge ? "aspect-square sm:aspect-[4/3]" : "aspect-[4/5] sm:aspect-square"}
        />
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg leading-tight tracking-tight sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-1 max-w-xs font-body text-xs text-current/55 sm:text-sm">
              {item.description}
            </p>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
