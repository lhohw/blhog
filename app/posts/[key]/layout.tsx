import Breadcrumbs from "@/app/ui/posts/[key]/Breadcrumbs";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col p-4">
      <Breadcrumbs />
      {children}
    </div>
  );
}
