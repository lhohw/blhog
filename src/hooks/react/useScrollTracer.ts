import { useState } from "react";

export type UseScrollTracerProps<T> = {
  targets: T[] | (() => T[]);
};
export default function useScrollTracer<T extends HTMLElement>({
  targets,
}: UseScrollTracerProps<T>) {
  const [isPass, setIsPass] = useState([]);
}
