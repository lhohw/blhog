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
    isFold,
    setFoldContext,
  } = usePostIndexContext();

  useEffect(function initializeHeadings() {
    const postHeadings: PostIndexHeadingsContext["postHeadings"] =
      Array.from<HTMLHeadingElement>(document.querySelectorAll(".heading")).map(
        (heading) => {
          const { tagName, textContent, offsetTop, id } = heading;
          return { tagName, textContent: textContent ?? "", offsetTop, id };
        },
      );

    initializePostIndexHeadingsContext(postHeadings);
    return () => {
      resetPostIndexHeadingsContext();
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

  useEffect(function initializeIsFold() {
    const { scrollY } = window;
    const isFold = scrollY !== 0;
    setFoldContext({ isFold, maxHeight: isFold ? "0" : "none" });
    return () => {
      setFoldContext({ isFold: false, maxHeight: "none" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function isFoldResizeListener() {
      const resizeListener = () => {
        setFoldContext({ isFold: true, maxHeight: "0" });
      };
      window.addEventListener("resize", resizeListener);
      return () => {
        window.removeEventListener("resize", resizeListener);
      };
    },
    [setFoldContext],
  );

  return <></>;
}
