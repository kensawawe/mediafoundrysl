"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footerCopy as footerCopyEn, navLinks as navLinksEn, site as siteEn } from "@/lib/content/site";
import { footerCopy as footerCopyKri, navLinks as navLinksKri, site as siteKri } from "@/lib/content/site.kri";
import { testimonials as testimonialsEn } from "@/lib/content/testimonials";
import { testimonials as testimonialsKri } from "@/lib/content/testimonials.kri";
import { useTranslated } from "@/lib/content/useTranslated";

function LocalClock() {
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Freetown",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now),
      );
      // Month spelled out (not numeric) so it can't be misread as DD/MM
      // vs MM/DD depending on the visitor's own country's convention.
      setDate(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Freetown",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(now),
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // Reserve the width from mount so hydration doesn't shift layout.
  return (
    <span suppressHydrationWarning>
      {time ?? "00:00"} · {date ?? "1 January 1970"}
    </span>
  );
}

export function Footer() {
  const site = useTranslated(siteEn, siteKri);
  const navLinks = useTranslated(navLinksEn, navLinksKri);
  const copy = useTranslated(footerCopyEn, footerCopyKri);
  const testimonials = useTranslated(testimonialsEn, testimonialsKri);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The footer sits on the page's normal background (no theme inversion),
  // so its surface is dark exactly when the resolved theme is dark. Default
  // to the light-theme assumption pre-mount to match the server-rendered
  // markup (ThemeProvider's defaultTheme).
  const onDarkSurface = mounted && resolvedTheme === "dark";
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const featuredQuote = testimonials[quoteIndex];

  const socialIcons = [
    { platform: "email", label: copy.emailLabel, href: `mailto:${site.email}` },
    ...site.social,
  ];

  return (
    <footer className="border-t border-border-subtle">
      <Container className="py-20 md:py-28">
        <div className="flex flex-col">
          <Magnetic strength={0.18} className="inline-block w-fit">
            <a
              href={`mailto:${site.email}`}
              className="focus-ring block font-display font-black uppercase tracking-tight hover:text-accent-text"
            >
              <span className="block leading-[0.95] text-[7vw] sm:whitespace-nowrap sm:text-[3.6vw] md:text-[2.8vw]">
                {copy.ctaLine1}
              </span>
              <span className="block leading-[0.88] text-[13vw] sm:text-[8vw] md:text-[6vw]">
                {copy.ctaLine2}
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="mt-16 grid gap-px border border-current/15 bg-current/15 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-between gap-8 bg-background p-8 text-foreground">
            <Link href="/" className="focus-ring inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
              <img
                src={onDarkSurface ? "/logo-white.png" : "/logo-dark.png"}
                alt="The Media Foundry"
                width={1516}
                height={176}
                className="h-4 w-auto"
              />
            </Link>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring font-body text-sm text-foreground/70 hover:text-accent-text"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/#contact" className="focus-ring font-body text-sm text-foreground/70 hover:text-accent-text">
                {copy.contact}
              </Link>
            </nav>
          </div>

          <div className="flex flex-col justify-between gap-8 overflow-hidden bg-background p-8 text-foreground">
            <span aria-hidden className="font-display text-4xl leading-none text-foreground/20">
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredQuote.id}
                className="flex min-h-[17rem] flex-col"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-body text-base leading-relaxed text-foreground/85">
                  {featuredQuote.quote}
                </p>
                <span className="mt-4 block font-mono text-[11px] uppercase tracking-[0.03em] text-foreground/50">
                  {featuredQuote.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between gap-8 bg-background p-8 text-foreground">
            <div>
              <span className="font-display text-2xl font-bold tracking-tight">
                {copy.startProjectHeading}
              </span>
              <p className="mt-3 font-body text-sm text-foreground/70">{copy.startProjectBody}</p>
            </div>
            <Button href="/#contact" variant="primary">
              {copy.letsTalk}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-px bg-current/15 [&>a]:bg-background">
            {socialIcons.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target={s.platform === "email" ? undefined : "_blank"}
                rel={s.platform === "email" ? undefined : "noreferrer"}
                aria-label={s.label}
                className="focus-ring group flex flex-col items-center justify-center gap-2 p-6 text-foreground/70 transition-colors hover:text-accent-text"
              >
                <SocialIcon platform={s.platform} className="h-5 w-5" />
                <span className="font-mono text-[10px] uppercase tracking-[0.03em]">
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.03em] text-current/45 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} The Media Foundry</span>
          <span className="flex items-center gap-3">
            <span>{site.location}</span>
            <span aria-hidden>·</span>
            <LocalClock />
          </span>
        </div>
      </Container>
    </footer>
  );
}
