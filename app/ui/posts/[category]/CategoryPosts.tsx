import { fetchPostsByCategory } from "@/app/lib/api/post";
import Posts from "@/app/ui/posts/Posts";

export default async function CategoryPosts({
  category,
}: {
  category: string;
}) {
  const posts = await fetchPostsByCategory(category);
  return <Posts posts={posts} />;
}
