import prettyBytes from "pretty-bytes";

// usage: {{ file.size | prettyBytes }}
export const formatSize = (num: number) => {
  if (typeof num !== "number" || isNaN(num)) {
    throw new TypeError("Expected a number");
  }

  return prettyBytes(num);
};
