import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrism from "@mapbox/rehype-prism";
import { createMDXHeadings } from "@/app/lib/utils";
import { httpRegex, mdLinkRegex } from "@/app/const/regex";

const components: MDXRemoteProps["components"] = {
  a: ({ children, className, href = "", ...props }) => {
    const isURI = children === href;
    href = decodeURIComponent(href);
    const isHttp = href.match(httpRegex);
    if (!isHttp) {
      const matched = mdLinkRegex.exec(href);
      if (matched) {
        href = href.replace(matched[0], matched[1] || "");
      }
    } else if (isURI) {
      children = href;
    }
    return (
      <Link
        className={clsx(className, "main-color")}
        href={href}
        target={isHttp ? "_blank" : "_self"}
        {...props}
      >
        {children}
      </Link>
    );
  },
  ...createMDXHeadings(),
};

export async function CustomMDX({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypePrism],
        },
        parseFrontmatter: true,
      }}
      components={components}
    />
  );
}
