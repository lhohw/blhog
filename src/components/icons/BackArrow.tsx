import type { IconProps } from ".";

export default function BackArrow({ color = "var(--primary)" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" fill="none" />
      <path
        fill="none"
        stroke={color}
        strokeDasharray="48"
        strokeDashoffset="48"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19.75 12 L4.25 12 L 10 8 L 10 16 L4.25 12"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.4s"
          dur="0.7s"
          values="48;0"
        />
      </path>
    </svg>
  );
}
