"use client";

import { useEffect, useMemo } from "react";
import { debouncing } from "@/lib/utils/performance";

export type PostIndexEffectProps = {
  onScroll: () => void;
};
export default function PostIndexEffect({ onScroll }: PostIndexEffectProps) {
  const debouncedOnScroll = useMemo(
    () => debouncing(onScroll, 500, 2000),
    [onScroll],
  );
  const debouncedOnScrollForResize = useMemo(
    () => debouncing(onScroll, 500),
    [onScroll],
  );

  useEffect(function addResiseListener() {
    onScroll();

    window.addEventListener("resize", debouncedOnScrollForResize);
    return () => {
      window.removeEventListener("resize", debouncedOnScrollForResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
