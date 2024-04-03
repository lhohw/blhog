import { Suspense } from "react";
import LatestPosts from "@/app/ui/posts/LatestPosts";
import { PostsSkeleton, SideNavSkeleton } from "@/app/ui/skeletons";
import CategoryList from "../ui/posts/CategoryList";

export default function Page() {
  return (
    <div className="flex flex-[2] flex-col m-1 p-3">
      <div className="flex-1 flex flex-col overflow-y-scroll">
        <div className="flex flex-col md:flex-row">
          <Suspense key={"posts"} fallback={<PostsSkeleton />}>
            <LatestPosts />
          </Suspense>
          <Suspense key={"categories"} fallback={<SideNavSkeleton />}>
            <CategoryList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
