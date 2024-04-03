import { PropsWithChildren, Suspense } from "react";
import SideNav from "@/app/ui/posts/SideNav";
import { SideNavSkeleton } from "@/app/ui/skeletons";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full">
      <Suspense key={"side-nav"} fallback={<SideNavSkeleton />}>
        <SideNav />
      </Suspense>
      {children}
    </div>
  );
}
