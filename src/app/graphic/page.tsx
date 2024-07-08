import Link from "next/link";
import { strToSlug, toPascalCase } from "@/lib/utils/string";

export default function GraphicPage() {
  return (
    <div className="flex flex-col">
      <LinkBox title="Custom Checkbox" />
      <LinkBox title="Animated Back" />
      <LinkBox title="Kinetic Typography" />
    </div>
  );
}

const LinkBox = ({ title }: { title: string }) => (
  <Link
    className={`
      relative area py-2 px-4 rounded-lg [&+&]:mt-4 text-center overflow-hidden transition-colors duration-300
      before:-z-10 before:absolute before:inset-0 before:bg-primary-alpha before:-translate-x-full
      before:transition-transform before:duration-300
      hover:text-white hover:before:-translate-x-0 
    `}
    href={`/graphic/${strToSlug(title).toLocaleLowerCase()}`}
  >
    {toPascalCase(title)}
  </Link>
);
