import { Suspense } from "react";
import CategoryPosts from "@/app/ui/posts/[category]/CategoryPosts";
import Breadcrumbs from "@/app/ui/posts/[category]/Breadcrumbs";
import { PostsSkeleton } from "@/app/ui/skeletons";

export default function Page({ params }: PageProps<{ category: string }>) {
  const { category } = params;
  return (
    <div className="p-4 flex flex-col">
      <Breadcrumbs />
      <Suspense key={"category-posts"} fallback={<PostsSkeleton />}>
        <CategoryPosts category={category} />
      </Suspense>
    </div>
  );
}
