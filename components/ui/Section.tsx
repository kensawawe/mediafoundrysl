import clsx from "clsx";

export function Section({
  id,
  className,
  children,
  tone = "default",
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tone?: "default" | "inverse";
}) {
  return (
    <section
      id={id}
      className={clsx(
        "py-24 md:py-32",
        tone === "inverse" && "bg-navy text-white",
        className,
      )}
    >
      {children}
    </section>
  );
}
