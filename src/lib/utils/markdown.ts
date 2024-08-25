import type { ArrayOrNot } from "@/types/utility";
import React from "react";
import clsx from "clsx";
import { MDXRemoteProps } from "next-mdx-remote/rsc";
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
    const createHeading = (props: { children: string | JSX.Element }) => {
      const str = handleHeadingStr(props);
      const id = strToSlug(str).toLowerCase();
      return convertToMDX(tagName as "h1", id)(props);
    };
    return {
      ...acc,
      [tagName]: createHeading,
    };
  }, {});

  return headings;
};

export type HandleHeadingStrProps = {
  children: ArrayOrNot<string | { props: HandleHeadingStrProps }>;
};
export const handleHeadingStr = ({ children }: HandleHeadingStrProps) => {
  let ret = "";
  if (typeof children === "string") ret = children;
  else if (Array.isArray(children)) {
    for (const child of children) {
      ret += handleHeadingStr({ children: child });
    }
  } else if (typeof children === "object" && children.props) {
    ret = handleHeadingStr(children.props);
  }
  return ret;
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
