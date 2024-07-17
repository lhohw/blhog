"use client";

import type { DropdownProps } from ".";
import { useCallback, useMemo, useState } from "react";

export default function useDropdown(
  itemHeight = 60,
  items: DropdownProps["items"],
  onClick: DropdownProps["onClick"],
  defaultIdx = -1,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const [selected, setSelected] = useState(defaultIdx);
  const maxHeight = useMemo(
    () => items.length * itemHeight,
    [items, itemHeight],
  );
  const isSelected = useMemo(() => selected !== -1, [selected]);

  const toggle = useCallback(() => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    setHeight(nextIsOpen === true ? maxHeight : 0);
  }, [isOpen, maxHeight]);

  const select = useCallback<React.MouseEventHandler>(
    (e) => {
      const target = e.target as HTMLElement;
      const li = target.closest("li[data-idx]");
      const dataIdx = li?.getAttribute("data-idx");
      if (dataIdx === null || dataIdx === undefined) return;

      let idx = parseInt(dataIdx);
      if (idx === selected) return;

      toggle();
      setSelected(idx);
      onClick(idx);

      e.stopPropagation();
    },
    [onClick, selected, toggle],
  );

  const onHeadingClick = useCallback<React.MouseEventHandler>(
    (e) => {
      toggle();
      e.stopPropagation();
    },
    [toggle],
  );

  return {
    isOpen,
    selected,
    select,
    toggle,
    height,
    onHeadingClick,
    isSelected,
  };
}
