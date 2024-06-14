import { Suspense } from "react";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";
import LatestPosts from "@/components/templates/LatestPosts";

export default function Page() {
  return (
    <Suspense key={"posts"} fallback={<PostsSkeleton />}>
      <LatestPosts />
    </Suspense>
  );
}
