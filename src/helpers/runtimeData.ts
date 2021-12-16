import { Config } from "@/config";
export function getData(dataSelect: string): Partial<Config> {
  try {
    const inlineJsonElement = document.querySelector(
      `script[type="application/json"][data-selector="${dataSelect}"]`
    );
    const data = inlineJsonElement?.textContent ? JSON.parse(inlineJsonElement.textContent) : {};
    return data;
  } catch (err) {
    console.error(`Couldn't read JSON data from ${dataSelect}`, err);
    return {};
  }
}
