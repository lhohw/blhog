import { ChevronLeft } from "@/app/ui/icons";

export type ListItemProps = {
  isDirectory?: boolean;
  title: string;
  Icon: typeof ChevronLeft;
};
export default function ListItem({
  isDirectory = false,
  title,
  Icon,
}: ListItemProps) {
  return (
    <div className="flex items-center flex-none h-14 py-2 px-4">
      <div className="flex flex-1 flex-row items-center h-10 p-2 rounded-lg cursor-pointer hover:bg-[#2D2C31] transition-color">
        <div className="w-4 mr-2">
          {isDirectory ? <ChevronLeft className="mr-2" /> : null}
        </div>
        <Icon className="mr-2" />
        <span className="flex flex-1 ml-2">{title}</span>
      </div>
    </div>
  );
}
