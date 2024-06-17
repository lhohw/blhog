"use clent";

import { useEffect, useMemo } from "react";
import { debouncing } from "@/lib/utils/performance";

export type InitializePostImageEffectProps = {
  initialize: () => void;
  initializeMaxHeight: () => void;
  onScroll: () => void;
};
export default function InitializePostImageEffect({
  initialize,
  initializeMaxHeight,
  onScroll,
}: InitializePostImageEffectProps) {
  const debouncedOnScroll = useMemo(
    () => debouncing(onScroll, 500, 2000),
    [onScroll],
  );

  useEffect(
    function addReizeListener() {
      initialize();

      const resizeListener = () => {
        initializeMaxHeight();
        debouncedOnScroll();
      };

      window.addEventListener("resize", resizeListener);
      return () => {
        window.removeEventListener("resize", resizeListener);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(
    function addScrollListener() {
      window.addEventListener("scroll", debouncedOnScroll);
      return () => {
        window.removeEventListener("scroll", debouncedOnScroll);
      };
    },
    [debouncedOnScroll],
  );

  return <></>;
}
