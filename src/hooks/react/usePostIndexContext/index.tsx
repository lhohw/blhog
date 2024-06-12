"use client";

import type { PropsWithChildren } from "react";
import usePostIndexHeadingsContext, {
  PostIndexHeadingsContextProvider,
} from "./PostIndexHeadingsContext";
import usePostIndexFoldContext, {
  PostIndexFoldContextProvider,
} from "./PostIndexFoldContext";

export const PostIndexContextProvider = ({ children }: PropsWithChildren) => (
  <PostIndexHeadingsContextProvider>
    <PostIndexFoldContextProvider>{children}</PostIndexFoldContextProvider>
  </PostIndexHeadingsContextProvider>
);

export default function usePostIndexContext() {
  const postIndexHeadingsContext = usePostIndexHeadingsContext();
  const postIndexFoldContext = usePostIndexFoldContext();
  return {
    ...postIndexHeadingsContext,
    ...postIndexFoldContext,
  };
}

export type { PostIndexHeadingsContext } from "./PostIndexHeadingsContext";
export type { PostIndexFoldContext } from "./PostIndexFoldContext";
