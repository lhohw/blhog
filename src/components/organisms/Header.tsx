import Link from "next/link";
import Metaphor from "../atoms/Metaphor";
import { Git } from "@/components/icons";
import ThemeMetaphor from "@/components/organisms/ThemeMetaphor";

export default function Header() {
  return (
    <header
      className="flex h-12 w-full items-center justify-between px-4 border-b-slight border-primary sticky top-0 z-20 bg-background"
      style={{
        boxShadow: "0 5px 10px -5px var(--primary)",
      }}
    >
      <Link href="/posts">
        <h1 className="text-base font-bold">{`lhohw's blog`}</h1>
      </Link>
      <ul className="flex flex-1 justify-end items-center h-full">
        <li>
          <Metaphor.Link
            title="git"
            Icon={Git}
            href={"https://github.com/lhohw"}
          />
        </li>
        <li>
          <ThemeMetaphor />
        </li>
      </ul>
    </header>
  );
}
