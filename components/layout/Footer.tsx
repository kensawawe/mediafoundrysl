"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footerCopy as footerCopyEn, footerExtraLinks as footerExtraLinksEn, navLinks as navLinksEn, site as siteEn } from "@/lib/content/site";
import { footerCopy as footerCopyKri, footerExtraLinks as footerExtraLinksKri, navLinks as navLinksKri, site as siteKri } from "@/lib/content/site.kri";
import { testimonials as testimonialsEn } from "@/lib/content/testimonials";
import { testimonials as testimonialsKri } from "@/lib/content/testimonials.kri";
import { useTranslated } from "@/lib/content/useTranslated";

const noopSubscribe = () => () => {};
function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

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

  // Nothing until the browser knows the time: a server-rendered fallback
  // would be a fake date (it used to show "1 January 1970").
  if (!time || !date) return null;
  return (
    <>
      <span aria-hidden>·</span>
      <span>
        {time} · {date}
      </span>
    </>
  );
}

export function Footer() {
  const site = useTranslated(siteEn, siteKri);
  const navLinks = useTranslated(navLinksEn, navLinksKri);
  const footerExtraLinks = useTranslated(footerExtraLinksEn, footerExtraLinksKri);
  const copy = useTranslated(footerCopyEn, footerCopyKri);
  const testimonials = useTranslated(testimonialsEn, testimonialsKri);
  const { resolvedTheme } = useTheme();
  // false on the server and during hydration, true once on the client.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  // The footer sits on the page's normal background (no theme inversion),
  // so its surface is dark exactly when the resolved theme is dark. Default
  // to the light-theme assumption pre-mount to match the server-rendered
  // markup (ThemeProvider's defaultTheme).
  const onDarkSurface = mounted && resolvedTheme === "dark";
  const [quoteIndex, setQuoteIndex] = useState(0);
  // The quote rotates every 6s; it stops while hovered or focused, when the
  // visitor presses pause, and never runs with reduced motion.
  const [userPaused, setUserPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const rotating = !userPaused && !holding && !reducedMotion;

  useEffect(() => {
    if (!rotating) return;
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [rotating, testimonials.length]);

  const featuredQuote = testimonials[quoteIndex];

  const socialIcons = [
    { platform: "email", label: copy.emailLabel, href: `mailto:${site.email}` },
    ...site.social,
  ];

  return (
    <footer id="contact" className="border-t border-border-subtle">
      <Container className="pb-8 pt-20 md:pb-10 md:pt-28">
        <div className="flex flex-col">
          <Magnetic strength={0.18} className="inline-block w-fit">
            <a
              href={`mailto:${site.email}`}
              className="focus-ring block font-godthem font-normal uppercase tracking-[0.02em] hover:text-accent-text"
            >
              <span className="block font-belmonte font-normal leading-[1.05] tracking-[-0.02em] text-[7vw] sm:whitespace-nowrap sm:text-[3.6vw] md:text-[2.8vw]">
                {copy.ctaLine1}
              </span>
              <span className="awareness-pink-text block leading-[1] text-[9.5vw] sm:text-[6vw] md:text-[4.6vw]">
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
                src={onDarkSurface ? "/logo-white.svg" : "/logo-dark.svg"}
                alt="The Media Foundry"
                width={1716}
                height={210}
                className="h-4 w-auto"
              />
            </Link>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring font-godthem text-sm tracking-[0.04em] text-foreground/70 hover:text-accent-text"
                >
                  {link.label}
                </Link>
              ))}
              {footerExtraLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring font-godthem text-sm tracking-[0.04em] text-foreground/70 hover:text-accent-text"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div
            className="flex flex-col justify-between gap-8 overflow-hidden bg-background p-8 text-foreground"
            onMouseEnter={() => setHolding(true)}
            onMouseLeave={() => setHolding(false)}
            onFocus={() => setHolding(true)}
            onBlur={() => setHolding(false)}
          >
            <div className="flex items-start justify-between">
              <span aria-hidden className="font-display text-4xl leading-none text-foreground/20">
                &ldquo;
              </span>
              {!reducedMotion && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? "Resume rotating client quotes" : "Pause rotating client quotes"}
                  className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-colors hover:border-accent-fill hover:text-foreground"
                >
                  {userPaused ? (
                    <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
                      <path d="M3 1.5v9l7-4.5z" />
                    </svg>
                  ) : (
                    <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
                      <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
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
                <span className="mt-4 block font-godthem text-xs uppercase tracking-[0.045em] text-foreground/70">
                  {featuredQuote.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between gap-8 bg-background p-8 text-foreground">
            <div>
              <span className="font-belmonte text-3xl font-normal uppercase">
                {copy.startProjectHeading}
              </span>
              <p className="mt-3 font-body text-sm text-foreground/70">{copy.startProjectBody}</p>
            </div>
            <Button href="/contact" variant="primary">
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
                <span className="font-godthem text-[11px] uppercase tracking-[0.045em]">
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 font-godthem text-xs uppercase tracking-[0.045em] text-current/70 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} The Media Foundry</span>
          <span className="flex items-center gap-3">
            <span>{site.location}</span>
            <LocalClock />
          </span>
        </div>
      </Container>
    </footer>
  );
}
