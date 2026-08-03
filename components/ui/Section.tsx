import clsx from "clsx";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={clsx("py-24 md:py-32", className)}>
      {children}
    </section>
  );
}
