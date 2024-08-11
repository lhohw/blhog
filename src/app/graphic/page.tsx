import Link from "next/link";
import { strToSlug, toPascalCase } from "@/lib/utils/string";

export default function GraphicPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <LinkBox title="Kinetic Typography" />
      <LinkBox title="Easing" />
      <LinkBox title="Smoke Particle System" />
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
