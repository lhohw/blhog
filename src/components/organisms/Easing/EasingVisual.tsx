import type { AnimationType } from "@/lib/utils/easing/easingFrame";
import { useEffect } from "react";
import Section from "@/components/molecules/Section";
import Ball from "@/components/atoms/easing/Ball";

export type EasingVisualProps = {
  type?: AnimationType;
  setFrame: (target: HTMLElement) => void;
};
export default function EasingVisual({ type, setFrame }: EasingVisualProps) {
  return (
    <Section className="w-full" title={type} mainColor={false}>
      <div className="flex flex-1 flex-col w-1/2 h-full area justify-end mt-4 self-center">
        <EasingComponent type={type} setFrame={setFrame} />
      </div>
    </Section>
  );
}

const EasingComponent = ({ type, setFrame }: EasingVisualProps) => {
  useEffect(() => {
    const target = document.querySelector(".easing") as HTMLElement;
    const container = target?.parentElement;

    if (container && target) {
      setFrame(target);
    }
  });

  if (type === "ball") return <Ball />;
  return null;
};
