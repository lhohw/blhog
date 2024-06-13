import type { PageProps } from "@/types/type";
import { Suspense } from "react";
import CategoryPosts from "@/components/templates/CategoryPosts";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";

export default function Page({ params }: PageProps<{ category: string }>) {
  const { category } = params;
  return (
    <div className="p-4 flex flex-col mt-14 md:mt-0">
      <Breadcrumbs />
      <Suspense key={"category-posts"} fallback={<PostsSkeleton />}>
        <CategoryPosts category={category} />
      </Suspense>
    </div>
  );
}
