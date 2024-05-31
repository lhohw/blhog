import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";

export default function BreadcrumbWrapper({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      aria-label="Breadcrumb"
      className={clsx("mb-6 block h-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
