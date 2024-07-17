import { useEffect } from "react";
import useDropdown from "./useDropdown";

export type WindowClickEffectProps = Pick<
  ReturnType<typeof useDropdown>,
  "isOpen" | "toggle"
>;
export default function WindowClickEffect({
  isOpen,
  toggle,
}: WindowClickEffectProps) {
  useEffect(
    function addWindowClickListener() {
      const windowClickListener = () => {
        if (isOpen) toggle();
      };

      window.addEventListener("click", windowClickListener);
      return () => {
        window.removeEventListener("click", windowClickListener);
      };
    },
    [isOpen, toggle],
  );

  return <></>;
}
