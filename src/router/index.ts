import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/registrierung",
    name: "Triage",
    component: () => import(/* webpackChunkName: "register" */ "../views/Triage.vue"),
  },
  {
    path: "/aktivierung/:token",
    name: "Activate",
    component: () => import(/* webpackChunkName: "register" */ "../views/Activate.vue"),
  },
  {
    path: "/passwort-vergessen",
    name: "PasswordForgotten",
    component: () => import(/* webpackChunkName: "login" */ "../views/PasswordForgotten.vue"),
  },
  {
    path: "/passwort-reset/:token",
    name: "PasswordReset",
    component: () => import(/* webpackChunkName: "login" */ "../views/PasswordReset.vue"),
  },
  {
    path: "/registrierung/schueler*in-lernender",
    alias: ["/registrierung/berufseinsteiger*in", "/registrierung/student*in"],
    name: "Register-Student",
    component: () => import(/* webpackChunkName: "register" */ "../views/RegisterStudent.vue"),
  },
  {
    path: "/registrierung/unternehmung",
    alias: "/registrierung/bildungsinstitution",
    name: "Register-Company",
    component: () => import(/* webpackChunkName: "register" */ "../views/RegisterCompany.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
