"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import BackArrow from "@/components/icons/BackArrow";

export default function HeaderTitle() {
  const router = useRouter();
  const pathname = usePathname();
  const isPost = useMemo(() => pathname === "/post", [pathname]);

  const goBack = useCallback(() => {
    if (!isPost) return;
    router.back();
  }, [router, isPost]);

  return (
    <Link
      className="h-full flex items-center"
      href="/posts"
      aria-labelledby="blog-title"
    >
      <button
        className={clsx(
          "relative p-2 h-full transition-width duration-700",
          isPost ? "w-16 cursor-pointer" : "w-0",
        )}
        aria-label="go back"
        tabIndex={isPost ? 0 : -1}
        onClick={goBack}
      >
        {isPost && (
          <span className="block absolute left-0 top-0 w-16 h-full">
            <BackArrow />
          </span>
        )}
      </button>
      <h1 id="blog-title" className="text-base font-bold">{`lhohw's blog`}</h1>
    </Link>
  );
}
