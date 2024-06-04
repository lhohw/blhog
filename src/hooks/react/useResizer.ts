import { useCallback, useEffect, useMemo, useState } from "react";

export default function useResizer(
  initialLength: number,
  hitSlop: number,
  direction: "left" | "right" | "top" | "bottom" = "right",
  min = initialLength - 50,
  max = initialLength + 50,
) {
  const [_isPressed, setIsPressed] = useState(false);
  const [length, setLength] = useState(initialLength);
  const [_hitSlop, setHitSlop] = useState(hitSlop);

  const isHorizontal = useMemo(
    () => direction === "left" || direction === "right",
    [direction],
  );

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (!target.closest(".resizer")) return;
      e.preventDefault();

      setIsPressed(true);
      setHitSlop(hitSlop * 100);
    },
    [setIsPressed, hitSlop],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!_isPressed) return;
      const d = e[isHorizontal ? "movementX" : "movementY"];
      setLength((length) => Math.max(min, Math.min(max, length + d)));
    },
    [_isPressed, isHorizontal, min, max],
  );

  const onMouseUp = useCallback(() => {
    if (!_isPressed) return;
    setIsPressed(false);
    setHitSlop(hitSlop);
  }, [setIsPressed, _isPressed, hitSlop]);

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseUp, onMouseDown, onMouseMove]);

  return {
    length,
    isHorizontal,
  };
}
