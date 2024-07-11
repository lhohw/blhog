"use client";

import { SizeContextProvider } from "./useSizeContext";
import PostsLinkSection from "./PostsLinkSection";
import GraphicLinkSection from "./GraphicLinkSection";

export default function HomeLinks() {
  return (
    <SizeContextProvider>
      <div className="flex flex-wrap p-2 [&>a]:m-2">
        <PostsLinkSection />
        <GraphicLinkSection />
      </div>
    </SizeContextProvider>
  );
}
