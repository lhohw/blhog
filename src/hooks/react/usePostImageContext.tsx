"use client";

import type { Handler } from "@/types/type";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type PostImageContext = {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    offsetTop: number;
  }>;
};
const initialState = {
  images: [],
};
const postImageContext = createContext<Handler<PostImageContext>>(null!);

export const PostImageContextProvider = ({ children }: PropsWithChildren) => {
  const handler = useState<PostImageContext>(initialState);
  return (
    <postImageContext.Provider value={handler}>
      {children}
    </postImageContext.Provider>
  );
};

const usePostImageContext = () => {
  const [{ images }, setPostImageContext] = useContext(postImageContext);

  const resetPostImageContext = useCallback(() => {
    setPostImageContext(initialState);
  }, [setPostImageContext]);

  return {
    images,
    setPostImageContext,
    resetPostImageContext,
  };
};

export default usePostImageContext;
