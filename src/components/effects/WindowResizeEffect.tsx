"use client";
import { memo, useEffect } from "react";

export type WindowResizeEffectProps = {
  isOpen: boolean;
  close: () => void;
};

// isOpen이나 close 변경 시 모두 항상 업데이트되기 때문에 deps 불필요
//   -> useCallback 및 useEffect deps 제거 후 memo 적용
// 새로운 기능 적용 시 해당 내용 변경 필요성 고려
export default memo(function WindowResizeEffect({
  isOpen,
  close,
}: WindowResizeEffectProps) {
  const handleResize = () => {
    if (isOpen) close();
  };

  const clickListener = (e: MouseEvent) => {
    if (!isOpen) return;

    const target = e.target as HTMLDivElement;
    if (!target.closest("#sidebar-link")) close();
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", clickListener);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", clickListener);
    };
  });

  return <></>;
});
