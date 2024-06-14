import { Suspense, type PropsWithChildren } from "react";
import Resizer from "@/components/atoms/Resizer";
import SidebarSkeleton from "@/components/skeletons/SidebarSkeleton";

export default function ResizableSidebar({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col h-full rounded-tr-2xl relative shadow-md">
      <Suspense fallback={<SidebarSkeleton />}>
        <Resizer
          className="min-w-full max-w-full"
          initialLength={350}
          min={300}
          max={700}
          direction="right"
        >
          {children}
        </Resizer>
      </Suspense>
    </div>
  );
}
