import type { Metadata } from "next";
import { Suspense } from "react";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";
import LatestPosts from "@/components/templates/LatestPosts";

export const metadata: Metadata = {
  title: "Latest Posts",
};

export default function Page() {
  return (
    <Suspense key={"posts"} fallback={<PostsSkeleton />}>
      <LatestPosts />
    </Suspense>
  );
}
