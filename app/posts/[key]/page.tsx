import CategoryPosts from "@/app/ui/posts/[key]/CategoryPosts";

export default function Page({ params: { key } }: { params: { key: string } }) {
  return <CategoryPosts category={key} />;
}
