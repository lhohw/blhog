"use client";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const splitted = pathname.split("/").slice(2);
  const breadcrumbs = [
    {
      href: "/posts",
      label: "Posts",
    },
  ].concat(
    splitted.map((key) => ({
      href: `/posts/${key}`,
      label: key,
    }))
  );

  return (
    <nav aria-label="Breadcrumb" className="mb-6 block h-8">
      <ol className="flex text-xl md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={index === breadcrumbs.length - 1}
            className={clsx(
              index === breadcrumbs.length - 1 ? "text-sea-200" : "inherit"
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
