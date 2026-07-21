import { StubPage } from "@/components/ui/StubPage";

export default function NotFound() {
  return (
    <StubPage
      eyebrow="404"
      title="This frame doesn't exist."
      body="The page you're looking for has been cut from the edit. Head back and try another story."
      cta={{ label: "Back to home", href: "/" }}
    />
  );
}
