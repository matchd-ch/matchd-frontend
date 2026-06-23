import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    setupNodeEvents() {},
    video: false,
    screenshotOnRunFailure: false,
    specPattern: "src/components/**/*spec.{js,jsx,ts,tsx}",
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
});
