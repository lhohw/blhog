import type { HTMLAttributes } from "react";
import clsx from "clsx";

export type DefaultButtonProps = {
  className?: string;
  disabled?: boolean;
} & HTMLAttributes<HTMLButtonElement>;
export default function DefaultButton({
  className,
  children,
  ...props
}: DefaultButtonProps) {
  return (
    <button
      className={clsx(
        "w-fit h-fit area rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-shimmer-bg disabled:text-text-alpha",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
