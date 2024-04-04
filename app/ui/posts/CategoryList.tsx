import { fetchDirectoryNames } from "@/app/lib/actions";
import AreaBox from "@/app/ui/AreaBox";
import Link from "next/link";

export default async function CategoryList() {
  const links = await fetchDirectoryNames();
  const list = links.map(({ category }) => ({
    title: category,
    href: `/posts/${category}`,
  }));

  return (
    <AreaBox title="Category" classNames="max-md:mb-4 md:ml-4">
      <div className="flex flex-col h-full bg-darkgray rounded">
        <ul className="flex flex-col overflow-y-scroll h-full text-nowrap">
          {list.map(({ title, href }) => (
            <Link
              key={title}
              className="flex items-center flex-none h-14 py-2 px-4"
              href={href}
            >
              <span
                className="flex flex-1 flex-row items-center py-2 px-4 rounded-lg cursor-pointer hover:bg-[#2D2C31] transition-color"
                title={title}
              >
                {title}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </AreaBox>
  );
}
