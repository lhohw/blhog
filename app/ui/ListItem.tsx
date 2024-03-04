import { ChevronLeft, JS } from "@/app/ui/icons";

export default function ListItem({
  isDirectory = false,
}: {
  isDirectory: boolean;
}) {
  return (
    <div className="flex items-center flex-none h-14 py-2 px-4">
      <div className="flex flex-1 flex-row items-center h-10 p-2 rounded-lg cursor-pointer hover:bg-[#2D2C31] transition-color">
        <div className="w-2 h-2 mr-2">
          {isDirectory ? <ChevronLeft className="mr-2" /> : null}
        </div>
        <JS className="mr-2" />
        <span className="flex flex-1 ml-2">JavaScript</span>
      </div>
    </div>
  );
}
