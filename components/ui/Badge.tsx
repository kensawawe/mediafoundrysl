import clsx from "clsx";

export function Badge({
  className,
  variant = "default",
  size = "default",
  children,
}: {
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "lg";
  children: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center whitespace-nowrap font-body font-medium",
        size === "lg" ? "text-base" : "text-xs",
        variant === "outline" ? "border" : "border-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}
