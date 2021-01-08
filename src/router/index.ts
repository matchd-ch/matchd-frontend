import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/registrierung",
    name: "Triage",
    component: () => import(/* webpackChunkName: "register" */ "../views/Triage.vue")
  },
  {
    path: "/registrierung/next",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ "../views/Register.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
