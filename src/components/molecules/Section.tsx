import { PropsWithChildren } from "react";
import clsx from "clsx";
import H3 from "@/components/atoms/H3";

export type SectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;
export default function Section({ title, children, className }: SectionProps) {
  return (
    <div
      className={clsx(
        "flex flex-col p-4 border-primary border-slight rounded-lg bg-background-alpha",
        className,
      )}
    >
      {title ? <H3>{title}</H3> : null}
      {children}
    </div>
  );
}
