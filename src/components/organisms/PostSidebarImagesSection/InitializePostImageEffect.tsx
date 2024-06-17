"use clent";

import { useCallback, useEffect } from "react";
import { PostImage } from "./usePostImages";
import { getImagesInPost, getPostImagesUl, getSidebar } from "@/lib/utils/dom";
import { debouncing } from "@/lib/utils/performance";
import useDom from "@/hooks/react/useDom";
import { FOLDED_SIDEBAR_SIZE_UNDER_MD } from "@/const/size";

export type InitializePostImageEffectProps = {
  images: PostImage[];
  isRead: boolean[];
  setIsRead: (isRead: boolean[]) => void;
  setImages: (images: PostImage[]) => void;
  setMaxHeight: (maxHeight: number) => void;
};
export default function InitializePostImageEffect({
  images,
  isRead,
  setIsRead,
  setImages,
  setMaxHeight,
}: InitializePostImageEffectProps) {
  const getCachedSidebar = useDom(getSidebar);
  const getCachedImagesInPost = useDom(getImagesInPost);
  const getCachedImagesUlInSidebar = useDom(getPostImagesUl);

  const initializePostImages = useCallback(() => {
    const images = getCachedImagesInPost().map(
      ({ src, alt, title, offsetTop }) => ({
        src,
        alt,
        title,
        offsetTop,
      }),
    );
    const initialIsRead = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      initialIsRead[i] = isReadImage(image.offsetTop);
    }

    setImages(images);
    setIsRead(initialIsRead);
    syncScroll(initialIsRead.findLastIndex((e) => e === true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isReadImage = useCallback((offsetTop: number) => {
    return offsetTop - FOLDED_SIDEBAR_SIZE_UNDER_MD <= window.scrollY;
  }, []);

  const syncScroll = useCallback(
    (lastIsReadIdx: number) => {
      if (lastIsReadIdx < 0) return;

      const ul = getCachedImagesUlInSidebar();
      const lastReadLi = ul.children[lastIsReadIdx] as HTMLLIElement;

      if (!lastReadLi) return;
      ul.scrollTo({ top: lastReadLi.offsetTop, behavior: "smooth" });
    },
    [getCachedImagesUlInSidebar],
  );

  useEffect(
    function initialize() {
      initializePostImages();
      const resizeListener = debouncing(initializePostImages, 500);

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
      const scrollListener = debouncing(
        () => {
          const nextIsRead = [...isRead];
          let lastIsReadIdx = 0;
          for (let i = 0; i < nextIsRead.length; i++) {
            nextIsRead[i] = isReadImage(images[i].offsetTop);
            if (nextIsRead[i]) lastIsReadIdx = i;
          }
          setIsRead(nextIsRead);
          syncScroll(lastIsReadIdx);
        },
        500,
        2000,
      );

      window.addEventListener("scroll", scrollListener);
      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    },
    [images, isRead, isReadImage, setIsRead, syncScroll],
  );

  useEffect(
    function initializeMaxHeight() {
      const sidebar = getCachedSidebar();
      const SIDEBAR_PADDING = 32;
      const INDEX_MIN_HEIGHT = 96;
      const POST_INDEX_SECTION_MARGIN_BOTTOM = 16;

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
