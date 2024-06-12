import type { PropsWithChildren } from "react";

export default function SidebarWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={`
          sticky z-10 top-12 flex flex-col rounded-tr-2xl mx-4 mt-4 mb-0
          md:min-w-[230px] md:mb-4 md:top-[56px] md:h-[calc(100vh-108px)]
        `}
    >
      {children}
    </div>
  );
}
