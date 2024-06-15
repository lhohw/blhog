import { useEffect, useLayoutEffect } from "react";

export type PostIndexStateEffectProps = {
  isFold: boolean;
  getMaxHeight: () => number;
  setHeight: (height: number) => void;
  spread: () => void;
  toggle: () => void;
};
export default function PostIndexStateEffect({
  isFold,
  getMaxHeight,
  setHeight,
  spread,
  toggle,
}: PostIndexStateEffectProps) {
  useLayoutEffect(function initializeIndexState() {
    const maxHeight = getMaxHeight();

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
