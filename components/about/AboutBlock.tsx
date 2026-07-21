import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";

export function AboutBlock({
  index,
  title,
  body,
  tone = "default",
}: {
  index: string;
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
          <SlateTag
            index={index}
            tone={tone}
            className={tone === "inverse" ? "text-current/60" : undefined}
          >
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
