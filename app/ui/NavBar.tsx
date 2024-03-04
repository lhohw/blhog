import { Menu } from "@/app/ui/icons";
import ListItem from "@/app/ui/ListItem";

export default function NavBar() {
  return (
    <div className="flex flex-col flex-1 h-full min-w-[295px] max-w-[393px] bg-darkgray rounded-tr-2xl">
      <div className="flex flex-none items-center h-[60px] pl-[20px]">
        <Menu className="cursor-pointer" />
      </div>
      <ul className="flex flex-col overflow-y-scroll h-full">
        <ListItem isDirectory={true} />
        <ListItem isDirectory={false} />
      </ul>
    </div>
  );
}
