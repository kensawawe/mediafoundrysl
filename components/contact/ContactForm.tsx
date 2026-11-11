"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import {
  contactPageCopy as copy,
  organisationTypes,
  projectTypes,
  timelines,
} from "@/lib/content/contact";
import { site } from "@/lib/content/site";

type Status = "idle" | "submitting" | "success" | "error" | "invalid";

const fieldBox =
  "focus-ring w-full rounded-lg border border-border-subtle bg-accent-fill/[0.06] px-3.5 py-3 font-body text-base outline-none transition-colors placeholder:text-current/40 hover:border-accent-text focus-visible:border-accent-fill focus-visible:bg-accent-fill/[0.1] aria-[invalid=true]:border-red-500";

/**
 * The enquiry form. Posts to Formspree (site.formspreeEndpoint) and only
 * reports success when Formspree accepts the submission.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<Set<string>>(new Set());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Validate ourselves (the form is noValidate) so errors are announced and styled consistently.
    const bad = Array.from(form.elements).filter(
      (el): el is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
        (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) &&
        !el.checkValidity(),
    );
    if (bad.length > 0) {
      setInvalid(new Set(bad.map((el) => el.name)));
      setStatus("invalid");
      bad[0].focus();
      return;
    }
    setInvalid(new Set());
    setStatus("submitting");

    const data = new FormData(form);
    data.set("_subject", `New enquiry: ${data.get("projectType") || "project"} (${data.get("organisation") || data.get("name")})`);

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

  const clearInvalid = (name: string) => {
    if (!invalid.has(name)) return;
    const next = new Set(invalid);
    next.delete(name);
    setInvalid(next);
  };

  const field = (name: string) => ({
    name,
    "aria-invalid": invalid.has(name) || undefined,
    onInput: () => clearInvalid(name),
    onChange: () => clearInvalid(name),
  });

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-accent-fill/40 bg-accent-fill/[0.06] p-8">
        <p className="font-godthem text-2xl uppercase tracking-[0.02em]">Enquiry sent.</p>
        <p className="mt-3 max-w-md font-body text-base leading-relaxed text-foreground/75">{copy.success}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="focus-ring mt-6 font-godthem text-xs uppercase tracking-[0.08em] text-accent-text"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      <p className="font-body text-sm text-foreground/60">{copy.requiredNote}</p>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label={copy.nameLabel} required>
          {(id) => <input id={id} {...field("name")} required type="text" autoComplete="name" className={fieldBox} />}
        </Field>
        <Field label={copy.organisationLabel} required>
          {(id) => (
            <input id={id} {...field("organisation")} required type="text" autoComplete="organization" className={fieldBox} />
          )}
        </Field>
        <Field label={copy.emailLabel} required>
          {(id) => <input id={id} {...field("email")} required type="email" autoComplete="email" className={fieldBox} />}
        </Field>
        <Field label={copy.phoneLabel} hint={copy.optional}>
          {(id) => <input id={id} {...field("phone")} type="tel" autoComplete="tel" className={fieldBox} />}
        </Field>
        <Field label={copy.organisationTypeLabel} required>
          {(id) => <Select id={id} {...field("organisationType")} required options={organisationTypes} />}
        </Field>
        <Field label={copy.projectTypeLabel} required>
          {(id) => <Select id={id} {...field("projectType")} required options={projectTypes} />}
        </Field>
      </div>

      <Field label={copy.descriptionLabel} required>
        {(id) => (
          <textarea
            id={id}
            {...field("description")}
            required
            minLength={10}
            rows={6}
            className={clsx(fieldBox, "resize-y")}
            placeholder={copy.descriptionPlaceholder}
          />
        )}
      </Field>

      <Field label={copy.timelineLabel} required>
        {(id) => <Select id={id} {...field("timeline")} required options={timelines} />}
      </Field>

      {/* Spam trap: hidden from people, filled in by bots; Formspree drops submissions that use it. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button type="submit" variant="primary" disabled={status === "submitting"}>
          {status === "submitting" ? copy.sending : copy.submit}
        </Button>
        <div aria-live="polite" className="font-body text-sm">
          {status === "invalid" && <span className="text-red-600 dark:text-red-400">{copy.invalid}</span>}
          {status === "error" && (
            <span className="text-red-600 dark:text-red-400">
              {copy.error}{" "}
              <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                {site.email}
              </a>
              .
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="font-godthem text-xs uppercase tracking-[0.045em] text-current/75">
        {label}
        {required && (
          <span aria-hidden className="text-accent-text">
            {" "}
            *
          </span>
        )}
        {hint && <span className="ml-2 font-body normal-case tracking-normal text-foreground/70">({hint})</span>}
      </label>
      {children(id)}
    </div>
  );
}

function Select({
  options,
  ...props
}: { options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} defaultValue="" className={clsx(fieldBox, "appearance-none pr-10")}>
        <option value="" disabled={props.required}>
          {copy.choose}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-current/50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="m4 6 4 4 4-4" />
      </svg>
    </div>
  );
}
