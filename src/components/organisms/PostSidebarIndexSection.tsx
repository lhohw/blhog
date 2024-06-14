"use client";

import { Suspense } from "react";
import { clsx } from "clsx";
import Section from "@/components/molecules/Section";
import CaretDown from "@/components/icons/CaretDown";
import PostHeadings from "@/components/organisms/PostHeadings";

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
  return (
    <Section
      title="INDEX"
      titleClassName="text-xs md:text-xs pb-1"
      className="relative min-h-24 w-full block overflow-hidden transition-height md:flex md:flex-1 md:max-h-[100%!important] md:mb-4"
      // style={{ height }}
    >
      <Suspense fallback="post headings...">
        <PostHeadings headings={headings} />
      </Suspense>
      <button
        className={clsx(
          "absolute right-2 top-2 block w-6 h-6 cursor-pointer transition-transform duration-300 md:hidden",
          // isFold ? "rotate-0" : "rotate-180",
        )}
        // onClick={toggle}
      >
        <CaretDown />
      </button>
    </Section>
  );
}
