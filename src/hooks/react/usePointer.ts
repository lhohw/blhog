"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Pointer = { mx: number; my: number; mr: number };
export default function usePointer(target?: HTMLElement, mr = 20) {
  const pointer = useRef<Pointer>({ mx: 0, my: 0, mr });
  const [pointerTarget, setPointerTarget] = useState(target);

  const getPointer = useCallback(() => {
    return pointer.current;
  }, []);

  useEffect(() => {
    const pointerListener = (e: PointerEvent) => {
      const { offsetX, offsetY } = e;
      pointer.current.mx = offsetX;
      pointer.current.my = offsetY;
    };

    ((pointerTarget as HTMLDivElement) || window).addEventListener(
      "pointermove",
      pointerListener,
    );
    return () => {
      ((pointerTarget as HTMLDivElement) || window).removeEventListener(
        "pointermove",
        pointerListener,
      );
    };
  }, [pointerTarget]);

  return {
    getPointer,
    setPointerTarget,
  };
}
