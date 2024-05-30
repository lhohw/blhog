import { IconProps } from ".";

export default function Browser({ color = "var(--primary)" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" fill="none" />
      <g fill={color}>
        <path d="M4 8a1 1 0 1 0 0-2a1 1 0 0 0 0 2m4-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0m2 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />
        <path
          d="M3 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm18 2H3a1 1 0 0 0-1 1v3h20V6a1 1 0 0 0-1-1M2 18v-7h20v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
}
