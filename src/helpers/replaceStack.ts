export function replaceStack(url: string, stack: string): string {
  return url.replace("{stack}", stack);
}
