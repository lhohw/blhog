import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-none h-10 w-full items-center pl-4 border-b-slight border-sea-200">
      <Link href="/posts">
        <h1 className="text-base font-bold">{`lhohw's blog`}</h1>
      </Link>
    </header>
  );
}
