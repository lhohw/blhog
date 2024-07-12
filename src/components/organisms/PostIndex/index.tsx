"use client";

import type { PostSidebarIndexSectionProps } from "@/components/organisms/PostSidebarIndexSection";
import { memo } from "react";
import Link from "next/link";
import clsx from "clsx";
import usePostIndex from "./usePostIndex";
import ScrollToHashEffect from "./scrollToHashEffect";

export type PostIndexProps = Pick<PostSidebarIndexSectionProps, "headings">;
export default function PostIndex({ headings }: PostIndexProps) {
  const { postIndex, isPass, onListClick } = usePostIndex(headings);

  return (
    <>
      <ul
        id="post-index-list"
        className="relative h-full text-wrap overflow-y-scroll"
      >
        {postIndex.map((heading, i) => {
          const { id, tagName, textContent } = heading;
          return (
            <PostIndexLi
              key={id}
              id={id}
              textContent={textContent || ""}
              tagName={tagName}
              isPass={isPass[i]}
              onListClick={onListClick}
            />
          );
        })}
      </ul>
      <ScrollToHashEffect />
    </>
  );
}

type PostIndexLiProps = PostIndexProps["headings"][number] & {
  isPass: boolean;
  onListClick: React.MouseEventHandler;
};
// eslint-disable-next-line react/display-name
const PostIndexLi = memo(
  ({ id, tagName, textContent, isPass, onListClick }: PostIndexLiProps) => {
    const depth = parseInt(tagName.substring(1) || "0");
    id = id.toLowerCase();

    return (
      <li
        id={id}
        className="mt-1 text-text-alpha text-sm cursor-pointer transition-colors"
        style={{ marginLeft: `${depth * 0.5}rem` }}
      >
        <Link
          className={clsx(isPass && "text-primary")}
          href={`#${id}`}
          onClick={onListClick}
          aria-label={`${textContent} post heading`}
        >
          {textContent}
        </Link>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isPass === nextProps.isPass;
  },
);
