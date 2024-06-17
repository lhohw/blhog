"use client";

import { useCallback } from "react";
import LinkList, { LinkListProps } from "@/components/molecules/LinkList";
import WindowResizeEffect from "./WindowResizeEffect";
import useList from "@/hooks/react/useList";

export default function SidebarLinks({ links }: Pick<LinkListProps, "links">) {
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
      <LinkList
        links={links}
        isOpen={isOpen}
        close={close}
        onMenuClick={onMenuClick}
      />
      <WindowResizeEffect isOpen={isOpen} close={close} />
    </>
  );
}
