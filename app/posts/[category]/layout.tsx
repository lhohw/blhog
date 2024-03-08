import type { PropsWithChildren } from "react";
import Breadcrumbs from "@/app/ui/posts/[category]/Breadcrumbs";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col p-4 overflow-y-scroll">
      <Breadcrumbs />
      {children}
    </div>
  );
}
