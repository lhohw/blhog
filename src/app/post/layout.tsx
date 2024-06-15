import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post",
};

export default async function Layout({ children }: PropsWithChildren) {
  return children;
}
