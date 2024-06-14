"use client";

import type { PostSidebarIndexSectionProps } from "@/components/organisms/PostSidebarIndexSection";
import { memo } from "react";
import Link from "next/link";
import clsx from "clsx";
import usePostIndex from "@/hooks/react/usePostIndex";
import PostIndexEffect from "@/components/effects/PostIndexEffect";

export type PostHeadingsProps = Pick<PostSidebarIndexSectionProps, "headings">;
export default function PostHeadings({ headings }: PostHeadingsProps) {
  const { isRead, setIsRead, offsetTop, setOffsetTop, onHeadingClick } =
    usePostIndex();
  return (
    <ul
      id="post-index-list"
      className="relative h-full text-wrap overflow-y-scroll"
    >
      {headings.map((heading, i) => {
        return (
          <PostHeadingLi
            key={heading.id}
            isRead={isRead[i]}
            {...heading}
            onHeadingClick={onHeadingClick}
          />
        );
      })}
      <PostIndexEffect
        isRead={isRead}
        setIsRead={setIsRead}
        offsetTop={offsetTop}
        setOffsetTop={setOffsetTop}
      />
    </ul>
  );
}

// eslint-disable-next-line react/display-name
const PostHeadingLi = memo(
  ({ id, tagName, textContent, isRead, onHeadingClick }: any) => {
    const depth = parseInt(tagName.substring(1) || "0");

    return (
      <li
        id={id}
        className="mt-1 text-text-alpha text-sm cursor-pointer transition-colors"
        style={{ marginLeft: `${depth * 0.5}rem` }}
      >
        <Link
          className={clsx(isRead && "text-primary")}
          href={`#${id}`}
          onClick={onHeadingClick}
        >
          {textContent}
        </Link>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isRead === nextProps.isRead;
  },
);
