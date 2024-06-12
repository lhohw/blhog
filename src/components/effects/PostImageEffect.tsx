"use client";

import { useEffect, useRef } from "react";
import usePostImageContext from "@/hooks/react/usePostImageContext";

export default function PostImageEffect() {
  const {
    initializeImages: initImages,
    resetImages,
    setMaxHeight,
  } = usePostImageContext();

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

      initImages(images);
      return () => {
        resetImages();
      };
    },
    [initImages, resetImages],
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

      const maxHeight =
        sidebar.current.offsetHeight -
        SIDEBAR_PADDING -
        INDEX_MIN_HEIGHT -
        POST_INDEX_SECTION_MARGIN_BOTTOM;

      setMaxHeight(maxHeight);
    };

    resizeListener();

    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [setMaxHeight]);

  return <></>;
}
