import { MutableRefObject, useCallback, useMemo } from "react";
import { Application, ApplicationOptions, Assets, Texture } from "pixi.js";
import Particle from "@/class/Particle";
import { Coord } from "./useText";
import ParticleAsset from "@/assets/particle.webp";

export type useVisualProps = {
  containerRef: MutableRefObject<HTMLDivElement>;
  width: number;
  height: number;
};
export default function useVisual(
  containerRef: MutableRefObject<HTMLDivElement>,
  width: number,
  height: number,
) {
  const app = useMemo(() => new Application(), []);

  const options = useMemo<Partial<ApplicationOptions>>(
    () => ({
      width,
      height,
      antialias: true,
      resolution: 2,
      autoDensity: true,
      backgroundAlpha: 0,
      powerPreference: "high-performance",
    }),
    [width, height],
  );

  const initApp = useCallback(async () => {
    await app.init(options);

    const { canvas } = app;
    canvas.classList.add("absolute", "inset-0");
    return canvas;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadParticleAsset = useCallback(async () => {
    return await Assets.load(ParticleAsset);
  }, []);

  const initParticles = useCallback(
    (coords: Coord[], texture: Texture) => {
      const particles = [];
      for (let i = 0; i < coords.length; i++) {
        const { x, y } = coords[i];
        const particle = new Particle(x, y, texture);
        particles.push(particle);
      }

      app.stage.addChild(...particles.map((particle) => particle.sprite));

      return particles;
    },
    [app.stage],
  );

  const animate = useCallback(
    (particles: Particle[]) => {
      const container = containerRef.current;
      let mx = 0,
        my = 0;
      const mr = 30;
      container.addEventListener("pointermove", (e: PointerEvent) => {
        const { offsetX, offsetY } = e;
        mx = offsetX;
        my = offsetY;
      });

      requestAnimationFrame(function cb() {
        requestAnimationFrame(cb);

        for (let i = 0; i < particles.length; i++) {
          particles[i].render(mx, my, mr);
        }
      });
    },
    [containerRef],
  );

  return {
    initApp,
    loadParticleAsset,
    initParticles,
    animate,
  };
}
