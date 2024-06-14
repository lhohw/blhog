import { useCallback, useState } from "react";

export default function usePostIndex() {
  const [offsetTop, setOffsetTop] = useState<number[]>([]);
  const [isRead, setIsRead] = useState<boolean[]>([]);

  const onHeadingClick = useCallback<React.MouseEventHandler>((e) => {
    e.preventDefault();
  }, []);

  return {
    offsetTop,
    setOffsetTop,
    isRead,
    setIsRead,
    onHeadingClick,
  };
}
