"use client";

import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import usePostImageContext from "@/hooks/react/usePostImageContext";

export type PostIndexEffectProps = {
  setMax: Dispatch<SetStateAction<number>>;
};
export default function PostImageEffect({ setMax }: PostIndexEffectProps) {
  const { setPostImageContext, resetPostImageContext } = usePostImageContext();

  useEffect(
    function initializeImages() {
      const article = document.querySelector("article#post-article");
      if (!article) return;

      const imgs = article.querySelectorAll("img");
      if (!imgs) return;

      const images = Array.from(imgs).map((image) => {
        const { src, title, alt, offsetTop } = image;
        return { src, title, alt, offsetTop };
      });

      setPostImageContext({ images });
      return () => {
        resetPostImageContext();
      };
    },
    [setPostImageContext, resetPostImageContext],
  );

  const sidebar = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const SIDEBAR_PADDING = 32;
    const INDEX_MIN_HEIGHT = 96;
    const POST_INDEX_SECTION_MARGIN_BOTTOM = 16;

    const resizeListener = () => {
      if (!sidebar.current) {
        sidebar.current = document.querySelector("#sidebar") as HTMLDivElement;
      }

      const max =
        sidebar.current.offsetHeight -
        SIDEBAR_PADDING -
        INDEX_MIN_HEIGHT -
        POST_INDEX_SECTION_MARGIN_BOTTOM;

      setMax(max);
    };

    resizeListener();

    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [setMax]);

  return <></>;
}
