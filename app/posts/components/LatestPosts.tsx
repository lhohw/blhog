import { fetchLatestPosts } from "@/app/lib/actions";
import Posts from "./Posts";

export default async function LatestPosts() {
  const latestPosts = await fetchLatestPosts();
  return <Posts posts={latestPosts} />;
}
