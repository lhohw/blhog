"use client";

import { useEffect } from "react";
import { debouncing } from "@/lib/utils/performance";

export type PostIndexEffectProps = {
  offsetTop: number[];
  setOffsetTop: (offsetTop: number[]) => void;
  isRead: boolean[];
  setIsRead: (isRead: boolean[]) => void;
};
export default function PostIndexEffect({
  offsetTop,
  setOffsetTop,
  isRead,
  setIsRead,
}: PostIndexEffectProps) {
  useEffect(function initializePostIndex() {
    const { scrollY } = window;
    const headings = document.querySelectorAll(".heading");
    const initialOffsetTop = [];
    const initialIsRead = [];

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i] as HTMLHeadingElement;
      initialOffsetTop[i] = heading.offsetTop;
      initialIsRead[i] = initialOffsetTop[i] <= scrollY;
    }

    setOffsetTop(initialOffsetTop);
    setIsRead(initialIsRead);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function addScrollListener() {
      const scrollListener = debouncing(
        () => {
          const { scrollY } = window;
          const nextIsRead = [...isRead];
          for (let i = 0; i < nextIsRead.length; i++) {
            nextIsRead[i] = offsetTop[i] <= scrollY;
          }
          setIsRead(nextIsRead);
        },
        500,
        2000,
      );

      window.addEventListener("scroll", scrollListener);
      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    },
    [isRead, offsetTop, setIsRead],
  );

  return <></>;
}
