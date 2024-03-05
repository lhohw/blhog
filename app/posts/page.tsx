import { Suspense } from "react";
import Breadcrumbs, { Breadcrumb } from "./components/Breadcrumbs";
import Posts from "./components/Posts";

export default function Page() {
  const breadcrumbs: Breadcrumb[] = [
    {
      label: "Latest Posts",
      href: "posts",
      active: true,
    },
  ];
  return (
    <div className="flex flex-[2] flex-col m-1 p-3">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex-1 flex flex-col overflow-y-scroll">
        <Suspense key={"posts"} fallback={<div>take 3 seconds...</div>}>
          <Posts />
        </Suspense>
      </div>
    </div>
  );
}
