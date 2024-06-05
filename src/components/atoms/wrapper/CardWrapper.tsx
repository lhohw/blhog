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
        "w-60 m-4 bg-background-alpha border-primary border-slight rounded-lg transition-shadow hover:shadow-corona-primary",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
