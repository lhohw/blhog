import rehypePrism from "@mapbox/rehype-prism";
import clsx from "clsx";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";

const components: MDXRemoteProps["components"] = {
  a: ({ children, className, href, ...props }) => (
    <Link
      className={clsx(className, "main-color")}
      href={href || ""}
      {...props}
    >
      {children}
    </Link>
  ),
  h1: (props) => (
    <h1 className={clsx(props.className, "main-color")}>{props.children}</h1>
  ),
  h2: (props) => (
    <h2 className={clsx(props.className, "main-color")}>{props.children}</h2>
  ),
  h3: (props) => (
    <h3 className={clsx(props.className, "main-color")}>{props.children}</h3>
  ),
  h4: (props) => (
    <h4 className={clsx(props.className, "main-color")}>{props.children}</h4>
  ),
  h5: (props) => (
    <h5 className={clsx(props.className, "main-color")}>{props.children}</h5>
  ),
  h6: (props) => (
    <h6 className={clsx(props.className, "main-color")}>{props.children}</h6>
  ),
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
