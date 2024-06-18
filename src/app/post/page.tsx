import type { Metadata } from "next";
import type { PageProps } from "@/types/type";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import PostsContentWrapper from "@/components/atoms/wrapper/PostsContentWrapper";
import Post from "@/components/molecules/Post";
import PostPageSkeleton from "@/components/skeletons/PostPageSkeleton";
import PostSidebar from "@/components/templates/PostSidebar";
import { fetchPostByCategoryAndSlug } from "@/lib/api/post";
import { unserialize } from "@/lib/utils/markdown";

export async function generateMetadata({
  searchParams,
}: PageProps<void, { category: string; slug: string }>): Promise<Metadata> {
  const category = searchParams.category;
  const slug = searchParams.slug;
  const post = await fetchPostByCategoryAndSlug(category, slug);
  if (!post) {
    return {
      title: slug,
      description: `${category} ${slug} Post`,
      keywords: [category, slug],
    };
  }

  const { title, headings } = post;

  return {
    title,
    category,
    description: `${category} ${title} Post`,
    keywords: [category, slug, title, ...headings.map((h) => h.textContent)],
  };
}

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
    <Suspense fallback={<PostPageSkeleton />}>
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
