import type { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";
import Resizer, { type ResizerProps } from "@/components/atoms/Resizer";

export default function SidebarWithResizer({
  resizerProps,
  children,
  ...props
}: PropsWithChildren<
  {
    resizerProps: Omit<ResizerProps, "children">;
  } & HTMLAttributes<HTMLElement>
>) {
  const { className, ...sidebarProps } = props;
  const { className: resizerClassName, ..._resizerProps } = resizerProps;
  return (
    <aside
      className={clsx(
        "flex flex-1 flex-col h-full rounded-tr-2xl relative shadow-md",
        className,
      )}
      {...sidebarProps}
    >
      <Resizer
        className={clsx("min-w-full max-w-full", resizerClassName)}
        {..._resizerProps}
      >
        {children}
      </Resizer>
    </aside>
  );
}
