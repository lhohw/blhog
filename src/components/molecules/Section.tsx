import { PropsWithChildren } from "react";
import clsx from "clsx";
import H3 from "@/components/atoms/H3";

export type SectionProps = PropsWithChildren<{
  title?: string;
  classNames?: string;
}>;
export default function Section({ title, children, classNames }: SectionProps) {
  return (
    <div
      className={clsx(
        "flex flex-col p-4 border-sea-200 border-slight rounded-lg",
        classNames,
      )}
    >
      {title ? <H3>{title}</H3> : null}
      {children}
    </div>
  );
}
