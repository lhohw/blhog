import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";

export default function PhotoWrapper({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={clsx(
        "w-full rounded mb-4 flex flex-col items-end aspect-video",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
