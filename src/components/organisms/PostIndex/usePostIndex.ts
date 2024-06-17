"use client";

import { useCallback, useState } from "react";
import { getAllHeadingsInPost, getPostIndexUl } from "@/lib/utils/dom";
import { FOLDED_SIDEBAR_SIZE_UNDER_MD } from "@/const/size";
import useDom from "@/hooks/react/useDom";

export default function usePostIndex() {
  const [isRead, setIsRead] = useState<boolean[]>([]);

  const getAllHeadingsInPostWithCache = useDom(getAllHeadingsInPost);
  const getPostIndexUlWithCache = useDom(getPostIndexUl);

  const onHeadingClick = useCallback<React.MouseEventHandler>((e) => {
    e.preventDefault();
  }, []);

  const isReadHeading = useCallback((offsetTop: number) => {
    return offsetTop - FOLDED_SIDEBAR_SIZE_UNDER_MD <= window.scrollY;
  }, []);

  const syncScroll = useCallback(
    (lastIsReadIdx: number) => {
      if (lastIsReadIdx < 0) return;

      const ul = getPostIndexUlWithCache();
      const lastReadLi = ul.children[lastIsReadIdx] as HTMLLIElement;

      if (!lastReadLi) return;
      ul.scrollTo({ top: lastReadLi.offsetTop, behavior: "smooth" });
    },
    [getPostIndexUlWithCache],
  );

  const onScroll = useCallback(() => {
    const nextIsRead = [...isRead];
    let lastIsReadIdx = -1;

    const headingsInPost = getAllHeadingsInPostWithCache();

    for (let i = 0; i < headingsInPost.length; i++) {
      nextIsRead[i] = isReadHeading(headingsInPost[i].offsetTop);
      if (nextIsRead[i]) lastIsReadIdx = i;
    }

    setIsRead(nextIsRead);
    syncScroll(lastIsReadIdx);
  }, [getAllHeadingsInPostWithCache, isRead, isReadHeading, syncScroll]);

  return {
    isRead,
    onHeadingClick,
    onScroll,
  };
}
