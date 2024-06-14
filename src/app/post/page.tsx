import type { PageProps } from "@/types/type";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import PostsContentWrapper from "@/components/atoms/wrapper/PostsContentWrapper";
import Post from "@/components/molecules/Post";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import PostSidebar from "@/components/templates/PostSidebar";
import { fetchPostByCategoryAndSlug } from "@/lib/api/post";
import { unserialize } from "@/lib/utils/markdown";

export default async function page({
  searchParams,
}: PageProps<void, { category: string; slug: string }>) {
  if (!searchParams.category || !searchParams.slug) notFound();

  const { category, slug } = searchParams;
  const post = await fetchPostByCategoryAndSlug(category, slug);
  if (!post) notFound();

  const { title, decompressed, headingsWithId, formattedUpdatedAt } =
    unserialize(post);

  return (
    <Suspense fallback={<PostSkeleton />}>
      <SidebarWrapper>
        <PostSidebar headings={headingsWithId} />
      </SidebarWrapper>
      <PostsContentWrapper>
        <Post
          title={title}
          updated_at={formattedUpdatedAt}
          decompressed={decompressed}
        />
      </PostsContentWrapper>
    </Suspense>
  );
}
