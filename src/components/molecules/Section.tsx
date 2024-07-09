import type { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";
import H3 from "@/components/atoms/headings/H3";

export type SectionProps = PropsWithChildren<
  {
    title?: string;
    className?: string;
    titleClassName?: string;
    mainColor?: boolean;
  } & HTMLAttributes<HTMLDivElement>
>;
export default function Section({
  title,
  children,
  className,
  titleClassName,
  mainColor,
  ...props
}: SectionProps) {
  return (
    <div
      className={clsx(
        "flex flex-col p-6 border-primary border-slight rounded-lg bg-background-alpha shadow-md",
        className,
      )}
      {...props}
    >
      {title ? (
        <H3 className={titleClassName} mainColor={mainColor}>
          {title}
        </H3>
      ) : null}
      {children}
    </div>
  );
}
