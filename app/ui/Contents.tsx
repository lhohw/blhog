import type { PropsWithChildren } from "react";
import Posts from "@/app/ui//Posts";
import NavBar from "@/app/ui//NavBar";

export default function Contents() {
  return (
    <ContentWrapper>
      <NavBar />
      <div className="flex flex-col flex-1.6 h-full overflow-y-scroll p-2">
        posts
      </div>
    </ContentWrapper>
  );
}

const ContentWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-1 overflow-y-hidden items-center justify-center">
      {children}
    </div>
  );
};
