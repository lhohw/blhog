import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import * as Icons from "@/components/icons";
import { toPascalCase } from "@/lib/utils/string";

export type LinkListItemProps = {
  title: string;
  href: string;
  icon?: boolean;
} & LinkProps;

export default function LinkListItem({
  title,
  href,
  icon = true,
  ...props
}: LinkListItemProps) {
  const iconName = toPascalCase(title);
  const Icon =
    Icons[iconName in Icons ? (iconName as keyof typeof Icons) : "Circle"];
  title = toPascalCase(title, "-", " ");

  return (
    <li className="flex flex-none h-14 py-2 px-4">
      <Link
        className="w-full h-full items-center"
        href={href}
        aria-label={title}
        {...props}
      >
        <div
          className="flex flex-1 flex-row items-center py-2 px-4 rounded-lg cursor-pointer hover:bg-primary-alpha transition-color"
          title={title}
        >
          <div className="w-6 h-6 p-1 mr-3">{icon ? <Icon /> : null}</div>
          <div className={clsx("flex flex-1 ml-2 mr-4 overflow-hidden")}>
            {title}
          </div>
        </div>
      </Link>
    </li>
  );
}
