"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/lib/content/site";
import { testimonials } from "@/lib/content/testimonials";

const iconShared = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  fill: "none",
};

function SocialIcon({ label, className }: { label: string; className?: string }) {
  switch (label) {
    case "Email":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="1.5" y="3.5" width="13" height="9" {...iconShared} />
          <path d="M1.5 4l6.5 5 6.5-5" {...iconShared} />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="2" width="12" height="12" {...iconShared} />
          <circle cx="8" cy="8" r="3.2" {...iconShared} />
          <circle cx="11.4" cy="4.6" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="2" width="12" height="12" {...iconShared} />
          <circle cx="5.5" cy="5.6" r="0.9" fill="currentColor" stroke="none" />
          <path d="M5.5 7.6v4.4" {...iconShared} />
          <path d="M8.4 12v-2.6c0-1.3.9-1.8 1.8-1.8s1.8.5 1.8 1.8V12" {...iconShared} />
        </svg>
      );
    case "Vimeo":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="2" width="12" height="12" {...iconShared} />
          <path d="M4.5 6.2l2.3 4.2 4.7-6" {...iconShared} />
        </svg>
      );
    default:
      return null;
  }
}

function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Freetown",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Reserve the width from mount so hydration doesn't shift layout.
  return <span suppressHydrationWarning>{time ?? "00:00:00"}</span>;
}

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
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const featuredQuote = testimonials[quoteIndex];

  const socialIcons = [
    { label: "Email", href: `mailto:${site.email}` },
    ...site.social.map((s) => ({ label: s.label, href: s.href })),
  ];

  return (
    <footer className="border-t border-border-subtle bg-foreground text-background">
      <Container className="py-20 md:py-28">
        <div className="flex flex-col">
          <Magnetic strength={0.18} className="inline-block w-fit">
            <a
              href={`mailto:${site.email}`}
              className="focus-ring font-display text-[13vw] font-black uppercase leading-[0.88] tracking-tight hover:text-accent-text-inverse sm:text-[8vw] md:text-[6vw]"
            >
              Ready to craft something different?
              <br />
              Good, so are we.
            </a>
          </Magnetic>
        </div>

        <div className="mt-16 grid gap-px border border-current/15 bg-current/15 md:grid-cols-4">
          <div className="flex flex-col justify-between gap-8 bg-background p-8 text-foreground">
            <Link href="/" className="focus-ring inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
              <img
                src={onDarkSurface ? "/logo-dark.png" : "/logo-white.png"}
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
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex flex-col justify-between gap-8 overflow-hidden bg-ink p-8 text-paper">
            <span aria-hidden className="font-display text-4xl leading-none text-paper/30">
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
                <p className="font-body text-base leading-relaxed text-paper/85">
                  {featuredQuote.quote}
                </p>
                <span className="mt-4 block font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">
                  {featuredQuote.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between gap-8 bg-accent-fill p-8 text-white">
            <div>
              <span className="font-display text-2xl font-bold tracking-tight">
                Start a project
              </span>
              <p className="mt-3 font-body text-sm text-white/80">
                Brand, campaign, film or something in between — tell us what you have in mind
                and we&rsquo;ll follow up within two working days.
              </p>
            </div>
            <Button
              href="/#contact"
              variant="primary"
              className="border-white bg-white text-ink hover:border-ink hover:bg-ink hover:text-white"
            >
              Let&rsquo;s talk
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-px bg-current/15 [&>a]:bg-background">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label === "Email" ? undefined : "_blank"}
                rel={s.label === "Email" ? undefined : "noreferrer"}
                aria-label={s.label}
                className="focus-ring group flex flex-col items-center justify-center gap-2 p-6 text-foreground/70 transition-colors hover:text-accent-text"
              >
                <SocialIcon label={s.label} className="h-5 w-5" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-current/45 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} The Media Foundry</span>
          <span className="flex items-center gap-3">
            <span>Working globally</span>
            <span aria-hidden>·</span>
            <span>{site.location}</span>
            <span aria-hidden>·</span>
            <LocalClock />
          </span>
        </div>
      </Container>
    </footer>
  );
}
