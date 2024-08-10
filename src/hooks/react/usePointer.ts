"use client";

import { useCallback, useEffect, useRef } from "react";

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

  useEffect(() => {
    window.addEventListener("pointermove", pointerListener);
    return () => {
      window.removeEventListener("pointermove", pointerListener);
    };
  }, [pointerListener]);

  return {
    getPointer,
  };
}
