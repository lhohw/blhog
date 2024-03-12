import NavLinks from "@/app/ui/posts/NavLinks";
import { fetchDirectoryNames } from "@/app/lib/actions";

export default async function SideNav() {
  const links = await fetchDirectoryNames();
  return (
    <div className="flex flex-col h-full lg:min-w-[295px] bg-darkgray rounded-tr-2xl">
      <NavLinks links={links} />
    </div>
  );
}
