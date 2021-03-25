import { ParamStrings } from "@/router/paramStrings";

export function parseStepName(name: string) {
  return parseInt(name.replace(ParamStrings.STEP, ""));
}
