import { IconProps } from ".";

export default function EWResize({ color = "var(--primary)" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1200 1200"
    >
      <rect width="1200" height="1200" fill="none" />
      <path
        fill={color}
        d="M304.102 295.898L0 600l304.102 304.102v-203.54h591.797v203.539L1200 600L895.898 295.898v203.539H304.102z"
      />
    </svg>
  );
}
