"use client";

import clsx from "clsx";
import LinkListItem, {
  LinkListItemProps,
} from "@/components/atoms/LinkListItem";
import Menu from "@/components/icons/Menu";

export type LinkListProps = {
  links: LinkListItemProps[];
  height: string;
  isOpen: boolean;
  close: () => void;
  onMenuClick: React.MouseEventHandler;
};

export default function LinkList({
  links,
  height,
  isOpen,
  close,
  onMenuClick,
}: LinkListProps) {
  return (
    <div
      className={clsx(
        "flex flex-col w-full h-14 rounded-tr-2xl z-10 transition-height duration-300 delay-100 absolute top-0 left-0 bg-background",
        "md:h-full md:static md:bg-background-alpha",
        "border-primary border-slight",
      )}
      style={isOpen ? { height } : {}}
    >
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
    </div>
  );
}
