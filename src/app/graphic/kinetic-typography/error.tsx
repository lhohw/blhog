"use client";

import Error from "@/components/templates/Error";

export default function KineticTypographyErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <Error error={error} reset={reset} />;
}
