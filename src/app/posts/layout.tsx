import type { Metadata } from "next";
import { Suspense, type PropsWithChildren } from "react";
import Header from "@/components/organisms/Header";
import SideNav from "@/components/templates/SideNav";
import SideNavSkeleton from "@/components/skeletons/SideNavSkeleton";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main className="p-1 sm:pt-3 sm:px-6 sm:pb-6">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <SideNavWrapper>
          <Suspense key={"side-nav"} fallback={<SideNavSkeleton />}>
            <SideNav />
          </Suspense>
        </SideNavWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </main>
  );
}

const SideNavWrapper = ({ children }: PropsWithChildren) => (
  <div
    className={`
    sticky z-10 top-10 flex flex-col bg-darkgrayAlpha rounded-tr-2xl mx-4 mt-4 mb-0
    md:flex-1 md:min-w-[230px] md:max-w-[295px] md:mb-4 md:top-[56px] md:h-[calc(100vh-108px)]
  `}
  >
    {children}
  </div>
);

const ContentWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex flex-1.6 flex-col p-4 overflow-y-scroll mt-14 md:mt-0">
    {children}
  </div>
);
