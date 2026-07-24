"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { navLinks, site } from "@/lib/content/site";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The footer always uses the theme-swapped foreground/background pair
  // (bg-foreground/text-background), so its actual surface is the
  // *opposite* of the page's normal one: dark in light theme, light in
  // dark theme. Pick the logo variant that stays legible on whichever
  // that resolves to. Default to the light-theme assumption pre-mount to
  // match the server-rendered markup (ThemeProvider's defaultTheme).
  const onDarkSurface = !mounted || resolvedTheme === "light";

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
            <Link href="/" className="focus-ring inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
              <img
                src={onDarkSurface ? "/logo-white.png" : "/logo-dark.png"}
                alt="The Media Foundry"
                width={1516}
                height={176}
                className="h-[18px] w-auto"
              />
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
      </Container>
    </footer>
  );
}
