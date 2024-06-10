import type { PropsWithChildren } from "react";

export default function PostContentWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1.6 flex-col p-4 overflow-y-scroll mt-14 md:mt-0 min-w-72">
      <div className="flex flex-col md:flex-row">{children}</div>
    </div>
  );
}
