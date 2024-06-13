"use client";

import type { Handler } from "@/types/type";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

export type PostIndexFoldContext = {
  isFold: boolean;
  height: string;
  maxHeight: string;
};

const postIndexFoldContext = createContext<Handler<PostIndexFoldContext>>(
  null!,
);

const foldInitialState: PostIndexFoldContext = {
  isFold: false,
  height: undefined!,
  maxHeight: undefined!,
};
const MIN_HEIGHT = "96px";
export const PostIndexFoldContextProvider = ({
  children,
}: PropsWithChildren) => {
  const foldHandler = useState<PostIndexFoldContext>(foldInitialState);
  return (
    <postIndexFoldContext.Provider value={foldHandler}>
      {children}
    </postIndexFoldContext.Provider>
  );
};

const usePostIndexFoldContext = () => {
  const [{ isFold, height, maxHeight }, setFoldContext] =
    useContext(postIndexFoldContext);

  const fold = useCallback(() => {
    setFoldContext({ height: MIN_HEIGHT, isFold: true, maxHeight });
  }, [setFoldContext, maxHeight]);

  const unfold = useCallback(() => {
    setFoldContext({ height: maxHeight, isFold: false, maxHeight });
  }, [setFoldContext, maxHeight]);

  const toggle = useCallback(() => {
    const nextIsFold = !isFold;
    setFoldContext({
      height: nextIsFold === true ? MIN_HEIGHT : maxHeight,
      isFold: !isFold,
      maxHeight,
    });
  }, [setFoldContext, isFold, maxHeight]);

  const initializeFoldContext = useCallback((maxHeight: string) => {
    const shouldFold = window.scrollY !== 0;
    if (shouldFold) {
      setFoldContext({ height: MIN_HEIGHT, isFold: true, maxHeight });
    } else {
      setFoldContext({ height: maxHeight, isFold, maxHeight });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetFoldContext = useCallback(() => {
    setFoldContext(foldInitialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isFold,
    height,
    setFoldContext,
    fold,
    unfold,
    toggle,
    initializeFoldContext,
    resetFoldContext,
  };
};

export default usePostIndexFoldContext;
