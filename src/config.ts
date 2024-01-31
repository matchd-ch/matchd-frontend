import { getData } from "@/helpers/runtimeData";

export interface Config {
  VUE_APP_API_URL: string;
  VUE_APP_DATA_PROTECTION_URL: string;
  VUE_APP_BASE_URL: string;
  NODE_ENV: string;
}

const defaultConfig: Config = {
  VUE_APP_API_URL: "http://api.matchd.localhost:8080",
  VUE_APP_DATA_PROTECTION_URL: "https://app.matchd.localhost/datenschutz",
  VUE_APP_BASE_URL: "/",
  NODE_ENV: "development",
};

const getRuntimeConfig = (): Partial<Config> => {
  try {
    const runtimeConfig = getData("runtime-config");
    console.debug("Runtime config was fetched from meta tag.", runtimeConfig);
    return runtimeConfig;
  } catch (error) {
    console.debug("Runtime config could not be fetched from meta tag.", error);
    return {};
  }
};

const runtimeConfig = getRuntimeConfig();

export const config = {
  API_URL: runtimeConfig.VUE_APP_API_URL
    ? runtimeConfig.VUE_APP_API_URL
    : process.env.VUE_APP_API_URL
      ? process.env.VUE_APP_API_URL
      : defaultConfig.VUE_APP_API_URL,
  DATA_PROTECTION_URL: runtimeConfig.VUE_APP_DATA_PROTECTION_URL
    ? runtimeConfig.VUE_APP_DATA_PROTECTION_URL
    : process.env.VUE_APP_DATA_PROTECTION_URL
      ? process.env.VUE_APP_DATA_PROTECTION_URL
      : defaultConfig.VUE_APP_DATA_PROTECTION_URL,
  BASE_URL: runtimeConfig.VUE_APP_BASE_URL
    ? runtimeConfig.VUE_APP_BASE_URL
    : process.env.VUE_APP_BASE_URL
      ? process.env.VUE_APP_BASE_URL
      : defaultConfig.VUE_APP_BASE_URL,
  NODE_ENV: runtimeConfig.NODE_ENV
    ? runtimeConfig.NODE_ENV
    : process.env.NODE_ENV
      ? process.env.NODE_ENV
      : defaultConfig.NODE_ENV,
};
