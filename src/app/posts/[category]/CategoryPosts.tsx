import { fetchPostsByCategory } from "@/lib/api/post";
import Posts from "@/components/organisms/Posts";

export default async function CategoryPosts({
  category,
}: {
  category: string;
}) {
  const posts = await fetchPostsByCategory(category);
  return <Posts posts={posts} />;
}
