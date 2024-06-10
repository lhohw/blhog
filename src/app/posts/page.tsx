import { Suspense } from "react";
import LatestPosts from "@/components/templates/LatestPosts";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";

export default function Page() {
  return (
    <Suspense key={"posts"} fallback={<PostsSkeleton />}>
      <LatestPosts />
    </Suspense>
  );
}
