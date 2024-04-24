import type { Metadata } from "next";
import { Suspense, type PropsWithChildren } from "react";
import Header from "@/app/ui/posts/Header";
import SideNav from "@/app/ui/posts/SideNav";
import { SideNavSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen pt-3 px-6 pb-6">
      <div className="flex flex-col flex-1 h-[calc(100vh-36px)] bg-dark rounded-lg">
        <Header />
        <div className="flex flex-1 overflow-y-hidden">
          <SideNavWrapper>
            <Suspense key={"side-nav"} fallback={<SideNavSkeleton />}>
              <SideNav />
            </Suspense>
          </SideNavWrapper>
          <ContentWrapper>{children}</ContentWrapper>
        </div>
      </div>
    </main>
  );
}

const SideNavWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col h-full lg:min-w-[295px] bg-darkgray rounded-tr-2xl">
    {children}
  </div>
);

const ContentWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex flex-1 flex-col p-4 overflow-y-scroll">{children}</div>
);
