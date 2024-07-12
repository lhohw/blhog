import clsx from "clsx";
import { MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";
import { gunzipSync } from "zlib";
import { strToSlug } from "@/lib/utils/string";
import { Post } from "@/const/definitions";

export const withImageSize = (
  url: string,
  width: number | string,
  height: number | string = "auto",
) => {
  return `${url}?width=${width}&height=${height}`;
};

export const decompress = (body: Uint8Array) => {
  const decompressed = gunzipSync(body);
  const decoder = new TextDecoder("utf-8");
  const decoded = decoder.decode(decompressed);
  return decoded;
};

type DetailedHTMLProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;
export const convertToMDX =
  <T extends keyof HTMLElementTagNameMap, E = HTMLElementTagNameMap[T]>(
    tagName: T,
    id?: string,
  ) =>
  (props: DetailedHTMLProps<E>) => {
    const h = React.createElement(
      tagName,
      {
        className: clsx(props.className, "main-color heading"),
        id,
      },
      props.children,
    );
    return h;
  };

export const createMDXHeadings = () => {
  const headings = Array.from({ length: 6 }).reduce<
    MDXRemoteProps["components"]
  >((acc, _, idx) => {
    const tagName = `h${idx + 1}`;
    const createHeading = (props: DetailedHTMLProps<HTMLHeadingElement>) => {
      const id = strToSlug(props.children as string).toLowerCase();
      return convertToMDX(tagName as "h1", id)(props);
    };
    return {
      ...acc,
      [tagName]: createHeading,
    };
  }, {});

  return headings;
};

export const format = (date: Date) => {
  const formatter = Intl.DateTimeFormat("ko-KR", { dateStyle: "medium" });
  return formatter.format(date);
};

export const unserialize = (post: Post) => {
  const { title, body, headings, updated_at } = post;

  const decompressed = decompress(body);
  const headingsWithId = initHeadings(headings);
  const formattedUpdatedAt = format(updated_at);
  return {
    title,
    decompressed,
    headingsWithId,
    formattedUpdatedAt,
  };
};

const initHeadings = (headings: Post["headings"]) => {
  return headings.map((heading, i) => {
    const textContent = heading.textContent.replace(/\\/g, "");
    const id = textContent.toLowerCase().split(" ").join("-");
    return {
      id,
      tagName: heading.tagName,
      textContent,
    };
  });
};
