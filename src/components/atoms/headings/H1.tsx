import type { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

export default function H1({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h1
      className={clsx("text-4xl ml-4 my-6 text-left font-semibold", className)}
      {...props}
    >
      {children}
    </h1>
  );
}
