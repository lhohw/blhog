import clsx from "clsx";
import { Suspense, type PropsWithChildren } from "react";
import styles from "@/app/ui/styles/post.module.scss";
import { PostSkeleton } from "@/app/ui/skeletons";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={clsx("w-full", styles.post)}>
      <Suspense fallback={<PostSkeleton />}>{children}</Suspense>
    </div>
  );
}
