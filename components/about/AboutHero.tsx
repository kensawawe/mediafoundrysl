import { Container } from "@/components/ui/Container";
import { RevealLines } from "@/components/ui/RevealText";
import { aboutHero } from "@/lib/content/about";

export function AboutHero() {
  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-20">
      <Container>
        <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
          <RevealLines lines={[aboutHero.title]} onMount />
        </h1>
      </Container>
    </div>
  );
}
