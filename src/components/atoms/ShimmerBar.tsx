import type { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

export default function ShimmerBar({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={clsx("bg-shimmer-bg rounded shimmer", className)}
      {...props}
    >
      {children}
    </div>
  );
}
