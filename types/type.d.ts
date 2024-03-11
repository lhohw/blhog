type UnknownRecord = Record<string, unknown>;
interface PageProps<
  P = UnknownRecord extends infer U ? U : UnknownRecord,
  Q = UnknownRecord extends infer U ? U : UnknownRecord
> {
  params: P;
  searchParams: Q;
}