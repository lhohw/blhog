import type { PropsWithChildren } from "react";

export default function Home() {
  return <Main>aa</Main>;
}

const Main = ({ children }: PropsWithChildren) => (
  <main className="flex flex-col min-h-screen pt-2 px-4 pb-4 border-slight border-sea-200">
    {children}
  </main>
);
