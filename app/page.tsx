import type { PropsWithChildren } from "react";
import Header from "@/app/ui/Header";
import Contents from "@/app/ui/Contents";

export default function Home() {
  return (
    <Main>
      <Header />
      <Contents />
    </Main>
  );
}

const Main = ({ children }: PropsWithChildren) => (
  <main className="min-h-screen pt-3 px-6 pb-6">
    <div className="flex flex-col flex-1 h-[calc(100dvh-36px)] bg-dark">
      {children}
    </div>
  </main>
);
