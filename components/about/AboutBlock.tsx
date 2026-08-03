import { Container } from "@/components/ui/Container";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";

export function AboutBlock({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border-b border-border-subtle py-16 md:py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-[1fr_2.4fr] md:gap-16">
          <SlateTag className="!text-[22px] !text-current">{title}</SlateTag>
          <FadeIn>
            <p className="max-w-2xl font-body text-lg leading-relaxed sm:text-xl">{body}</p>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
