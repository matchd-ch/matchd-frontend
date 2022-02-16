import { getData } from "@/helpers/runtimeData";

export interface Config {
  API_URL: string;
  DATA_PROTECTION_URL: string;
  BASE_URL: string;
  NODE_ENV: string;
}

const defaultConfig: Config = {
  API_URL: "http://api.matchd.localhost:8080",
  DATA_PROTECTION_URL: "https://app.matchd.localhost/datenschutz",
  BASE_URL: "/",
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
  API_URL: runtimeConfig.API_URL
    ? runtimeConfig.API_URL
    : process.env.VUE_APP_API_URL
    ? process.env.VUE_APP_API_URL
    : defaultConfig.API_URL,
  DATA_PROTECTION_URL: runtimeConfig.DATA_PROTECTION_URL
    ? runtimeConfig.DATA_PROTECTION_URL
    : process.env.VUE_APP_DATA_PROTECTION_URL
    ? process.env.VUE_APP_DATA_PROTECTION_URL
    : defaultConfig.DATA_PROTECTION_URL,
  BASE_URL: runtimeConfig.BASE_URL
    ? runtimeConfig.BASE_URL
    : process.env.BASE_URL
    ? process.env.BASE_URL
    : defaultConfig.BASE_URL,
  NODE_ENV: runtimeConfig.NODE_ENV
    ? runtimeConfig.NODE_ENV
    : process.env.NODE_ENV
    ? process.env.NODE_ENV
    : defaultConfig.NODE_ENV,
};
