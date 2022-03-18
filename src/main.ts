import { createGtm } from "@gtm-support/vue-gtm";
import { createApp } from "vue";
import { createMetaManager } from "vue-meta";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "./validation";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(createMetaManager());

// See https://docs.sentry.io/platforms/javascript/guides/vue/
// if (process.env.VUE_APP_SENTRY_DSN && process.env.VUE_APP_SENTRY_ENVIRONMENT) {
//   Sentry.init({
//     app,
//     dsn: process.env.VUE_APP_SENTRY_DSN,
//     environment: process.env.VUE_APP_SENTRY_ENVIRONMENT,
//     release: process.env.VUE_APP_SENTRY_RELEASE ? process.env.VUE_APP_SENTRY_RELEASE : undefined,
//     integrations: [
//       new BrowserTracing({
//         routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       }),
//     ],
//     tracesSampleRate: 1.0,
//   });
// }

// See https://www.npmjs.com/package/@gtm-support/vue-gtm
if (process.env.VUE_APP_GTM_CONTAINER_ID) {
  app.use(
    createGtm({
      id: process.env.VUE_APP_GTM_CONTAINER_ID,
      defer: false,
      enabled: process.env.VUE_APP_GTM_ENABLED === "true",
      debug: process.env.VUE_APP_GTM_DEBUG === "true",
      loadScript: true,
      vueRouter: router,
    })
  );
}

app.mount("#app");
