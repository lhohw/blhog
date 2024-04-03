import { fetchLatestPosts } from "@/app/lib/actions";
import Posts from "@/app/ui/posts/Posts";

export default async function LatestPosts() {
  const latestPosts = await fetchLatestPosts();
  return (
    <div className="flex flex-col p-4 border-sea-200 border-slight rounded-lg">
      <h3 className="mb-6 h-8 text-lg md:text-2xl main-color">Latest Posts</h3>
      <Posts posts={latestPosts} />
    </div>
  );
}
