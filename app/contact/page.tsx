import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactPageCopy as copy } from "@/lib/content/contact";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `Start a project | ${site.name}`,
  description:
    "Tell The Media Foundry what you're working on: films, photography, campaigns and strategic communications for organisations and brands in Sierra Leone.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-20">
          <div>
            <h1 className="font-godthem text-4xl font-normal uppercase leading-[1] tracking-[0.02em] sm:text-5xl md:text-6xl">
              {copy.heading}
            </h1>
            <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-foreground/75 sm:text-lg">
              {copy.intro}
            </p>
            <div className="mt-10 border-t border-border-subtle pt-6 font-body text-sm text-foreground/65">
              <p>{copy.emailPrompt}</p>
              <a
                href={`mailto:${site.email}`}
                className="focus-ring mt-2 inline-block break-all font-godthem text-sm tracking-[0.04em] text-accent-text"
              >
                {site.email}
              </a>
              {site.whatsapp && (
                <p className="mt-4">
                  Or message us on{" "}
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring font-godthem text-sm tracking-[0.04em] text-accent-text"
                  >
                    WhatsApp
                  </a>
                </p>
              )}
              <p className="mt-6">{site.location}</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
