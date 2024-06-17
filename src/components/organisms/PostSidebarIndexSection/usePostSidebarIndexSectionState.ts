import { useCallback, useState } from "react";
import { getPostIndexUl } from "@/lib/utils/dom";
import { MIN_POST_INDEX_UL_SIZE } from "@/const/size";
import useDom from "@/hooks/react/useDom";

export default function usePostSidebarIndexSectionState() {
  const [height, setHeight] = useState(MIN_POST_INDEX_UL_SIZE);
  const [isFold, setIsFold] = useState(true);
  const getCachedIndexHeadingsUl = useDom(getPostIndexUl);

  const calculateMaxHeight = useCallback(() => {
    const ul = getCachedIndexHeadingsUl();
    const maxHeight = Math.min(ul.scrollHeight, window.innerHeight - 76);
    return maxHeight;
  }, [getCachedIndexHeadingsUl]);

  const spread = useCallback(() => {
    setIsFold(false);
  }, []);

  const toggle = useCallback(() => {
    const nextIsFold = !isFold;
    const maxHeight = calculateMaxHeight();

    setIsFold(nextIsFold);
    setHeight(nextIsFold === true ? MIN_POST_INDEX_UL_SIZE : maxHeight);
  }, [isFold, calculateMaxHeight]);

  return {
    height,
    isFold,
    setHeight,
    calculateMaxHeight,
    toggle,
    spread,
  };
}
