"use client";

import { useCallback, useState } from "react";
import {
  FOLDED_SIDEBAR_SIZE_UNDER_MD,
  MIN_POST_INDEX_UL_SIZE,
  POST_INDEX_SECTION_MARGIN_BOTTOM,
  SIDEBAR_PADDING_Y,
} from "@/const/size";
import useDom from "@/hooks/react/useDom";
import { getImagesInPost, getPostImagesUl, getSidebar } from "@/lib/utils/dom";

export type PostImage = {
  src: string;
  alt: string;
  title?: string;
  offsetTop: number;
};

const usePostImages = () => {
  const [images, setImages] = useState<PostImage[]>([]);
  const [isRead, setIsRead] = useState<boolean[]>([]);
  const [maxHeight, setMaxHeight] = useState(100);

  const getCachedSidebar = useDom(getSidebar);
  const getCachedImagesUlInSidebar = useDom(getPostImagesUl);
  const getCachedImagesInPost = useDom(getImagesInPost);

  const initialize = useCallback(() => {
    initializePostImages();
    initializeMaxHeight();
    onScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeMaxHeight = useCallback(() => {
    const maxHeight =
      getCachedSidebar().offsetHeight -
      SIDEBAR_PADDING_Y -
      MIN_POST_INDEX_UL_SIZE -
      POST_INDEX_SECTION_MARGIN_BOTTOM;

    setMaxHeight(maxHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializePostImages = useCallback(() => {
    const postImages = getCachedImagesInPost();
    setImages(postImages);
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

  const onScroll = useCallback(() => {
    const nextIsRead = [...isRead];
    let lastIsReadIdx = -1;

    for (let i = 0; i < images.length; i++) {
      nextIsRead[i] = isReadImage(images[i].offsetTop);
      if (nextIsRead[i]) lastIsReadIdx = i;
    }

    setIsRead(nextIsRead);
    syncScroll(lastIsReadIdx);
  }, [images, isRead, isReadImage, syncScroll]);

  return {
    images,
    maxHeight,
    initialize,
    initializeMaxHeight,
    onScroll,
  };
};

export default usePostImages;
