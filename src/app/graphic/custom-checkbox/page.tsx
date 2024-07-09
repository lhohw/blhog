import H3 from "@/components/atoms/headings/H3";
import Checkbox from "@/components/organisms/Checkbox";

export default function CustomCheckboxPage() {
  return (
    <div className="flex flex-col items-center h-full justify-center">
      <H3 mainColor={false} className="p-4">
        Custom Checkbox
      </H3>
      <div className="flex w-80 my-6 items-center justify-center">
        <Checkbox size="3xl" />
      </div>
    </div>
  );
}
