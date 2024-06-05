"use client";

import { useCallback, useMemo } from "react";
import LinkList, { LinkListProps } from "@/components/molecules/LinkList";
import ResizeEffect from "@/components/effects/ResizeEffect";
import Resizer from "@/components/atoms/Resizer";
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

  return (
    <nav
      id="nav-link"
      className="flex flex-1 flex-col h-full rounded-tr-2xl relative shadow-md"
    >
      <Resizer
        className="min-w-full max-w-full"
        initialLength={350}
        min={300}
        max={700}
        direction="right"
      >
        <LinkList
          links={links}
          height={height}
          isOpen={isOpen}
          close={close}
          onMenuClick={onMenuClick}
        />
      </Resizer>
      <ResizeEffect isOpen={isOpen} close={close} />
    </nav>
  );
}
