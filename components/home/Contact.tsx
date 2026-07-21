"use client";

import { useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { Button } from "@/components/ui/Button";
import { projectTypes } from "@/lib/content/contact";
import { site } from "@/lib/content/site";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [projectType, setProjectType] = useState<string>(projectTypes[0]);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("projectType", projectType);

    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setProjectType(projectTypes[0]);
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
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <div>
            <SlateTag>Start Here</SlateTag>
            <h2 className="mt-4 font-display text-5xl leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
              Tell us your story.
            </h2>
            <p className="mt-6 max-w-xs font-body text-sm text-current/60">
              Documentary, campaign, podcast or something in between — walk us
              through it and we&apos;ll follow up within two working days.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="focus-ring mt-8 inline-block font-mono text-sm text-accent-text"
            >
              {site.email}
            </a>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-current/50">
                What are you looking to create?
              </span>
              <div className="mt-4 flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={clsx(
                      "focus-ring border px-4 py-2 font-body text-sm transition-colors",
                      projectType === type
                        ? "border-foreground bg-foreground text-background"
                        : "border-border-subtle hover:border-accent-text hover:text-accent-text",
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <Field label="Project description">
              <textarea
                name="description"
                required
                rows={4}
                className="focus-ring w-full resize-none border-0 border-b border-border-subtle bg-transparent py-2 font-body text-base outline-none placeholder:text-current/30"
                placeholder="Tell us what you have in mind…"
              />
            </Field>

            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Name">
                <input
                  name="name"
                  required
                  type="text"
                  className="focus-ring w-full border-0 border-b border-border-subtle bg-transparent py-2 font-body text-base outline-none placeholder:text-current/30"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Organisation">
                <input
                  name="organisation"
                  type="text"
                  className="focus-ring w-full border-0 border-b border-border-subtle bg-transparent py-2 font-body text-base outline-none placeholder:text-current/30"
                  placeholder="Optional"
                />
              </Field>
            </div>

            <Field label="Email">
              <input
                name="email"
                required
                type="email"
                className="focus-ring w-full border-0 border-b border-border-subtle bg-transparent py-2 font-body text-base outline-none placeholder:text-current/30"
                placeholder="you@organisation.com"
              />
            </Field>

            <div className="flex items-center gap-5">
              <Button type="submit" variant="primary">
                {status === "submitting" ? "Sending…" : "Start a conversation"}
              </Button>
              {status === "success" && (
                <span className="font-mono text-xs text-accent-text">
                  Sent — we&apos;ll be in touch.
                </span>
              )}
              {status === "error" && (
                <span className="font-mono text-xs text-red-500">
                  Something went wrong — email us directly.
                </span>
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
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-current/50">
        {label}
      </span>
      {children}
    </label>
  );
}
