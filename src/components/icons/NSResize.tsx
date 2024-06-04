import { IconProps } from ".";

export default function NSResize({ color = "var(--primary)" }: IconProps) {
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
        d="M904.102 304.102L600 0L295.898 304.102h203.539v591.797H295.898L600 1200l304.102-304.102h-203.54V304.102z"
      />
    </svg>
  );
}
