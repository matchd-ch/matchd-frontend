export function replaceStack(url: string | undefined, stack: string): string {
  if (!url) return "";
  return url.replace("{stack}", stack);
}
