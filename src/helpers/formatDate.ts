import { DateTime } from "luxon";

export function formatDate(isoString: string, format: string): string {
  const date = DateTime.fromISO(isoString).setLocale("de-CH");
  return date.toFormat(format);
}
