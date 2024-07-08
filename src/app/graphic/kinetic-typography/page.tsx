import { Suspense } from "react";
import KineticTypography from "@/components/organisms/KineticTypography";
import H3 from "@/components/atoms/headings/H3";

export default function KineticTypographyPage() {
  return (
    <div className="flex flex-col text-center">
      <H3 mainColor={false} className="p-4">
        Kinetic Typography
      </H3>
      <div className="flex flex-1 mt-6">
        <Suspense fallback="Loading kinetic typography">
          <KineticTypography />
        </Suspense>
      </div>
    </div>
  );
}
