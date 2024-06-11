import type { Dispatch, SetStateAction } from "react";

type UnknownRecord = Record<string, unknown>;
interface PageProps<P = UnknownRecord, Q = UnknownRecord> {
  params: P;
  searchParams: Q;
}

export type Handler<T> = [T, Dispatch<SetStateAction<T>>];
