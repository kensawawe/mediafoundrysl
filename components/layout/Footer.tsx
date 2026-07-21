import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks, site } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-16">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="focus-ring font-display text-2xl tracking-tight">
              THE MEDIA FOUNDRY
            </Link>
            <p className="mt-4 font-body text-sm text-current/60">{site.tagline}</p>
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
                  className="focus-ring font-body text-sm hover:text-accent-text"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/journal" className="focus-ring font-body text-sm hover:text-accent-text">
                Journal
              </Link>
              <Link href="/careers" className="focus-ring font-body text-sm hover:text-accent-text">
                Careers
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-current/40">
                Connect
              </span>
              <a
                href={`mailto:${site.email}`}
                className="focus-ring font-body text-sm hover:text-accent-text"
              >
                {site.email}
              </a>
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring font-body text-sm hover:text-accent-text"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-border-subtle pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-current/40">
            © {new Date().getFullYear()} The Media Foundry — {site.location}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-current/40">
            Craft. Story. Impact.
          </p>
        </div>
      </Container>
    </footer>
  );
}
