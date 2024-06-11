"use client";

import Link from "next/link";
import { clsx } from "clsx";
import usePostIndexContext from "@/hooks/react/usePostIndexContext";
import Section from "@/components/molecules/Section";
import PostIndexEffect from "@/components/effects/PostIndexEffect";

export default function PostSidebarIndexSection() {
  const { postHeadings, currentIdx, onPostIndexClick } = usePostIndexContext();

  return (
    <>
      <Section
        title="INDEX"
        titleClassName="text-xs md:text-xs pb-1"
        className="flex-1 mb-4 overflow-hidden min-h-24"
      >
        <ul className="h-full text-wrap overflow-y-scroll relative">
          {postHeadings.map((heading, idx) => {
            const { tagName, textContent, id } = heading;
            const depth = parseInt(tagName.substring(1) || "0");

            return (
              <li
                key={id}
                className="text-text-alpha text-sm cursor-pointer transition-colors mt-1"
                style={{ marginLeft: `${depth * 0.5}rem` }}
              >
                <Link
                  className={clsx(idx === currentIdx && "text-primary")}
                  data-post-heading-idx={idx}
                  href={`#${id}`}
                  onClick={onPostIndexClick}
                >
                  {textContent}
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
      <PostIndexEffect />
    </>
  );
}
