import { useMemo, useState } from "react";

export default function useSetting() {
  const [width] = useState(600);
  const height = useMemo(() => (width / 16) * 9, [width]);

  return {
    width,
    height,
  };
}
