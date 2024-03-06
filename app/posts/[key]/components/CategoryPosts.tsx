import { fetchPostsByKey } from "@/app/lib/actions";
import Posts from "../../components/Posts";

export default async function CategoryPosts({
  category,
}: {
  category: string;
}) {
  const posts = await fetchPostsByKey(category);
  return <Posts posts={posts} />;
}
