"use client";

import {
  memo,
  MouseEventHandler,
  useCallback,
  useRef,
  type HTMLAttributes,
} from "react";
import clsx from "clsx";
import CaretDown from "@/components/icons/CaretDown";
import useDropdown from "./useDropdown";
import WindowClickEffect from "./WindowClickEffect";

export type DropdownProps = Omit<HTMLAttributes<HTMLDivElement>, "onClick"> & {
  items: (Record<string, any> & { title: string })[];
  itemHeight?: number;
  placeholder?: string;
  onSelectItem: (idx: number) => void;
  defaultIdx?: number;
};
export default function Dropdown({
  className,
  style,
  items,
  itemHeight = 60,
  placeholder = "Select item",
  defaultIdx = -1,
  onSelectItem,
  ...props
}: DropdownProps) {
  const {
    selected,
    height,
    isOpen,
    isSelected,
    select,
    toggle,
    onHeadingClick,
  } = useDropdown(itemHeight, items, onSelectItem, defaultIdx);

  const containerRef = useRef<HTMLDivElement>(null!);
  const onSelect = useCallback<MouseEventHandler>(
    (e) => {
      select(e);
      containerRef.current?.scrollTo({ top: 0 });
    },
    [select],
  );

  return (
    <>
      <div
        className={clsx(
          "flex flex-col rounded-md text-sm relative bg-background",
          className,
        )}
        {...props}
      >
        <div className="w-full" style={{ height: itemHeight }} />
        <div
          ref={containerRef}
          className={clsx(
            "flex flex-col justify-between cursor-pointer border-primary border-b-2 absolute left-0 top-0 w-full bg-background overflow-hidden",
          )}
          onClick={onHeadingClick}
        >
          <div className="flex h-full w-full justify-between items-center break-all tracking-wider">
            <h4
              className={clsx(
                "flex items-center h-full text-lg px-4",
                isSelected && "font-bold",
              )}
              style={{ height: itemHeight }}
            >
              {items[selected]?.title ?? placeholder}
            </h4>
            <div
              className={clsx(
                "w-6 h-6 transition-transform duration-300",
                isOpen ? "rotate-180" : "rotate-0",
              )}
            >
              <CaretDown />
            </div>
          </div>
          <ul
            className={clsx(
              "flex flex-col bg-background transition-height duration-300 max-h-80 px-4",
              isOpen ? "overflow-y-scroll" : "overflow-y-hidden",
            )}
            style={{ height }}
          >
            {items.map(({ title }, idx) => {
              const isSelected = selected === idx;
              return (
                <DropdownItem
                  key={idx}
                  idx={idx}
                  itemHeight={itemHeight}
                  isSelected={isSelected}
                  title={title}
                  select={onSelect}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <WindowClickEffect isOpen={isOpen} toggle={toggle} />
    </>
  );
}

// eslint-disable-next-line react/display-name
const DropdownItem = memo(
  ({
    idx,
    itemHeight,
    isSelected,
    title,
    select,
  }: Pick<DropdownProps, "title" | "itemHeight"> & {
    idx: number;
    isSelected: boolean;
    select: React.MouseEventHandler;
  }) => (
    <li
      data-idx={idx}
      className={clsx(
        "flex flex-none border-b-2 border-dashed border-primary [&:last-child]:border-none items-center cursor-pointer transition-colors pr-10 hover:text-primary-alpha",
        isSelected ? "text-text" : "text-text-alpha",
      )}
      style={{ height: itemHeight }}
      onClick={select}
    >
      {title}
    </li>
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.select === nextProps.select
    );
  },
);
