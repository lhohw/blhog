import type { Metadata } from "next";
import type { PageProps } from "@/types/type";
import { Suspense } from "react";
import CategoryPosts from "@/components/templates/CategoryPosts";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";
import { fetchPostsByCategory } from "@/lib/api/post";

export async function generateMetadata({
  params,
}: PageProps<{ category: string }>): Promise<Metadata> {
  const category = params.category;
  const posts = await fetchPostsByCategory(category);
  const titles = posts.map((post) => post.title);

  return {
    title: `${category} posts`,
    description: `Posts related to ${category}\n${titles.join(" | ")}`,
    category,
    keywords: [category, ...titles],
  };
}

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
