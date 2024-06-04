"use client";
import clsx from "clsx";
import EWResize from "@/components/icons/EWResize";
import NSResize from "@/components/icons/NSResize";
import useResizer from "@/hooks/react/useResizer";

export type ResizerProps = {
  children: React.ReactNode;
  className?: string;
  initialLength: number;
  hitSlop?: number;
  direction: "left" | "top" | "right" | "bottom";
  min?: number;
  max?: number;
  initialWidth?: number;
  initialHeight?: number;
  noIcon?: boolean;
};
const Resizer = ({
  children,
  className,
  initialLength,
  hitSlop = 20,
  direction,
  min = initialLength - 50,
  max = initialLength + 50,
  initialWidth,
  initialHeight,
  noIcon = false,
}: ResizerProps) => {
  const { length, isHorizontal } = useResizer(
    initialLength,
    hitSlop,
    direction,
    min,
    max,
  );

  return (
    <div
      style={{
        width: isHorizontal ? `${length}px` : initialWidth ?? "100%",
        height: !isHorizontal ? `${length}px` : initialHeight ?? "100%",
      }}
      className={clsx("flex bg-inherit text-inherit relative", className)}
    >
      {children}
      <div
        className={clsx(
          "resizer absolute z-10 [&>div]:hover:opacity-70",
          isHorizontal ? "md:cursor-ew-resize" : "md:cursor-ns-resize",
          direction === "top"
            ? "top-0"
            : direction === "left"
              ? "left-0"
              : direction === "right"
                ? "right-0"
                : "bottom-0",
        )}
        style={{
          width: isHorizontal ? `${hitSlop * 2}px` : initialWidth ?? "100%",
          height: !isHorizontal ? `${hitSlop * 2}px` : initialHeight ?? "100%",
          transform: isHorizontal ? "translateX(50%)" : "translateY(50%)",
        }}
      >
        <div
          className={clsx(
            "rounded-full border-primary border-2 absolute w-8 h-8 bg-background p-1 z-20 opacity-0 transition-opacity duration-300 hidden md:block",
            isHorizontal
              ? "top-[50%] cursor-ew-resize"
              : "left-[50%] cursor-ns-resize",
            noIcon && "md:hidden",
          )}
        >
          {isHorizontal ? <EWResize /> : <NSResize />}
        </div>
      </div>
    </div>
  );
};

export default Resizer;
