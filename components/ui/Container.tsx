import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";
  return (
    <Component
      className={clsx("mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
