import { Suspense } from "react";
import CategoryPosts from "@/app/ui/posts/[category]/CategoryPosts";
import Breadcrumbs from "@/app/ui/posts/[category]/Breadcrumbs";
import { PostsSkeleton } from "@/app/ui/skeletons";

export default function Page({ params }: PageProps<{ category: string }>) {
  const { category } = params;
  return (
    <>
      <Breadcrumbs />
      <Suspense key={"category-posts"} fallback={<PostsSkeleton />}>
        <CategoryPosts category={category} />
      </Suspense>
    </>
  );
}
