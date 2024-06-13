import type { PropsWithChildren } from "react";

export default function PostSidebarWrapper({ children }: PropsWithChildren) {
  return (
    <div className="absolute top-0 left-0 z-10 flex flex-col w-full p-4 bg-background transition-height duration-300 delay-100 md:static md:h-full md:border-r-slight md:border-primary md:bg-background-alpha">
      <div className="flex flex-col h-full">{children}</div>
    </div>
  );
}