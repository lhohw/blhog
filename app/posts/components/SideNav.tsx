import { Menu } from "@/app/ui/icons";
import NavLinks from "./NavLinks";
import { fetchDirectoryNames } from "@/app/lib/actions";

export default async function SideNav() {
  const links = await fetchDirectoryNames();

  return (
    <div className="flex flex-col flex-1 h-full min-w-[295px] max-w-[393px] bg-darkgray rounded-tr-2xl">
      <div className="flex flex-none items-center h-14 pl-5">
        <Menu className="cursor-pointer" />
      </div>
      <ul className="flex flex-col overflow-y-scroll h-full">
        <NavLinks links={links} />
      </ul>
    </div>
  );
}
