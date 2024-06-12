import type { PropsWithChildren } from "react";
import clsx from "clsx";
import H3 from "@/components/atoms/headings/H3";

export type SectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
  titleClassName?: string;
}>;
export default function Section({
  title,
  children,
  className,
  titleClassName,
}: SectionProps) {
  return (
    <div
      className={clsx(
        "flex flex-col p-4 md:p-6 border-primary border-slight rounded-lg bg-background-alpha shadow-md",
        className,
      )}
    >
      {title ? <H3 className={titleClassName}>{title}</H3> : null}
      {children}
    </div>
  );
}
