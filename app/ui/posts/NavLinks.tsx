"use client";
import type { Link as LinkType } from "@/app/lib/definitions";
import Link from "next/link";
import { ChevronLeft } from "@/app/ui/icons";
import Image from "next/image";

export type NavLinksProps = {
  links: LinkType[];
};
export default function NavLinks({ links }: NavLinksProps) {
  return (
    <>
      {links.map(({ name, href, icon }) => (
        <Link
          key={name}
          className="flex items-center flex-none h-14 py-2 px-4"
          href={`/posts/${href}`}
        >
          <div className="flex flex-1 flex-row items-center h-10 py-2 pl-4 rounded-lg cursor-pointer hover:bg-[#2D2C31] transition-color">
            <Image src={icon} alt={name} width={16} height={16} />
            <span className="flex flex-1 ml-2">{name}</span>
          </div>
        </Link>
      ))}
    </>
  );
}
