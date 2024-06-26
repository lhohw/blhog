import { IconProps } from ".";

export default function Menu({ color = "var(--primary)" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 36 36"
      className="cursor-pointer"
    >
      <path fill={color} d="M32 29H4a1 1 0 0 1 0-2h28a1 1 0 0 1 0 2" />
      <path fill={color} d="M32 19H4a1 1 0 0 1 0-2h28a1 1 0 0 1 0 2" />
      <path fill={color} d="M32 9H4a1 1 0 0 1 0-2h28a1 1 0 0 1 0 2" />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  );
}
