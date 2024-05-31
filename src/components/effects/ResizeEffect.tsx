"use client";
import { useCallback, useEffect } from "react";

export type ResizeEffectProps = {
  isOpen: boolean;
  close: () => void;
};
export default function ResizeEffect({ isOpen, close }: ResizeEffectProps) {
  const handleResize = useCallback(() => {
    if (isOpen) close();
  }, [isOpen, close]);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!isOpen) return;

      const target = e.target as HTMLDivElement;
      if (!target.closest("#nav-link")) close();
    },
    [isOpen, close],
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", clickListener);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", clickListener);
    };
  }, [handleResize, clickListener]);

  return <></>;
}
