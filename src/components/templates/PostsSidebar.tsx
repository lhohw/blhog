import type { LinkListItemProps } from "@/components/atoms/LinkListItem";
import { fetchCategories } from "@/lib/api/post";
import SidebarLinks from "@/components/organisms/SidebarLinks";
import ResizableSidebar from "@/components/molecules/ResizableSidebar";

export default async function PostsSidebar() {
  const categories = await fetchCategories();
  const links: LinkListItemProps[] = categories.map(({ category }) => ({
    title: category,
    href: `/posts/${category}`,
  }));

  return (
    <ResizableSidebar>
      <SidebarLinks links={links} />
    </ResizableSidebar>
  );
}
