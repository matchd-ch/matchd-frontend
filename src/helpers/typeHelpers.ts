import { AssertionError } from "assertion-error";

export function ensureNoNullsAndUndefineds<T>(items: (T | null | undefined)[]) {
  return items.filter((x): x is T => x !== null && x !== undefined);
}

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError(`Expected 'val' to be defined, but received ${val}`);
  }
}

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

export const filterNullables = <T>(item?: T | null): item is T =>
  item !== null && item !== undefined;

export const extractNodeAsArray = <N>(edge: { node?: N | null }) => (edge.node ? [edge.node] : []);
