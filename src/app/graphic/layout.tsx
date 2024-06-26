import type { PropsWithChildren } from "react";

export default function GraphicLayout({ children }: PropsWithChildren) {
  return (
    <div
      id="graphic-layout"
      className="flex flex-col mt-4 w-full full-except-header items-center justify-center"
    >
      {children}
    </div>
  );
}
