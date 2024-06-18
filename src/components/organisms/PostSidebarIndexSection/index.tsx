"use client";

import { Suspense } from "react";
import { clsx } from "clsx";
import Section from "@/components/molecules/Section";
import CaretDown from "@/components/icons/CaretDown";
import PostIndex from "@/components/organisms/PostIndex";
import PostSidebarIndexSectionEffect from "./PostSidebarIndexSectionEffect";
import usePostSidebarIndexSectionState from "./usePostSidebarIndexSectionState";

export type PostSidebarIndexSectionProps = {
  headings: {
    id: string;
    tagName: string;
    textContent: string;
  }[];
};
export default function PostSidebarIndexSection({
  headings,
}: PostSidebarIndexSectionProps) {
  const { height, isFold, calculateMaxHeight, setHeight, spread, toggle } =
    usePostSidebarIndexSectionState();

  return (
    <>
      <Section
        title="INDEX"
        titleClassName="text-xs md:text-xs pb-1"
        className="relative min-h-24 w-full block overflow-hidden transition-height md:flex md:flex-1 md:h-[100%!important] md:mb-4"
        style={{ height }}
      >
        <Suspense fallback="post headings...">
          <PostIndex headings={headings} />
        </Suspense>
        <button
          className={clsx(
            "absolute right-2 top-2 block w-8 h-8 cursor-pointer transition-transform duration-300 md:hidden",
            isFold ? "rotate-0" : "rotate-180",
          )}
          aria-label="toggle post index"
          onClick={toggle}
        >
          <CaretDown />
        </button>
      </Section>
      <PostSidebarIndexSectionEffect
        isFold={isFold}
        calculateMaxHeight={calculateMaxHeight}
        setHeight={setHeight}
        spread={spread}
        toggle={toggle}
      />
    </>
  );
}
