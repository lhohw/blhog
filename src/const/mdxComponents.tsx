import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import clsx from "clsx";
import { createMDXHeadings } from "@/lib/utils/markdown";
import { httpRegex, mdLinkRegex } from "@/const/regex";

const components: MDXRemoteProps["components"] = {
  a: ({ children, className, href = "", title, ...props }) => {
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
      <a
        className={clsx(className, "main-color")}
        href={href}
        target={isHttp ? "_blank" : "_self"}
        aria-label={title ?? `link to ${href}`}
        {...props}
      >
        {children}
      </a>
    );
  },
  ...createMDXHeadings(),
};

export default components;
