"use client";

import { memo } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import usePostIndexContext from "@/hooks/react/usePostIndexContext";
import Section from "@/components/molecules/Section";

export default function PostSidebarIndexSection() {
  const { postHeadings, currentIdx, onPostIndexClick } = usePostIndexContext();

  return (
    <Section
      title="INDEX"
      titleClassName="text-xs md:text-xs pb-1"
      className="flex-1 mb-4 overflow-hidden min-h-24"
    >
      <ul className="h-full text-wrap overflow-y-scroll relative">
        {postHeadings.map((heading, idx) => {
          const isCurrent = idx === currentIdx;
          return (
            <PostHeadingLi
              key={heading.id}
              isCurrent={isCurrent}
              idx={idx}
              onPostIndexClick={onPostIndexClick}
              {...heading}
            />
          );
        })}
      </ul>
    </Section>
  );
}

type PostHeadingLiProps = {
  id: string;
  tagName: string;
  textContent: string;
  isCurrent: boolean;
  idx: number;
  onPostIndexClick: React.MouseEventHandler;
};
// eslint-disable-next-line react/display-name
const PostHeadingLi = memo(
  ({
    id,
    tagName,
    textContent,
    isCurrent,
    idx,
    onPostIndexClick,
  }: PostHeadingLiProps) => {
    const depth = parseInt(tagName.substring(1) || "0");

    return (
      <li
        className="text-text-alpha text-sm cursor-pointer transition-colors mt-1"
        style={{ marginLeft: `${depth * 0.5}rem` }}
      >
        <Link
          className={clsx(isCurrent && "text-primary")}
          data-post-heading-idx={idx}
          href={`#${id}`}
          onClick={onPostIndexClick}
        >
          {textContent}
        </Link>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isCurrent === nextProps.isCurrent;
  },
);
