export function ensureNoNullsAndUndefineds<T>(items: (T | null | undefined)[]) {
  return items.filter((x): x is T => x !== null && x !== undefined);
}
