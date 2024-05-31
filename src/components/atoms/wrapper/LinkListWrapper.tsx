import type { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

export default function LinkListWrapper({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={clsx(
        "flex flex-col w-full h-14 rounded-tr-2xl z-10 transition-height duration-300 delay-100 absolute top-0 left-0 bg-background",
        "md:h-full md:static md:bg-background-alpha",
        "border-primary border-slight",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
