import { fetchDirectoryNames } from "@/lib/api/post";
import { LinkListItemProps } from "../atoms/LinkListItem";
import NavLinks from "@/components/organisms/NavLinks";

export default async function SideNav() {
  const dirNames = await fetchDirectoryNames();
  const links: LinkListItemProps[] = dirNames.map(({ category }) => ({
    title: category,
    href: `/posts/${category}`,
  }));

  return <NavLinks links={links} />;
}
