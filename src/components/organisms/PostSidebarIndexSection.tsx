"use client";

import { memo } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import usePostIndexContext from "@/hooks/react/usePostIndexContext";
import Section from "@/components/molecules/Section";
import CaretDown from "@/components/icons/CaretDown";

export default function PostSidebarIndexSection() {
  const {
    postHeadings,
    currentIdx,
    onPostIndexHeadingClick,
    maxHeight,
    isFold,
    toggle,
  } = usePostIndexContext();

  return (
    <Section
      id="sidebar-index-section"
      title="INDEX"
      titleClassName="text-xs md:text-xs pb-1"
      className="flex-1 mb-4 overflow-hidden min-h-24 transition-height relative md:max-h-[100%!important]"
      style={{ maxHeight }}
    >
      <ul className="h-full text-wrap overflow-y-scroll relative">
        {postHeadings.map((heading, idx) => {
          const isCurrent = idx === currentIdx;
          return (
            <PostHeadingLi
              key={heading.id}
              isCurrent={isCurrent}
              idx={idx}
              onPostIndexHeadingClick={onPostIndexHeadingClick}
              {...heading}
            />
          );
        })}
      </ul>
      <button
        className={clsx(
          "w-6 h-6 block md:hidden absolute right-2 top-2 cursor-pointer transition-transform duration-300",
          isFold ? "rotate-180" : "rotate-0",
        )}
        onClick={toggle}
      >
        <CaretDown />
      </button>
    </Section>
  );
}

type PostHeadingLiProps = {
  id: string;
  tagName: string;
  textContent: string;
  isCurrent: boolean;
  idx: number;
  onPostIndexHeadingClick: React.MouseEventHandler;
};
// eslint-disable-next-line react/display-name
const PostHeadingLi = memo(
  ({
    id,
    tagName,
    textContent,
    isCurrent,
    idx,
    onPostIndexHeadingClick,
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
          onClick={onPostIndexHeadingClick}
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
