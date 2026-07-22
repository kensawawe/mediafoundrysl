import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";

export function AboutBlock({
  title,
  body,
  tone = "default",
}: {
  title: string;
  body: string;
  tone?: "default" | "inverse";
}) {
  return (
    <div
      className={clsx(
        "border-b border-border-subtle py-16 md:py-20",
        tone === "inverse" && "bg-foreground text-background",
      )}
    >
      <Container>
        <div className="grid gap-6 md:grid-cols-[1fr_2.4fr] md:gap-16">
          {/* Full-opacity current-color at 2x size — text-current already
              resolves to the correct contrast (pale on dark sections, ink
              on light ones) since it inherits from this block's own
              foreground/background swap, so it stays legible in both
              tones and both themes without hardcoding a fixed color. */}
          <SlateTag tone={tone} className="!text-[22px] !text-current">
            {title}
          </SlateTag>
          <FadeIn>
            <p className="max-w-2xl font-body text-lg leading-relaxed sm:text-xl">{body}</p>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
