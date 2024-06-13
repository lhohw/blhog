import type { Dispatch, SetStateAction } from "react";

type UnknownRecord = Record<string, unknown>;
export type PageProps<P = UnknownRecord, Q = UnknownRecord> = {
  params: P;
  searchParams: Q;
};

export type Handler<T> = [T, Dispatch<SetStateAction<T>>];
