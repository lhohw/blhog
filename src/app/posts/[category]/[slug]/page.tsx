import type { PageProps } from "@/types/type";
import Post from "@/components/templates/Post";
import "@/styles/post-prism.scss";

export default async function PostPage({
  params,
}: PageProps<{
  category: string;
  slug: string;
}>) {
  const { category, slug } = params;
  return <Post category={category} slug={slug} />;
}
