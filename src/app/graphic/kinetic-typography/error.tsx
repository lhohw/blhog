"use client";

import Error from "@/components/Error";

export default function KineticTypographyErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <Error error={error} reset={reset} />;
}
