"use client";

import { useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { contactPageCopy as copyEn } from "@/lib/content/contact";
import { contactPageCopy as copyKri } from "@/lib/content/contact.kri";
import { useTranslated } from "@/lib/content/useTranslated";
import { site } from "@/lib/content/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBoxClasses =
  "focus-ring w-full border border-border-subtle bg-accent-fill/[0.07] px-3.5 py-2.5 font-body text-base outline-none transition-colors placeholder:text-current/35 hover:border-accent-text focus-visible:border-accent-fill focus-visible:bg-accent-fill/[0.12]";

export function Contact() {
  const copy = useTranslated(copyEn, copyKri);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact">
      <Container>
        <div aria-hidden className="border-t border-current/15 mb-12" />

        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <div>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-6xl md:text-7xl">
              {copy.heading}
            </h2>
            <p className="mt-6 max-w-xs font-body text-sm text-current/60">{copy.intro}</p>
            <a
              href={`mailto:${site.email}`}
              className="focus-ring mt-8 inline-block font-mono text-sm text-accent-text"
            >
              {site.email}
            </a>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <Field label={copy.descriptionLabel}>
              <textarea
                name="description"
                required
                rows={4}
                className={clsx(fieldBoxClasses, "resize-none")}
                placeholder={copy.descriptionPlaceholder}
              />
            </Field>

            <div className="grid gap-8 sm:grid-cols-2">
              <Field label={copy.nameLabel}>
                <input
                  name="name"
                  required
                  type="text"
                  className={fieldBoxClasses}
                  placeholder={copy.namePlaceholder}
                />
              </Field>
              <Field label={copy.companyLabel}>
                <input
                  name="company"
                  type="text"
                  className={fieldBoxClasses}
                  placeholder={copy.companyOptional}
                />
              </Field>
            </div>

            <Field label={copy.emailLabel}>
              <input
                name="email"
                required
                type="email"
                className={fieldBoxClasses}
                placeholder="you@company.com"
              />
            </Field>

            <div className="flex items-center gap-5">
              <Button type="submit" variant="primary">
                {status === "submitting" ? copy.sending : copy.submit}
              </Button>
              {status === "success" && (
                <span className="font-mono text-xs text-accent-text">{copy.success}</span>
              )}
              {status === "error" && (
                <span className="font-mono text-xs text-red-500">{copy.error}</span>
              )}
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.03em] text-current/50">
        {label}
      </span>
      {children}
    </label>
  );
}
