"use client";

import { useCallback, useState } from "react";
import {
  MIN_POST_INDEX_UL_SIZE,
  POST_INDEX_SECTION_MARGIN_BOTTOM,
  SIDEBAR_PADDING_Y,
} from "@/const/size";
import { getImagesInPost, getPostImagesUl, getSidebar } from "@/lib/utils/dom";
import useScrollSynchronizer from "@/hooks/react/useScrollSynchronizer";
import useDom from "@/hooks/react/useDom";

export type PostImage = {
  src: string;
  alt: string;
  title?: string;
  offsetTop: number;
};

const usePostImages = () => {
  const getSidebarWithCache = useDom(getSidebar);
  const [maxHeight, setMaxHeight] = useState(100);

  const initializeCallback = useCallback(() => {
    const maxHeight =
      getSidebarWithCache().offsetHeight -
      SIDEBAR_PADDING_Y -
      MIN_POST_INDEX_UL_SIZE -
      POST_INDEX_SECTION_MARGIN_BOTTOM;

    setMaxHeight(maxHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { subjects } = useScrollSynchronizer({
    subjectItemsSelector: getImagesInPost,
    observerUlSelector: getPostImagesUl,
    initializeCallback,
    resizeCallback: initializeCallback,
  });

  return {
    images: subjects,
    maxHeight,
  };
};

export default usePostImages;
