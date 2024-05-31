import { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

export default function CardWrapper({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={clsx(
        "p-4 min-w-40 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mix-blend-unset",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
