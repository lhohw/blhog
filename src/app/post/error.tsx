"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col w-full items-center p-4">
      <h2 className="mt-4 font-bold text-2xl">Something went wrong!</h2>
      <div className="flex p-4">
        <button className="area px-4 py-2 rounded-lg" onClick={() => reset()}>
          Try again
        </button>
        <Link className="area px-4 py-2 rounded-lg ml-6" href="/">
          Home
        </Link>
      </div>
    </div>
  );
}
