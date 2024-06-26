import type { PropsWithChildren } from "react";

export default function PostsContentWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1.6 flex-col p-4 min-w-72">
      <div className="flex flex-col md:flex-row">{children}</div>
    </div>
  );
}
