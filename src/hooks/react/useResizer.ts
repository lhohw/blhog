import { useCallback, useMemo, useRef, useState } from "react";

export default function useResizer(
  initialLength: number,
  direction: "left" | "right" | "top" | "bottom" = "right",
  min = initialLength - 50,
  max = initialLength + 50,
) {
  const [length, setLength] = useState(initialLength);
  const _isPressed = useRef(false);

  const isHorizontal = useMemo(
    () => direction === "left" || direction === "right",
    [direction],
  );
  const isReversed = useMemo(
    () => direction === "left" || direction === "top",
    [direction],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!_isPressed.current) return;
      const d =
        e[isHorizontal ? "movementX" : "movementY"] * (isReversed ? -1 : 1);
      setLength((length) => Math.max(min, Math.min(max, length + d)));
    },
    [isHorizontal, min, max, isReversed],
  );

  const onMouseUp = useCallback(() => {
    if (!_isPressed.current) return;
    _isPressed.current = false;

    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.target as HTMLDivElement;
      if (!target.closest(".resizer")) return;
      e.preventDefault();

      _isPressed.current = true;

      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
    },
    [onMouseUp, onMouseMove],
  );

  return {
    length,
    isHorizontal,
    onMouseDown,
  };
}
