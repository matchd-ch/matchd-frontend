import { isLoggedIn } from "@/router/authenticationGuard";
import { isCompleteProfile } from "@/router/homeGuard";
import { redirectToCurrentJobPostingStep } from "@/router/jobPostingGuard";
import { redirectToCurrentOnboardingStep } from "@/router/onboardingGuard";
import { needsStateResetBeforePasswordReset } from "@/router/passwordResetGuard";
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
    path: "/onboarding/:step?",
    name: "Onboarding",
    component: () => import(/* webpackChunkName: "onboarding" */ "../views/Onboarding.vue"),
    beforeEnter: redirectToCurrentOnboardingStep,
  },
  {
    path: "/stelle/ausschreiben/:id?/:step?",
    name: "CreateJobPosting",
    component: () =>
      import(/* webpackChunkName: "create-jobposting" */ "../views/CreateJobPosting.vue"),
    beforeEnter: redirectToCurrentJobPostingStep,
  },
  {
    path: "/talente",
    name: "SearchStudent",
    component: () => import(/* webpackChunkName: "student-search" */ "../views/SearchStudent.vue"),
  },
  {
    path: "/talente/:slug",
    name: "StudentDetail",
    component: () => import(/* webpackChunkName: "student-detail" */ "../views/StudentDetail.vue"),
  },
  {
    path: "/firmen/",
    name: "SearchCompany",
    component: () => import(/* webpackChunkName: "company-search" */ "../views/SearchCompany.vue"),
  },
  {
    path: "/firmen/:slug",
    name: "CompanyDetail",
    component: () => import(/* webpackChunkName: "company-detail" */ "../views/CompanyDetail.vue"),
  },
  {
    path: "/passwort-vergessen",
    name: "PasswordForgotten",
    component: () => import(/* webpackChunkName: "login" */ "../views/PasswordForgotten.vue"),
    meta: {
      public: true,
    },
    beforeEnter: needsStateResetBeforePasswordReset,
  },
  {
    path: "/passwort-reset/:token",
    name: "PasswordReset",
    component: () => import(/* webpackChunkName: "login" */ "../views/PasswordReset.vue"),
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
router.beforeEach(isCompleteProfile);

export default router;
