export function nl2br(text: string): string {
  return text.replace(new RegExp(/\n/, "g"), "<br />");
}
