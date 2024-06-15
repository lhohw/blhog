import { Git } from "@/components/icons";
import Metaphor from "@/components/atoms/Metaphor";
import ThemeMetaphor from "@/components/organisms/ThemeMetaphor";
import HeaderTitle from "@/components/organisms/HeaderTitle";

export default function Header() {
  return (
    <header
      className="flex h-12 w-full items-center justify-between px-4 border-b-slight border-primary sticky top-0 z-20 bg-background"
      style={{
        boxShadow: "0 5px 10px -5px var(--primary)",
      }}
    >
      <HeaderTitle />
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
