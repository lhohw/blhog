"use client";

import { useCallback, useEffect, useMemo } from "react";
import LinkList, { LinkListProps } from "@/components/molecules/LinkList";
import useList from "@/hooks/react/useList";

export default function NavLinks({ links }: Pick<LinkListProps, "links">) {
  const height = useMemo(() => (links.length + 1.25) * 56 + "px", [links]);
  const { isOpen, close, toggle } = useList();

  const onMenuClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.target as HTMLDivElement;
      if (target.closest("svg")) {
        toggle();
      }
    },
    [toggle],
  );

  const handleResize = useCallback(() => {
    if (isOpen) close();
  }, [isOpen, close]);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!isOpen) return;

      const target = e.target as HTMLDivElement;
      if (!target.closest("#nav-link")) close();
    },
    [isOpen, close],
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", clickListener);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", clickListener);
    };
  }, [handleResize, clickListener]);

  return (
    <nav id="nav-link" className="flex flex-col h-full rounded-tr-2xl relative">
      <LinkList
        links={links}
        height={height}
        isOpen={isOpen}
        close={close}
        onMenuClick={onMenuClick}
      />
    </nav>
  );
}
