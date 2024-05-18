type UnknownRecord = Record<string, unknown>;
interface PageProps<P = UnknownRecord, Q = UnknownRecord> {
  params: P;
  searchParams: Q;
}
