"use client";

import { useEffect, useRef } from "react";
import { debouncing } from "@/lib/utils/performance";
import usePostIndexContext, {
  type PostIndexHeadingsContext,
} from "@/hooks/react/usePostIndexContext";

export default function PostIndexEffect() {
  const {
    currentIdx,
    setIdx,
    findNextIdx,
    findPrevIdx,
    initializePostIndexHeadingsContext,
    resetPostIndexHeadingsContext,
    fold,
    initializeFoldContext,
    resetFoldContext,
  } = usePostIndexContext();

  useEffect(function initializeHeadings() {
    const postHeadings: PostIndexHeadingsContext["postHeadings"] =
      Array.from<HTMLHeadingElement>(document.querySelectorAll(".heading")).map(
        (heading) => {
          const { tagName, textContent, offsetTop, id } = heading;
          return { tagName, textContent: textContent ?? "", offsetTop, id };
        },
      );
    const HEADING_LI_HEIGHT = 24;
    const TITLE_HEIGHT = 20;
    const PADDING_Y = 48;
    const maxHeight =
      postHeadings.length * HEADING_LI_HEIGHT + TITLE_HEIGHT + PADDING_Y + "px";

    initializePostIndexHeadingsContext(postHeadings);
    initializeFoldContext(maxHeight);
    return () => {
      resetPostIndexHeadingsContext();
      resetFoldContext();
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

  useEffect(
    function isFoldResizeListener() {
      window.addEventListener("resize", fold);
      return () => {
        window.removeEventListener("resize", fold);
      };
    },
    [fold],
  );

  return <></>;
}
