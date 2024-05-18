import Link, { LinkProps } from "next/link";
import clsx from "clsx";

export type LinkListItemProps = {
  title: string;
  href: string;
  Icon?: () => JSX.Element;
} & LinkProps;

export default function LinkListItem({
  title,
  href,
  Icon,
  ...props
}: LinkListItemProps) {
  return (
    <Link
      className="flex items-center flex-none h-14 py-2 px-4"
      href={href}
      {...props}
    >
      <div
        className="flex flex-1 flex-row items-center py-2 px-4 rounded-lg cursor-pointer hover:bg-[#2D2C31] transition-color"
        title={title}
      >
        {Icon ? (
          <div className="w-12 h-12 p-2">
            <Icon />
          </div>
        ) : null}
        <div className={clsx("flex flex-1 ml-2 mr-4 overflow-hidden")}>
          {title}
        </div>
      </div>
    </Link>
  );
}
