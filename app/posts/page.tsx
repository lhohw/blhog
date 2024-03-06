import { Suspense } from "react";
import LatestPosts from "@/app/ui/posts/LatestPosts";

export default function Page() {
  return (
    <div className="flex flex-[2] flex-col m-1 p-3">
      <div className="flex-1 flex flex-row overflow-y-scroll">
        <div className="flex flex-1 flex-col">
          <div className="mb-6 h-8 text-lg md:text-2xl text-sea-200">
            Latest Posts
          </div>
          <Suspense key={"posts"} fallback={<div>take 3 seconds...</div>}>
            <LatestPosts />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
