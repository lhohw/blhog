import { useCallback, useState } from "react";
import { getIndexHeadingsUl } from "@/lib/utils/dom";
import { MIN_POST_INDEX_UL_SIZE } from "@/const/size";
import useDom from "@/hooks/react/useDom";

export default function usePostIndexState() {
  const [height, setHeight] = useState(MIN_POST_INDEX_UL_SIZE);
  const [isFold, setIsFold] = useState(true);
  const getCachedIndexHeadingsUl = useDom(getIndexHeadingsUl);

  const getMaxHeight = useCallback(() => {
    const ul = getCachedIndexHeadingsUl();
    const maxHeight = Math.min(ul.scrollHeight, window.innerHeight - 76);
    return maxHeight;
  }, [getCachedIndexHeadingsUl]);

  const spread = useCallback(() => {
    setIsFold(false);
  }, []);

  const toggle = useCallback(() => {
    const nextIsFold = !isFold;
    const maxHeight = getMaxHeight();

    setIsFold(nextIsFold);
    setHeight(nextIsFold === true ? MIN_POST_INDEX_UL_SIZE : maxHeight);
  }, [isFold, getMaxHeight]);

  return {
    height,
    isFold,
    setHeight,
    getMaxHeight,
    toggle,
    spread,
  };
}
