import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "@mapbox/rehype-prism";
import components from "@/const/mdxComponents";

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
