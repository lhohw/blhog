import { useCallback, useRef } from "react";

export default function useDom<T>(initializer: () => T) {
  const ref = useRef<T>(null!);

  const getElem = useCallback(() => {
    if (!ref.current) ref.current = initializer();
    return ref.current;
  }, [initializer]);

  return getElem;
}
