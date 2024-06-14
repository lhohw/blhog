import clsx from "clsx";
import { IconProps } from "../icons";
import Link, { LinkProps } from "next/link";

export type MetaphorProps = {
  className?: string;
  title?: string;
  onClick?: (...args: any) => void;
  Icon: (props: IconProps) => JSX.Element;
};
export default function Metaphor({
  className,
  title,
  onClick,
  Icon,
}: MetaphorProps) {
  return (
    <div
      className={clsx(
        className,
        "border-primary border-[1px] rounded-full p-1.5 m-1.5 cursor-pointer flex h-8 w-8 items-center justify-center",
      )}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      <Icon />
    </div>
  );
}

const MetaphorLink = ({
  Icon,
  href,
  className,
  onClick,
  title,
  ...props
}: MetaphorProps & LinkProps) => (
  <Metaphor
    className={className}
    title={title}
    onClick={onClick}
    Icon={() => (
      <Link className="w-full h-full" href={href} {...props}>
        <Icon />
      </Link>
    )}
  />
);

Metaphor.Link = MetaphorLink;
