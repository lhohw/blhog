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
      className="relative min-h-24 flex-1 overflow-hidden transition-height md:max-h-[100%!important] md:mb-4"
      style={{ maxHeight }}
    >
      <ul className="relative h-full text-wrap overflow-y-scroll">
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
          "absolute right-2 top-2 block w-6 h-6 cursor-pointer transition-transform duration-300 md:hidden",
          isFold ? "rotate-0" : "rotate-180",
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
        className="mt-1 text-text-alpha text-sm cursor-pointer transition-colors"
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
