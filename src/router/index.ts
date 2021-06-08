import { calculateMargins } from "@/helpers/calculateMargins";
import { isLoggedIn } from "@/router/authenticationGuard";
import { isCompleteProfile } from "@/router/homeGuard";
import { redirectToCurrentJobPostingStep } from "@/router/jobPostingGuard";
import { redirectToCurrentOnboardingStep } from "@/router/onboardingGuard";
import { needsStateResetBeforePasswordReset } from "@/router/passwordResetGuard";
import { studentsOnlyWithPublishedJobPostingGuard } from "@/router/studentsOnlyWithPublishedJobPostingGuard";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/registrierung",
    name: "Triage",
    component: () => import(/* webpackChunkName: "register" */ "../views/Triage.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/aktivierung/:token",
    name: "Activate",
    component: () => import(/* webpackChunkName: "register" */ "../views/Activate.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/onboarding/:step?",
    name: "Onboarding",
    component: () => import(/* webpackChunkName: "onboarding" */ "../views/Onboarding.vue"),
    beforeEnter: redirectToCurrentOnboardingStep,
    meta: {
      hideNavigation: true,
    },
  },
  {
    path: "/profil",
    name: "Profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: "/profil/bearbeiten/:step",
    name: "ProfileEdit",
    component: () => import(/* webpackChunkName: "profile" */ "../views/ProfileEdit.vue"),
  },
  {
    path: "/stellen/ausschreiben/:slug?/:step?",
    name: "JobPostingCreate",
    component: () =>
      import(/* webpackChunkName: "jobposting-create" */ "../views/JobPostingCreate.vue"),
    beforeEnter: redirectToCurrentJobPostingStep,
    meta: {
      accessType: ["company"],
    },
  },
  {
    path: "/stellen",
    name: "JobPostingSearch",
    component: () =>
      import(/* webpackChunkName: "jobposting-search" */ "../views/JobPostingSearch.vue"),
    meta: {
      accessType: ["student"],
    },
  },
  {
    path: "/stellen/:slug",
    name: "JobPostingDetail",
    component: () =>
      import(/* webpackChunkName: "jobposting-detail" */ "../views/JobPostingDetail.vue"),
  },
  {
    path: "/talente",
    name: "StudentSearch",
    component: () => import(/* webpackChunkName: "student-search" */ "../views/StudentSearch.vue"),
    meta: {
      accessType: ["company"],
    },
    beforeEnter: studentsOnlyWithPublishedJobPostingGuard,
  },
  {
    path: "/talente/:slug",
    name: "StudentDetail",
    component: () => import(/* webpackChunkName: "student-detail" */ "../views/StudentDetail.vue"),
    meta: {
      accessType: ["company"],
    },
    beforeEnter: studentsOnlyWithPublishedJobPostingGuard,
  },
  {
    path: "/firmen/:slug",
    name: "CompanyDetail",
    component: () => import(/* webpackChunkName: "company-detail" */ "../views/CompanyDetail.vue"),
  },
  {
    path: "/firmen",
    name: "CompanyList",
    component: () => import(/* webpackChunkName: "company-detail" */ "../views/CompanyList.vue"),
    meta: {
      accessType: ["student"],
    },
  },
  {
    path: "/bildungs-instituten/:slug",
    name: "CompanyDetail",
    component: () => import(/* webpackChunkName: "company-detail" */ "../views/UniversityDetail.vue"),
  },
  {
    path: "/passwort-vergessen",
    name: "PasswordForgotten",
    component: () => import(/* webpackChunkName: "login" */ "../views/PasswordForgotten.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
    beforeEnter: needsStateResetBeforePasswordReset,
  },
  {
    path: "/passwort-reset/:token",
    name: "PasswordReset",
    component: () => import(/* webpackChunkName: "login" */ "../views/PasswordReset.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/registrierung/schueler*in-lernender",
    alias: ["/registrierung/berufseinsteiger*in", "/registrierung/student*in"],
    name: "StudentRegister",
    component: () => import(/* webpackChunkName: "register" */ "../views/StudentRegister.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/registrierung/unternehmung",
    alias: "/registrierung/bildungsinstitution",
    name: "CompanyRegister",
    component: () => import(/* webpackChunkName: "register" */ "../views/CompanyRegister.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/kontakt",
    name: "Contact",
    component: () => import(/* webpackChunkName: "register" */ "../views/Contact.vue"),
    meta: {
      public: true,
      hideNavigation: true,
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
router.afterEach(calculateMargins);

export default router;
