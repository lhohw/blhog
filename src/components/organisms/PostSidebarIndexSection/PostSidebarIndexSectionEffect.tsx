import { useEffect, useLayoutEffect } from "react";

export type PostSidebarIndexSectionEffectProps = {
  isFold: boolean;
  calculateMaxHeight: () => number;
  setHeight: (height: number) => void;
  spread: () => void;
  toggle: () => void;
};
export default function PostSidebarIndexSectionEffect({
  isFold,
  calculateMaxHeight,
  setHeight,
  spread,
  toggle,
}: PostSidebarIndexSectionEffectProps) {
  useLayoutEffect(function initializeIndexState() {
    const maxHeight = calculateMaxHeight();

    if (window.scrollY === 0) {
      setHeight(maxHeight);
      spread();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function addScrollListener() {
      const scrollListener = () => {
        if (!isFold) toggle();
      };

      window.addEventListener("scroll", scrollListener);
      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    },
    [isFold, toggle],
  );

  return <></>;
}
