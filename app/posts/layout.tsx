import { Suspense, type PropsWithChildren } from "react";
import type { Metadata } from "next";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import SideNavFallback from "./components/SideNavFallback";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen pt-3 px-6 pb-6">
      <div className="flex flex-col flex-1 h-[calc(100dvh-36px)] bg-dark">
        <Header />
        <div className="flex flex-1 overflow-y-hidden">
          <Suspense fallback={<SideNavFallback />}>
            <SideNav />
          </Suspense>
          {children}
        </div>
      </div>
    </main>
  );
}
