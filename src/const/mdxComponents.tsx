import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import clsx from "clsx";
import { createMDXHeadings } from "@/lib/utils/markdown";
import { httpRegex, mdLinkRegex } from "@/const/regex";

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

export default components;
