import { Suspense } from "react";
import H3 from "@/components/atoms/headings/H3";
import SmokeParticleSystem from "@/components/organisms/SmokeParticleSystem";

export default function SmokeParticleSystemPage() {
  return (
    <div className="flex flex-col h-full items-center">
      <H3 mainColor={false} className="p-4">
        Smoke Particle System
      </H3>
      <div className="flex flex-1 mt-6">
        <Suspense fallback="Loading Smoke Particle System">
          <SmokeParticleSystem />
        </Suspense>
      </div>
    </div>
  );
}
