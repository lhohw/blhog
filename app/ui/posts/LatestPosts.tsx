import { fetchLatestPosts } from "@/app/lib/actions";
import Posts from "@/app/ui/posts/Posts";
import AreaBox from "@/app/ui/AreaBox";

export default async function LatestPosts() {
  const latestPosts = await fetchLatestPosts();
  return (
    <AreaBox title="Latest Posts">
      <Posts posts={latestPosts} />
    </AreaBox>
  );
}
