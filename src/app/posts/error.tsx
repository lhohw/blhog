"use client";

import Error from "@/components/templates/Error";

export default function PostsErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <Error error={error} reset={reset} />;
}
