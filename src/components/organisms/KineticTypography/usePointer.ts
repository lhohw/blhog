"use client";

import { useCallback, useRef } from "react";

export type Pointer = { mx: number; my: number; mr: number };
export default function usePointer() {
  const pointer = useRef<Pointer>({ mx: 0, my: 0, mr: 30 });

  const pointerListener = useCallback((e: PointerEvent) => {
    const { offsetX, offsetY } = e;
    pointer.current.mx = offsetX;
    pointer.current.my = offsetY;
  }, []);

  const getPointer = useCallback(() => {
    return pointer.current;
  }, []);

  return {
    getPointer,
    pointerListener,
  };
}
