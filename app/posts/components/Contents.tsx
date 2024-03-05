import type { PropsWithChildren } from "react";
import Posts from "./Posts";
import NavBar from "./NavBar";

export default function Contents() {
  return (
    <ContentWrapper>
      <NavBar />
      <Posts />
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
