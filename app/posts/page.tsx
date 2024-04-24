import { Suspense } from "react";
import LatestPosts from "@/app/ui/posts/LatestPosts";
import { PostsSkeleton } from "@/app/ui/skeletons";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row">
      <Suspense key={"posts"} fallback={<PostsSkeleton />}>
        <LatestPosts />
      </Suspense>
    </div>
  );
}
