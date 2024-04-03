"use client";
import type { Link as LinkType } from "@/app/const/definitions";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Menu } from "@/app/ui/icons";
import { throttling } from "@/app/lib/utils";

export type NavLinksProps = {
  links: LinkType[];
};
export default function NavLinks({ links }: NavLinksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  useEffect(() => {
    const throttledHandleResize = throttling(function (e: UIEvent) {
      if (!isOpen) return;
      const target = e.target as typeof window;
      if (target.outerWidth >= 1024) {
        setIsOpen(false);
      }
    }, 150);
    window.addEventListener("resize", throttledHandleResize);
    return () => {
      window.removeEventListener("resize", throttledHandleResize);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col h-full rounded-tr-2xl relative">
      <div className="flex flex-col h-full max-lg:absolute max-lg:left-0 bg-darkgray rounded-tr-2xl z-10">
        <div className="flex flex-none items-center h-14">
          <div
            className={"relative flex flex-1 items-center ml-[30px] lg:hidden"}
          >
            <Menu
              className={"cursor-pointer bg-darkgray z-10"}
              onClick={toggle}
            />
          </div>
        </div>
        <ul className="flex flex-col overflow-y-scroll h-full">
          {links.map(({ category }) => (
            <Link
              key={category}
              className="flex items-center flex-none h-14 py-2 px-4"
              href={`/posts/${category}`}
            >
              <div
                className="flex flex-1 flex-row items-center py-2 px-4 rounded-lg cursor-pointer hover:bg-[#2D2C31] transition-color"
                title={category}
              >
                {/* <Image src={icon} alt={name} width={16} height={16} /> */}
                <div
                  className={clsx(
                    "flex flex-1 ml-2 mr-4 overflow-hidden",
                    isOpen ? "w-40" : "w-0",
                  )}
                  style={{
                    transition: `width .375s ease-in-out`,
                    transitionDelay: "0.125s",
                  }}
                >
                  {category}
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <div className="w-20" />
    </div>
  );
}
