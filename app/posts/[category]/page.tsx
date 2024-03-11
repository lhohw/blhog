import CategoryPosts from "@/app/ui/posts/[category]/CategoryPosts";
import Post from "@/app/ui/posts/[category]/Post";

export default function Page({
  params,
  searchParams,
}: PageProps<{ category: string }, { id?: string }>) {
  const { category } = params;
  const id = searchParams?.id;
  if (id == undefined) return <CategoryPosts category={category} />;
  return <Post category={category} id={id} />;
}
