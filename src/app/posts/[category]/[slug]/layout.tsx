import { Suspense, type PropsWithChildren } from "react";
import clsx from "clsx";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import styles from "@/styles/post.module.scss";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={clsx("w-full", styles.post)}>
      <Suspense fallback={<PostSkeleton />}>{children}</Suspense>
    </div>
  );
}
