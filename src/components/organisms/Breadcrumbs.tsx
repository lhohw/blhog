"use client";

import { useMemo } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { slugToStr } from "@/lib/utils/string";
import BreadcrumbWrapper from "@/components/atoms/wrapper/BreadcrumbWrapper";

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
    <BreadcrumbWrapper>
      <ol className="flex text-xl md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={index === breadcrumbs.length - 1}
            className={clsx(
              index === breadcrumbs.length - 1 ? "main-color" : "inherit",
            )}
          >
            <Link href={breadcrumb.href} aria-label={breadcrumb.label}>
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </BreadcrumbWrapper>
  );
}
