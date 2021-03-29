import { ParamStrings } from "@/router/paramStrings";

export function parseStepName(name: string): number {
  return parseInt(name.replace(ParamStrings.STEP, ""));
}
