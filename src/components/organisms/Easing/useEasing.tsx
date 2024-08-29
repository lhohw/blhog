"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import _transform, {
  animationTypes,
  type AnimationType,
} from "@/lib/utils/easing/easingFrame";
import easingFunctions, {
  easingFunctionKeys,
  type EasingKey,
} from "@/lib/utils/easing/easingFunctions";
import RafControl from "@/class/RafControl";
import EasingControl from "@/class/EasingControl";
import transform from "@/lib/utils/easing/easingFrame";

export default function useEasing() {
  const [isPlaying, setIsPlaying] = useState(false);
  const play = useCallback(() => {
    rafControl.current.start();
    setIsPlaying(true);
  }, []);
  const done = useCallback(() => {
    rafControl.current.done();
    setIsPlaying(false);
  }, []);

  const [duration, setDuration] = useState(2000);

  const [easingKey, setEasingKey] = useState<EasingKey | undefined>(
    easingFunctionKeys[0],
  );
  const easingFunction = useMemo(
    () => (easingKey ? easingFunctions[easingKey] : undefined),
    [easingKey],
  );

  const selectEasingFunction = useCallback((idx: number) => {
    setEasingKey(easingFunctionKeys[idx] as EasingKey);
  }, []);

  const rafControl = useRef(new RafControl());
  const easingControl = useRef(new EasingControl(undefined!));

  const [type, setType] = useState<AnimationType>(animationTypes[0]);
  const isBallOverflow = useMemo(() => {
    return (
      type === "ball" &&
      (easingKey === "easeInElastic" || easingKey === "easeOutElastic")
    );
  }, [type, easingKey]);

  const selectType = useCallback((idx: number) => {
    setType(animationTypes[idx]);
  }, []);

  const setFrame = useCallback(
    (target: HTMLElement) => {
      const easingCtrl = easingControl.current;

      let startTime = 0;
      const frame = (now: number) => {
        if (!startTime) startTime = now;
        now -= startTime;
        const t = now / duration;

        const x = easingCtrl.getValue(t);
        const { direction } = easingCtrl;

        const isDone = transform[type](target, t, x, direction, duration);

        if (t >= 1 || isDone) {
          done();
          startTime = undefined!;
          easingCtrl.flip();
          return;
        }
      };

      rafControl.current.frame = frame;
    },
    [done, duration, type],
  );

  useEffect(() => {
    easingControl.current.setEasingFunction(easingFunction!);
  }, [easingFunction]);

  return {
    easingFunction,
    selectEasingFunction,
    isPlaying,
    play,
    done,
    rafControl,
    type,
    selectType,
    setFrame,
    isBallOverflow,
  };
}
