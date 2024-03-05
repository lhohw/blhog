import clsx from "clsx";

export type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export const Menu = ({
  size = 20,
  className,
  strokeWidth = 1.5,
  ...props
}: IconProps) => (
  <div className={clsx(`w-5 h-5`, className)} {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </div>
);

export const ChevronLeft = ({
  size = 12,
  className,
  strokeWidth = 2.5,
  ...props
}: IconProps) => (
  <div className={clsx(`w-3 h-3`, className)} {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  </div>
);
