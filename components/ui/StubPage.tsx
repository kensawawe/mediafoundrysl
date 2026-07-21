import { Container } from "@/components/ui/Container";
import { SlateTag } from "@/components/ui/SlateTag";
import { Button } from "@/components/ui/Button";

export function StubPage({
  eyebrow,
  title,
  body,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="flex min-h-[70vh] items-center py-32">
      <Container>
        <SlateTag>{eyebrow}</SlateTag>
        <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-md font-body text-base text-current/60">{body}</p>
        {cta && (
          <div className="mt-10">
            <Button href={cta.href} variant="outline">
              {cta.label}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
