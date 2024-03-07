import { slugToStr } from "@/app/lib/utils";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <div className="flex flex-1 flex-col">{slugToStr(id)}</div>;
}
