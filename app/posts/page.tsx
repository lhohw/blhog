import { Suspense } from "react";
import LatestPosts from "@/app/ui/posts/LatestPosts";
import { PostsSkeleton } from "@/app/ui/skeletons";

export default function Page() {
  return (
    <div className="flex flex-[2] flex-col m-1 p-3">
      <div className="flex-1 flex flex-col overflow-y-scroll">
        <div className="flex">
          <Suspense key={"posts"} fallback={<PostsSkeleton />}>
            <LatestPosts />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
