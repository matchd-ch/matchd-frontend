import { isLoggedIn } from "@/router/authenticationGuard";
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
    component: () => import(/* webpackChunkName: "register" */ "../views/Login.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/registrierung",
    name: "Triage",
    component: () => import(/* webpackChunkName: "register" */ "../views/Triage.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/aktivierung/:token",
    name: "Activate",
    component: () => import(/* webpackChunkName: "register" */ "../views/Activate.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/registrierung/schueler*in-lernender",
    alias: ["/registrierung/berufseinsteiger*in", "/registrierung/student*in"],
    name: "Register-Student",
    component: () => import(/* webpackChunkName: "register" */ "../views/RegisterStudent.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/registrierung/unternehmung",
    alias: "/registrierung/bildungsinstitution",
    name: "Register-Company",
    component: () => import(/* webpackChunkName: "register" */ "../views/RegisterCompany.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
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

router.beforeEach(isLoggedIn);

export default router;
