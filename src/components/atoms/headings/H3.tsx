import { PropsWithChildren } from "react";
import clsx from "clsx";

export default function H3({
  children,
  mainColor = true,
  className,
}: PropsWithChildren<{ mainColor?: boolean; className?: string }>) {
  return (
    <h3
      className={clsx(
        `text-lg md:text-2xl`,
        mainColor && "main-color",
        className,
      )}
    >
      {children}
    </h3>
  );
}
