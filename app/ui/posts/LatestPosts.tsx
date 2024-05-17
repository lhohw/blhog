import Posts from "@/app/ui/posts/Posts";
import AreaBox from "@/app/ui/AreaBox";
import { fetchLatestPosts } from "@/app/lib/api/post";

export default async function LatestPosts() {
  const latestPosts = await fetchLatestPosts();
  return (
    <AreaBox title="Latest Posts">
      <Posts posts={latestPosts} />
    </AreaBox>
  );
}
