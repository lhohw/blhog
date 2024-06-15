"use client";

import { useCallback, useEffect } from "react";
import { FOLDED_SIDEBAR_SIZE_UNDER_MD } from "@/const/size";
import { debouncing } from "@/lib/utils/performance";
import { getAllHeadingsInPost, getIndexHeadingsUl } from "@/lib/utils/dom";

export type PostIndexEffectProps = {
  offsetTop: number[];
  setOffsetTop: (offsetTop: number[]) => void;
  isRead: boolean[];
  setIsRead: (isRead: boolean[]) => void;
};
export default function PostIndexEffect({
  offsetTop,
  setOffsetTop,
  isRead,
  setIsRead,
}: PostIndexEffectProps) {
  const initializePostIndex = useCallback(() => {
    const headingsInPost = getAllHeadingsInPost();
    const initialOffsetTop = [];
    const initialIsRead = [];

    for (let i = 0; i < headingsInPost.length; i++) {
      const heading = headingsInPost[i] as HTMLHeadingElement;
      initialOffsetTop[i] = heading.offsetTop;
      initialIsRead[i] = isReadHeading(initialOffsetTop[i]);
    }

    setOffsetTop(initialOffsetTop);
    setIsRead(initialIsRead);
    syncScroll(initialIsRead.findLastIndex((e) => e === true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isReadHeading = useCallback((offsetTop: number) => {
    return offsetTop - FOLDED_SIDEBAR_SIZE_UNDER_MD <= window.scrollY;
  }, []);

  const syncScroll = useCallback((lastIsReadIdx: number) => {
    if (lastIsReadIdx < 0) return;

    const ul = getIndexHeadingsUl();
    const lastReadLi = ul.children[lastIsReadIdx] as HTMLLIElement;

    ul.scrollTo({ top: lastReadLi.offsetTop, behavior: "smooth" });
  }, []);

  useEffect(function initialize() {
    initializePostIndex();
    const resizeListener = debouncing(initializePostIndex, 500);

    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function addScrollListener() {
      const scrollListener = debouncing(
        () => {
          const nextIsRead = [...isRead];
          let lastIsReadIdx = 0;
          for (let i = 0; i < nextIsRead.length; i++) {
            nextIsRead[i] = isReadHeading(offsetTop[i]);
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
    [isRead, isReadHeading, offsetTop, setIsRead, syncScroll],
  );

  return <></>;
}
