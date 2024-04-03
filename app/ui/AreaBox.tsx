import { PropsWithChildren } from "react";
import clsx from "clsx";

export type AreaBoxProps = PropsWithChildren<{
  title?: string;
  classNames?: string;
}>;
export default function AreaBox({ title, children, classNames }: AreaBoxProps) {
  return (
    <div
      className={clsx(
        "flex flex-col p-4 border-sea-200 border-slight rounded-lg",
        classNames,
      )}
    >
      {title ? (
        <h3 className="mb-6 h-8 text-lg md:text-2xl main-color">{title}</h3>
      ) : null}
      {children}
    </div>
  );
}
