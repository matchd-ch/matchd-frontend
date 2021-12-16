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
app.mount("#app");
