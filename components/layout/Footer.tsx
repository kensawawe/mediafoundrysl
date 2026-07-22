import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { navLinks, site } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-foreground text-background">
      <Container className="py-20 md:py-28">
        <div className="flex flex-col">
          <Magnetic strength={0.18} className="inline-block w-fit">
            <a
              href={`mailto:${site.email}`}
              className="focus-ring font-display text-[13vw] font-black uppercase leading-[0.88] tracking-tight hover:text-accent-text-inverse sm:text-[8vw] md:text-[6vw]"
            >
              Let&rsquo;s cast
              <br />
              something.
            </a>
          </Magnetic>
        </div>

        <div className="mt-20 flex flex-col gap-12 border-t border-current/15 pt-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="focus-ring font-display text-xl font-black uppercase tracking-tight">
              The Media Foundry
            </Link>
            <p className="mt-4 font-body text-sm text-current/55">{site.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-20">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-current/40">
                Navigate
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring font-body text-sm text-current/80 hover:text-accent-text-inverse"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/#contact" className="focus-ring font-body text-sm text-current/80 hover:text-accent-text-inverse">
                Contact
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-current/40">
                Connect
              </span>
              <a
                href={`mailto:${site.email}`}
                className="focus-ring font-body text-sm text-current/80 hover:text-accent-text-inverse"
              >
                {site.email}
              </a>
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring font-body text-sm text-current/80 hover:text-accent-text-inverse"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-current/15 pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-current/40">
            © {new Date().getFullYear()} The Media Foundry — {site.location}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-current/40">
            Forge. Frame. Finish.
          </p>
        </div>
      </Container>
    </footer>
  );
}
