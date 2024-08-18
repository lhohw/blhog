"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import BackArrow from "@/components/icons/BackArrow";

export default function HeaderTitle() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const goBack = useCallback(() => {
    if (isHome) return;

    router.back();
  }, [router, isHome]);

  return (
    <Link
      className="h-full flex items-center"
      href="/"
      aria-labelledby="blog-title"
    >
      <button
        className={clsx("h-full", !isHome && "cursor-pointer")}
        aria-label="go back"
        tabIndex={isHome ? 0 : -1}
        onClick={goBack}
      >
        {!isHome && (
          <span className="block w-16 h-full">
            <BackArrow />
          </span>
        )}
      </button>
      <h1
        id="blog-title"
        className="absolute text-base font-bold ml-16"
      >{`lhohw's blog`}</h1>
    </Link>
  );
}
