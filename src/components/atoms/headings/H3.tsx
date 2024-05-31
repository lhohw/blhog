import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function H3({
  children,
  mainColor = true,
}: PropsWithChildren<{ mainColor?: boolean }>) {
  return (
    <h3 className={clsx(`text-lg md:text-2xl`, mainColor && "main-color")}>
      {children}
    </h3>
  );
}
