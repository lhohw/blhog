"use client";

import type { Size } from "@/types/tailwind";
import clsx from "clsx";
import Check from "@/components/icons/Check";
import useCheckbox from "./useCheckbox";

export type CheckboxProps = {
  className?: string;
  size?: Size;
  onChange?: (isChecked: boolean) => void;
};
export default function Checkbox({ className, size, onChange }: CheckboxProps) {
  const { _onChange, value, isChecked } = useCheckbox(onChange);

  return (
    <label
      className={clsx(
        "relative area cursor-pointer",
        size === "xs"
          ? "w-4 h-4"
          : size === "sm"
            ? "w-6 h-6"
            : size === "lg"
              ? "w-10 h-10"
              : size === "xl"
                ? "w-12 h-12"
                : size === "2xl"
                  ? "w-14 h-14"
                  : size === "3xl"
                    ? "w-16 h-16"
                    : "w-8 h-8",
      )}
    >
      <span
        className={clsx(
          `absolute inset-0 inline-block overflow-hidden
          before:inline-block before:absolute before:w-full before:h-full before:bg-background before:transition-transform before:duration-500`,
          isChecked ? "before:translate-x-full" : "before:-translate-x-0",
          size === "lg"
            ? "p-1"
            : size === "xl"
              ? "p-1"
              : size === "2xl"
                ? "p-1.5"
                : size === "3xl"
                  ? "p-1.5"
                  : "",
        )}
      >
        <Check />
      </span>
      <input
        className={clsx(
          "appearance-none w-full h-full p-0 m-0 bg-transparent",
          className,
        )}
        type="checkbox"
        value={value}
        onChange={_onChange}
      />
    </label>
  );
}
