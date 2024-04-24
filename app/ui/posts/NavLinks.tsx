"use client";
import type { Link as LinkType } from "@/app/const/definitions";
import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Menu } from "@/app/ui/icons";
import { throttling } from "@/app/lib/utils";

export type NavLinksProps = {
  links: LinkType[];
};
export default function NavLinks({ links }: NavLinksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const height = useMemo(() => (links.length + 1.25) * 56 + "px", [links]);
  const toggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const throttledHandleResize = throttling(function (e: UIEvent) {
      if (isOpen) close();
    }, 150);

    const clickListener = (e: MouseEvent) => {
      if (!isOpen) return;

      const target = e.target as HTMLDivElement;
      if (!target.closest("#nav-link")) close();
    };

    window.addEventListener("resize", throttledHandleResize);
    window.addEventListener("click", clickListener);
    return () => {
      window.removeEventListener("resize", throttledHandleResize);
      window.removeEventListener("click", clickListener);
    };
  }, [isOpen, height, close]);

  return (
    <div id="nav-link" className="flex flex-col h-full rounded-tr-2xl relative">
      <div
        className={clsx(
          "flex flex-col w-full h-14 bg-darkgray rounded-tr-2xl z-10 transition-all duration-300 delay-100 absolute top-0 left-0 bg-opacity-90",
          "md:h-full md:static",
          isOpen && "ring-sea-200 ring-inset ring-1",
        )}
        style={isOpen ? { height } : {}}
      >
        <div className="flex flex-none items-center h-14">
          <div
            className={"relative flex flex-1 items-center ml-[30px] md:hidden"}
          >
            <Menu
              className={"cursor-pointer bg-darkgray z-10"}
              onClick={toggle}
            />
          </div>
        </div>
        <ul className="flex flex-col overflow-y-scroll h-full text-nowrap">
          {links.map(({ category }) => (
            <Link
              key={category}
              className="flex items-center flex-none h-14 py-2 px-4"
              href={`/posts/${category}`}
              onClick={close}
            >
              <div
                className="flex flex-1 flex-row items-center py-2 px-4 rounded-lg cursor-pointer hover:bg-[#2D2C31] transition-color"
                title={category}
              >
                {/* <Image src={icon} alt={name} width={16} height={16} /> */}
                <div className={clsx("flex flex-1 ml-2 mr-4 overflow-hidden")}>
                  {category}
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <div className="h-14 md:hidden bg-opacity-90" />
    </div>
  );
}
