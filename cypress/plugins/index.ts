import { startDevServer } from "@cypress/webpack-dev-server";
import webpackConfig from "@vue/cli-service/webpack.config";

export default (on, config) => {
  if (config.testingType === "component") {
    on("dev-server:start", (options) => {
      return startDevServer({ options, webpackConfig });
    });
  }

  return config;
};
