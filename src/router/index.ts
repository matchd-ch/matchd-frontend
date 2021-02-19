import { isLoggedIn } from "@/router/authenticationGuard";
import { isCompleteProfile } from "@/router/homeGuard";
import { redirectToCurrentOnboardingStep } from "@/router/onboardingGuard";
import { needsStateResetBeforePasswordReset } from "@/router/passwordResetGuard";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: isCompleteProfile,
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
    path: "/onboarding",
    name: "Onboarding",
    component: () => import(/* webpackChunkName: "onboarding" */ "../views/Onboarding.vue"),
    children: [
      {
        path: "schritt1",
        name: "OnboardingStep1",
        component: () =>
          import(/* webpackChunkName: "onboarding" */ "../views/onboarding/Step1.vue"),
      },
      {
        path: "schritt2",
        name: "OnboardingStep2",
        component: () =>
          import(/* webpackChunkName: "onboarding" */ "../views/onboarding/Step2.vue"),
      },
      {
        path: "schritt3",
        name: "OnboardingStep3",
        component: () =>
          import(/* webpackChunkName: "onboarding" */ "../views/onboarding/Step3.vue"),
      },
      {
        path: "schritt4",
        name: "OnboardingStep4",
        component: () =>
          import(/* webpackChunkName: "onboarding" */ "../views/onboarding/Step4.vue"),
      },
      {
        path: "schritt5",
        name: "OnboardingStep5",
        component: () =>
          import(/* webpackChunkName: "onboarding" */ "../views/onboarding/Step5.vue"),
      },
      {
        path: "schritt6",
        name: "OnboardingStep6",
        component: () =>
          import(/* webpackChunkName: "onboarding" */ "../views/onboarding/Step6.vue"),
      },
      {
        path: "erledigt",
        name: "OnboardingFinish",
        component: () =>
          import(/* webpackChunkName: "onboarding" */ "../views/onboarding/Finish.vue"),
      },
    ],
    beforeEnter: redirectToCurrentOnboardingStep,
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

export default router;
