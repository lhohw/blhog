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
    <main className="p-1 sm:pt-3 sm:px-6 sm:pb-6">
      <div className="flex flex-col flex-1 h-[calc(100dvh-8px)] sm:h-[calc(100dvh-36px)] bg-dark rounded-lg">
        <Header />
        <div className="flex flex-1 flex-col md:flex-row overflow-y-hidden">
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
  <div className="flex flex-col md:flex-1 md:min-w-[230px] md:max-w-[295px] bg-darkgray rounded-tr-2xl mx-4 mt-4 mb-0 md:mb-4">
    {children}
  </div>
);

const ContentWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex flex-1.6 flex-col p-4 overflow-y-scroll">{children}</div>
);
