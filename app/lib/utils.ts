import clsx from "clsx";
import { MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";
import { gunzipSync } from "zlib";

export const slugToStr = (slug: string) => slug.split("-").join(" ");
export const strToSlug = (str: string) => str.split(" ").join("-");

export const throttling = <T extends (...args: any[]) => void>(
  cb: T extends infer R ? R : (...args: any[]) => void,
  throttle = 500,
) => {
  let timer = 0;
  return (...args: Parameters<T>) => {
    const current = Date.now();
    if (current >= timer + throttle) {
      cb(...args);
      timer = current;
    }
  };
};

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

export const format = (date: Date) => {
  const formatter = Intl.DateTimeFormat("ko-KR", { dateStyle: "medium" });
  return formatter.format(date);
};

export const convertToMDX =
  <T extends keyof HTMLElementTagNameMap, E = HTMLElementTagNameMap[T]>(
    tagName: T,
    id?:
      | string
      | ((
          props: React.DetailedHTMLProps<React.HTMLAttributes<E>, E>,
        ) => string),
  ) =>
  (props: React.DetailedHTMLProps<React.HTMLAttributes<E>, E>) => {
    const h = React.createElement(
      tagName,
      {
        className: clsx(props.className, "main-color"),
        id: id && (typeof id === "string" ? id : id(props)),
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
    const heading = convertToMDX(tagName as "h1", (props) =>
      strToSlug(props.children as string),
    );
    return {
      ...acc,
      [tagName]: heading,
    };
  }, {});

  return headings;
};
