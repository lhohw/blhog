import Section from "@/components/molecules/Section";
import Posts from "@/components/organisms/Posts";
import { fetchLatestPosts } from "@/lib/api/post";

export default async function LatestPosts() {
  const latestPosts = await fetchLatestPosts();
  return (
    <Section title="Latest Posts" className="mt-14 md:mt-0">
      <Posts posts={latestPosts} />
    </Section>
  );
}
