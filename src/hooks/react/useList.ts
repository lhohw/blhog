import { useCallback, useState } from "react";

export default function useList() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
