import type { LinkListItemProps } from "@/components/atoms/LinkListItem";
import { fetchDirectoryNames } from "@/lib/api/post";
import SidebarLinks from "@/components/organisms/SidebarLinks";

export default async function Sidebar() {
  const dirNames = await fetchDirectoryNames();
  const links: LinkListItemProps[] = dirNames.map(({ category }) => ({
    title: category,
    href: `/posts/${category}`,
  }));

  return <SidebarLinks links={links} />;
}
