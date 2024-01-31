import type { Config } from "@/config";
export function getData(dataSelect: string): Partial<Config> {
  try {
    const inlineJsonElement = document.querySelector(
      `script[type="application/json"][data-selector="${dataSelect}"]`,
    );
    if (!inlineJsonElement?.textContent) {
      return {};
    }
    if (inlineJsonElement.textContent.trim() === "// RUNTIME_CONFIGURATION") {
      return {};
    }
    return JSON.parse(inlineJsonElement.textContent);
  } catch (err) {
    console.error(`Couldn't read JSON data from ${dataSelect}`, err);
    return {};
  }
}
