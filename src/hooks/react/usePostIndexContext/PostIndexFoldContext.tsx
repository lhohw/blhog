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
  maxHeight: string;
};

const postIndexFoldContext = createContext<Handler<PostIndexFoldContext>>(
  null!,
);

const foldInitialState: PostIndexFoldContext = {
  isFold: false,
  maxHeight: undefined!,
};
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
  const [{ isFold, maxHeight }, setFoldContext] =
    useContext(postIndexFoldContext);

  const toggle = useCallback(() => {
    const nextIsFold = !isFold;
    setFoldContext({
      maxHeight: nextIsFold === true ? "0px" : "600px",
      isFold: !isFold,
    });
  }, [setFoldContext, isFold]);

  return {
    isFold,
    maxHeight,
    setFoldContext,
    toggle,
  };
};

export default usePostIndexFoldContext;
