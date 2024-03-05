import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen pt-3 px-6 pb-6">
      <div className="flex flex-col flex-1 bg-dark">
        <Link
          className="p-2 hover:text-sea-100 rounded-md border-slight border-sea-200"
          href={"/posts"}
        >
          Posts
        </Link>
      </div>
    </main>
  );
}
