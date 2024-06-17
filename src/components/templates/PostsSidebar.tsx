import type { LinkListItemProps } from "@/components/atoms/LinkListItem";
import { fetchDirectoryNames } from "@/lib/api/post";
import SidebarLinks from "@/components/organisms/SidebarLinks";
import ResizableSidebar from "@/components/molecules/ResizableSidebar";

export default async function PostsSidebar() {
  const dirNames = await fetchDirectoryNames();
  const links: LinkListItemProps[] = dirNames.map(({ category }) => ({
    title: category,
    href: `/posts/${category}`,
  }));

  return (
    <ResizableSidebar>
      <SidebarLinks links={links} />
    </ResizableSidebar>
  );
}
