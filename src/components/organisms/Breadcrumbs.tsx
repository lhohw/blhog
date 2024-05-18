"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { slugToStr } from "@/lib/utils/string";
import { useMemo } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = useMemo(
    () =>
      [
        {
          href: "/posts",
          label: "Posts",
        },
      ].concat(
        pathname
          .split("/")
          .slice(2)
          .map((key) => ({
            href: `/posts/${key}`,
            label: slugToStr(key),
          })),
      ),
    [pathname],
  );

  return (
    <div aria-label="Breadcrumb" className="mb-6 block h-8">
      <ol className="flex text-xl md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={index === breadcrumbs.length - 1}
            className={clsx(
              index === breadcrumbs.length - 1 ? "main-color" : "inherit",
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
