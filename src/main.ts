import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createMetaManager } from "vue-meta";
import { store } from "./store";
import "./registerServiceWorker";

import "./validation";

createApp(App).use(store).use(router).use(createMetaManager()).mount("#app");
