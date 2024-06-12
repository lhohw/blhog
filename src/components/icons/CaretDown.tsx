import { IconProps } from ".";

export default function CaretDown({ color = "var(--primary)" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" fill="none" />
      <path fill={color} d="m7 10l5 5l5-5z" />
    </svg>
  );
}
