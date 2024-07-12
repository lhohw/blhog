import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import clsx from "clsx";
import { createMDXHeadings } from "@/lib/utils/markdown";
import { httpRegex } from "@/const/regex";

const components: MDXRemoteProps["components"] = {
  a: ({ children, className, href = "", title, ...props }) => {
    const isURI = children === href;
    href = decodeURIComponent(href);
    const isHttp = href.match(httpRegex);

    if (isURI) children = href;

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
