"use client";

import { useEffect, useRef } from "react";
import { debouncing } from "@/lib/utils/performance";
import usePostIndexContext, {
  PostIndexContext,
} from "@/hooks/react/usePostIndexContext";

export default function PostIndexEffect() {
  const {
    currentIdx,
    setIdx,
    findNextIdx,
    findPrevIdx,
    initializePostIndexContext,
    resetPostIndexContext,
  } = usePostIndexContext();

  useEffect(function initializeHeadings() {
    const postHeadings: PostIndexContext["postHeadings"] =
      Array.from<HTMLHeadingElement>(document.querySelectorAll(".heading")).map(
        (heading) => {
          const { tagName, textContent, offsetTop, id } = heading;
          return { tagName, textContent: textContent ?? "", offsetTop, id };
        },
      );

    initializePostIndexContext(postHeadings);
    return () => {
      resetPostIndexContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevY = useRef(-1);
  useEffect(
    function addScrollListener() {
      const scrollListener = debouncing(
        () => {
          const { scrollY } = window;
          const nextIdx =
            prevY.current > scrollY ? findPrevIdx() : findNextIdx();

          prevY.current = scrollY;
          if (currentIdx !== nextIdx) setIdx(nextIdx);
        },
        500,
        2000,
      );

      window.addEventListener("scroll", scrollListener);
      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    },
    [findNextIdx, findPrevIdx, setIdx, currentIdx],
  );

  return <></>;
}
