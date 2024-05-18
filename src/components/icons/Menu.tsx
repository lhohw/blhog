export default function Menu({ color = "#8ebac7" }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2rem"
      height="1.2rem"
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
