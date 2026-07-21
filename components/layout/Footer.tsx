import Link from "next/link";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

const social = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background py-16">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl leading-none tracking-tight text-foreground md:text-4xl">
              THE MEDIA FOUNDRY
            </p>
            <p className="mt-4 max-w-sm font-body text-sm text-foreground/60">
              A creative media agency telling Sierra Leone&rsquo;s stories
              through authentic content — for the world.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <div className="flex flex-col gap-3">
              <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
                Navigate
              </span>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring w-fit font-body text-sm text-foreground/75 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
                Connect
              </span>
              <a
                href="mailto:hello@themediafoundry.sl"
                className="font-body text-sm text-foreground/75 transition-colors hover:text-foreground"
              >
                hello@themediafoundry.sl
              </a>
              {social.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring w-fit font-body text-sm text-foreground/75 transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border-subtle pt-6 text-xs text-foreground/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} The Media Foundry. Freetown, Sierra Leone.</p>
          <p>Craft. Story. Impact.</p>
        </div>
      </Container>
    </footer>
  );
}
