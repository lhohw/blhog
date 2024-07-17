import { useEffect, useState } from "react";

export type GraphProps = {
  f?: (t: number) => number;
};
export default function Graph({ f }: GraphProps) {
  const [data, setData] = useState("");

  useEffect(() => {
    if (!f) {
      setData("");
      return;
    }

    const PADDING = 45;
    let path = `M${PADDING} ${200 - PADDING}`;
    const length = 200 - 2 * PADDING;

    const getX = (t: number) => length * (1 - f(t / length));
    for (let t = 0; t < length; t++) {
      const x = getX(t) + PADDING;
      path += ` L${t + PADDING} ${x}`;
    }
    setData(path);
  }, [f]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
    >
      <rect width="200" height="200" fill="none" />
      <path
        fill="none"
        stroke="var(--primary)"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={data}
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.7s"
          dur="0.7s"
          values="1000;0"
        />
      </path>
    </svg>
  );
}
