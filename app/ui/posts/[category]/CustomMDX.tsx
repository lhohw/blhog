import clsx from "clsx";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

const components: MDXRemoteProps["components"] = {
  a: (props) => (
    <a className={clsx(props.className, "main-color")}>{props.children}</a>
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

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
