import type { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";
import Resizer, { type ResizerProps } from "@/components/atoms/Resizer";

export default function NavWithResizer({
  resizerProps,
  children,
  ...props
}: PropsWithChildren<
  {
    resizerProps: Omit<ResizerProps, "children">;
  } & HTMLAttributes<HTMLElement>
>) {
  const { className, ...navProps } = props;
  const { className: resizerClassName, ..._resizerProps } = resizerProps;
  return (
    <nav
      className={clsx(
        "flex flex-1 flex-col h-full rounded-tr-2xl relative shadow-md",
        className,
      )}
      {...navProps}
    >
      <Resizer
        className={clsx("min-w-full max-w-full", resizerClassName)}
        {..._resizerProps}
      >
        {children}
      </Resizer>
    </nav>
  );
}
