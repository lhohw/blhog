"use client";

import type { Handler } from "@/types/type";
import {
  type PropsWithChildren,
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
export type PostSidebarImageSectionHeightContext = {
  maxHeight: number;
};
const imageInitialState = {
  images: [],
};
const heightInitialState = {
  maxHeight: 100,
};
const imageContext = createContext<Handler<PostImageContext>>(null!);
const heightContext = createContext<
  Handler<PostSidebarImageSectionHeightContext>
>(null!);

export const PostImageContextProvider = ({ children }: PropsWithChildren) => {
  const imageHandler = useState<PostImageContext>(imageInitialState);
  const heightHandler =
    useState<PostSidebarImageSectionHeightContext>(heightInitialState);
  return (
    <heightContext.Provider value={heightHandler}>
      <imageContext.Provider value={imageHandler}>
        {children}
      </imageContext.Provider>
    </heightContext.Provider>
  );
};

const usePostImageContext = () => {
  const [{ images }, setPostImageContext] = useContext(imageContext);
  const [{ maxHeight }, setHeightContext] = useContext(heightContext);

  const initializeImages = useCallback(
    (images: PostImageContext["images"]) => {
      setPostImageContext({ images });
    },
    [setPostImageContext],
  );

  const resetImages = useCallback(() => {
    setPostImageContext({ images: imageInitialState.images });
  }, [setPostImageContext]);

  const setMaxHeight = useCallback(
    (height: number) => {
      setHeightContext({ maxHeight: height });
    },
    [setHeightContext],
  );

  return {
    images,
    maxHeight,
    resetImages,
    setMaxHeight,
    initializeImages,
  };
};

export default usePostImageContext;
