"use client";

import { useCallback, useMemo } from "react";
import LinkList, { LinkListProps } from "@/components/molecules/LinkList";
import WindowResizeEffect from "@/components/effects/WindowResizeEffect";
import NavWithResizer from "@/components/molecules/NavWithResizer";
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
    <>
      <NavWithResizer
        id="nav-link"
        resizerProps={{
          initialLength: 350,
          min: 300,
          max: 700,
          direction: "right",
        }}
      >
        <LinkList
          links={links}
          height={height}
          isOpen={isOpen}
          close={close}
          onMenuClick={onMenuClick}
        />
      </NavWithResizer>
      <WindowResizeEffect isOpen={isOpen} close={close} />
    </>
  );
}
