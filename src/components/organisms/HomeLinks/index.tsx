"use client";

import { SizeContextProvider } from "./useSizeContext";
import PostsLinkSection from "./PostsLinkSection";
import GraphicLinkSection from "./GraphicLinkSection";

export default function HomeLinks() {
  return (
    <SizeContextProvider>
      <PostsLinkSection />
      <GraphicLinkSection />
    </SizeContextProvider>
  );
}
