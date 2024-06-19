"use client";

import type { PostIndexProps } from ".";
import { getAllHeadingsInPost, getPostIndexUl } from "@/lib/utils/dom";
import useScrollSynchronizer from "@/hooks/react/useScrollSynchronizer";

export default function usePostIndex(headings: PostIndexProps["headings"]) {
  const { subjects, isPass, onListClick } = useScrollSynchronizer({
    initialSubjects: headings,
    observerUlSelector: getPostIndexUl,
    subjectItemsSelector: getAllHeadingsInPost,
  });

  return {
    postIndex: subjects,
    isPass,
    onListClick,
  };
}
