import type { LinkListItemProps } from "@/components/atoms/LinkListItem";
import { Suspense } from "react";
import { fetchDirectoryNames } from "@/lib/api/post";
import SidebarLinks from "@/components/organisms/SidebarLinks";
import ResizableSidebar from "@/components/molecules/ResizableSidebar";
import SidebarSkeleton from "@/components/skeletons/SidebarSkeleton";

export default async function PostsSidebar() {
  const dirNames = await fetchDirectoryNames();
  const links: LinkListItemProps[] = dirNames.map(({ category }) => ({
    title: category,
    href: `/posts/${category}`,
  }));

  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <ResizableSidebar>
        <SidebarLinks links={links} />
      </ResizableSidebar>
    </Suspense>
  );
}
