import Breadcrumbs from "./components/Breadcrumbs";
import CategoryPosts from "./components/CategoryPosts";

export default function Page({ params: { key } }: { params: { key: string } }) {
  return (
    <div className="flex flex-1 flex-col p-4">
      <Breadcrumbs />
      <CategoryPosts category={key} />
    </div>
  );
}
