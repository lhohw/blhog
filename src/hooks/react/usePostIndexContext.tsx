"use client";

import type { Handler } from "@/types/type";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

export type PostIndexContext = {
  postHeadings: Array<{
    tagName: string;
    textContent: string;
    offsetTop: number;
    id: string;
  }>;
  currentIdx: number;
};

const postIndexContext = createContext<Handler<PostIndexContext>>(null!);

const initialState: PostIndexContext = {
  postHeadings: [],
  currentIdx: -1,
};
export const PostIndexContextProvider = ({ children }: PropsWithChildren) => {
  const handler = useState<PostIndexContext>(initialState);
  return (
    <postIndexContext.Provider value={handler}>
      {children}
    </postIndexContext.Provider>
  );
};

const usePostIndexContext = () => {
  const [{ postHeadings, currentIdx }, setPostIndexContext] =
    useContext(postIndexContext);

  const setIdx = useCallback(
    (idx: number) => {
      setPostIndexContext({ postHeadings, currentIdx: idx });
    },
    [setPostIndexContext, postHeadings],
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

  const initializePostIndexContext = useCallback(
    (postHeadings: PostIndexContext["postHeadings"]) => {
      const currentIdx = findNextIdx();
      setPostIndexContext({ postHeadings, currentIdx });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [findNextIdx, setPostIndexContext],
  );

  const resetPostIndexContext = useCallback(() => {
    setPostIndexContext(initialState);
  }, [setPostIndexContext]);

  const onPostIndexClick = useCallback(
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
    setPostIndexContext,
    findNextIdx,
    findPrevIdx,
    initializePostIndexContext,
    resetPostIndexContext,
    onPostIndexClick,
  };
};

export default usePostIndexContext;
