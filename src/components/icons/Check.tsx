import { IconProps } from ".";

export default function Check({ color = "var(--primary)" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" fill="none" />
      <path
        fill={color}
        d="m9.55 17.308l-4.97-4.97l.714-.713l4.256 4.256l9.156-9.156l.713.714z"
      />
    </svg>
  );
}
