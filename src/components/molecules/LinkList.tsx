"use client";

import { useMemo } from "react";
import LinkListItem, {
  LinkListItemProps,
} from "@/components/atoms/LinkListItem";
import Menu from "@/components/icons/Menu";
import LinkListWrapper from "@/components/atoms/wrapper/LinkListWrapper";

export type LinkListProps = {
  links: LinkListItemProps[];
  isOpen: boolean;
  close: () => void;
  onMenuClick: React.MouseEventHandler;
};

export default function LinkList({
  links,
  isOpen,
  close,
  onMenuClick,
}: LinkListProps) {
  const height = useMemo(() => (links.length + 1.25) * 56 + "px", [links]);

  return (
    <LinkListWrapper style={isOpen ? { height } : {}}>
      <div
        className="flex flex-none ml-8 items-center h-14 md:hidden object-contain p-3.5 w-12"
        onClick={onMenuClick}
      >
        <Menu />
      </div>
      <ul className="flex flex-col overflow-y-scroll h-full text-nowrap md:mt-4">
        {links.map((link) => (
          <LinkListItem key={link.title} onClick={close} {...link} />
        ))}
      </ul>
    </LinkListWrapper>
  );
}
