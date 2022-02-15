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

// See https://www.npmjs.com/package/@gtm-support/vue-gtm
app.use(
  createGtm({
    id: process.env.VUE_APP_GTM_CONTAINER_ID || null,
    defer: false,
    enabled: process.env.VUE_APP_GTM_ENABLED === "true",
    debug: process.env.VUE_APP_GTM_DEBUG === "true",
    loadScript: true,
    vueRouter: router,
  })
);

app.mount("#app");
