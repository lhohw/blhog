"use client";

import type { Handler } from "@/types/type";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

export type PostIndexHeadingsContext = {
  postHeadings: Array<{
    tagName: string;
    textContent: string;
    offsetTop: number;
    id: string;
  }>;
  currentIdx: number;
};
const postIndexHeadingsContext = createContext<
  Handler<PostIndexHeadingsContext>
>(null!);

const headingsInitialState: PostIndexHeadingsContext = {
  postHeadings: [],
  currentIdx: -1,
};
export const PostIndexHeadingsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const headingsHandler =
    useState<PostIndexHeadingsContext>(headingsInitialState);
  return (
    <postIndexHeadingsContext.Provider value={headingsHandler}>
      {children}
    </postIndexHeadingsContext.Provider>
  );
};

const usePostIndexHeadingsContext = () => {
  const [{ postHeadings, currentIdx }, setPostIndexHeadingsContext] =
    useContext(postIndexHeadingsContext);

  const setIdx = useCallback(
    (idx: number) => {
      setPostIndexHeadingsContext({ postHeadings, currentIdx: idx });
    },
    [setPostIndexHeadingsContext, postHeadings],
  );

  const findNextIdx = useCallback(() => {
    let nextIdx = currentIdx;
    while (
      nextIdx + 1 < postHeadings.length &&
      postHeadings[nextIdx + 1].offsetTop <= window.scrollY
    ) {
      nextIdx++;
    }
    return Math.max(0, nextIdx);
  }, [currentIdx, postHeadings]);

  const findPrevIdx = useCallback(() => {
    let nextIdx = currentIdx;
    while (
      nextIdx - 1 >= 0 &&
      postHeadings[nextIdx - 1].offsetTop >= window.scrollY
    ) {
      nextIdx--;
    }
    return Math.min(postHeadings.length - 1, nextIdx);
  }, [currentIdx, postHeadings]);

  const initializePostIndexHeadingsContext = useCallback(
    (postHeadings: PostIndexHeadingsContext["postHeadings"]) => {
      const currentIdx = findNextIdx();
      setPostIndexHeadingsContext({ postHeadings, currentIdx });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [findNextIdx, setPostIndexHeadingsContext],
  );

  const resetPostIndexHeadingsContext = useCallback(() => {
    setPostIndexHeadingsContext(headingsInitialState);
  }, [setPostIndexHeadingsContext]);

  const onPostIndexHeadingClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();

      const target = e.target as HTMLAnchorElement;
      const idx = parseInt(
        target.getAttribute("data-post-heading-idx") || "-1",
      );
      if (idx === -1 || idx >= postHeadings.length) return;

      const top = postHeadings[idx].offsetTop;
      window.scrollTo({ top: top - 48, behavior: "smooth" });
    },
    [postHeadings],
  );

  return {
    postHeadings,
    currentIdx,
    setIdx,
    setPostIndexHeadingsContext,
    findNextIdx,
    findPrevIdx,
    initializePostIndexHeadingsContext,
    resetPostIndexHeadingsContext,
    onPostIndexHeadingClick,
  };
};

export default usePostIndexHeadingsContext;
