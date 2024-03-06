import Breadcrumbs from "@/app/ui/posts/[key]/Breadcrumbs";
import CategoryPosts from "@/app/ui/posts/[key]/CategoryPosts";

export default function Page({ params: { key } }: { params: { key: string } }) {
  return (
    <div className="flex flex-1 flex-col p-4">
      <Breadcrumbs />
      <CategoryPosts category={key} />
    </div>
  );
}
