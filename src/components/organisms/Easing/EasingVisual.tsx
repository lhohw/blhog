import type { AnimationType } from "@/lib/utils/easing/easingFrame";
import { useEffect } from "react";
import Section from "@/components/molecules/Section";
import Ball from "@/components/atoms/easing/Ball";
import Opacity from "@/components/atoms/easing/Opacity";

export type EasingVisualProps = {
  type?: AnimationType;
  setFrame: (target: HTMLElement) => void;
};
export default function EasingVisual({ type, setFrame }: EasingVisualProps) {
  return (
    <Section
      className="w-full md:min-h-full-except-header"
      title={type}
      mainColor={false}
    >
      <EasingComponent type={type} setFrame={setFrame} />
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
  else if (type === "opacity") return <Opacity />;
  return null;
};
