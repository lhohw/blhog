"use clent";

import { useEffect } from "react";
import { PostImage } from "./usePostImages";
import { getImagesInPost, getSidebar } from "@/lib/utils/dom";
import useDom from "@/hooks/react/useDom";

export type InitializePostImageEffectProps = {
  setImages: (images: PostImage[]) => void;
  setMaxHeight: (maxHeight: number) => void;
};
export default function InitializePostImageEffect({
  setImages,
  setMaxHeight,
}: InitializePostImageEffectProps) {
  const getCachedSidebar = useDom(getSidebar);
  const getCachedImages = useDom(getImagesInPost);

  useEffect(
    function initializeImages() {
      const images = getCachedImages().map(
        ({ src, alt, title, offsetTop }) => ({
          src,
          alt,
          title,
          offsetTop,
        }),
      );

      setImages(images);
    },
    [getCachedImages, setImages],
  );

  useEffect(
    function initializeMaxHeight() {
      const SIDEBAR_PADDING = 32;
      const INDEX_MIN_HEIGHT = 96;
      const POST_INDEX_SECTION_MARGIN_BOTTOM = 16;
      const sidebar = getCachedSidebar();

      const resizeListener = () => {
        const maxHeight =
          sidebar.offsetHeight -
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
    },
    [getCachedSidebar, setMaxHeight],
  );

  return <></>;
}
