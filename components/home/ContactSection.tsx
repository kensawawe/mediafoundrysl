"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Section, Eyebrow } from "@/components/ui/Section";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";

const projectTypes = [
  "Documentary",
  "Brand Campaign",
  "Photography",
  "Podcast",
  "Other",
] as const;

const inputClass =
  "focus-ring w-full border-b border-border-subtle bg-transparent py-3 font-body text-base text-foreground placeholder:text-foreground/35 transition-colors focus:border-accent-green-ink";

export function ContactSection() {
  const [projectType, setProjectType] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <Eyebrow>Start a project</Eyebrow>
          <RevealText as="h2" className="mt-6">
            <span className="font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Tell us
              <br />
              your story.
            </span>
          </RevealText>
          <p className="mt-8 max-w-sm font-body text-base text-foreground/60">
            Whether it&rsquo;s a documentary, a campaign or a single
            photograph — if it&rsquo;s worth telling, we want to hear about
            it.
          </p>
          <a
            href="mailto:hello@themediafoundry.sl"
            className="focus-ring mt-8 inline-block font-body text-sm text-foreground/75 underline decoration-border-subtle underline-offset-4 transition-colors hover:text-accent-green-ink hover:decoration-accent-green-ink"
          >
            hello@themediafoundry.sl
          </a>
        </div>

        <div>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex min-h-[320px] flex-col justify-center rounded-xl border border-border-subtle p-10"
              >
                <span className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
                  Thank you.
                </span>
                <p className="mt-4 max-w-sm font-body text-sm text-foreground/60">
                  We&rsquo;ve received the outline of your story. Our team
                  will be in touch shortly to start the conversation.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-10"
              >
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-foreground/45">
                    What are you looking to create?
                  </span>
                  <div
                    role="group"
                    aria-label="Project type"
                    className="mt-4 flex flex-wrap gap-3"
                  >
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={projectType === type}
                        onClick={() => setProjectType(type)}
                        className={clsx(
                          "focus-ring rounded-full border px-5 py-3 font-body text-sm transition-colors",
                          projectType === type
                            ? "border-accent-green bg-accent-green text-black"
                            : "border-border-subtle text-foreground/70 hover:border-foreground/40",
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-foreground/45">
                    Project description
                  </span>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us a little about the story you want to tell."
                    className={clsx(inputClass, "resize-none")}
                  />
                </label>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-foreground/45">
                      Name
                    </span>
                    <input required type="text" placeholder="Your name" className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-foreground/45">
                      Organisation
                    </span>
                    <input type="text" placeholder="Company or organisation" className={inputClass} />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-foreground/45">
                    Email
                  </span>
                  <input required type="email" placeholder="you@example.com" className={inputClass} />
                </label>

                <div>
                  <Button type="submit" variant="primary">
                    Start a conversation
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
