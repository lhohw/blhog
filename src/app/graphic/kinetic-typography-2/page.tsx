import { Suspense } from "react";
import KineticTypography from "@/components/organisms/KineticTypography";

export default function KineticTypography2() {
  return (
    <div className="flex flex-1">
      <Suspense fallback="Loading kinetic typography">
        <KineticTypography />
      </Suspense>
    </div>
  );
}
