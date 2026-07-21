import clsx from "clsx";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16", className)}>
      {children}
    </div>
  );
}
