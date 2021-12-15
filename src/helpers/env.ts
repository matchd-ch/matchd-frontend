export default function getEnv<T extends string | undefined>(
  name: string,
  defaultValue?: T
): string | T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any)?.configs?.[name] || process.env[name] || defaultValue;
}
