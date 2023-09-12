import { calculateMargins } from "@/helpers/calculateMargins";
import { isLoggedInGuard } from "@/router/guards/isLoggedInGuard";
import { isProfileCompleteGuard } from "@/router/guards/isProfileCompleteGuard";
import { needsStateResetBeforePasswordResetGuard } from "@/router/guards/needsStateResetBeforePasswordResetGuard";
import { redirectToCurrentChallengeStepGuard } from "@/router/guards/redirectToCurrentChallengeStepGuard";
import { redirectToCurrentJobPostingStepGuard } from "@/router/guards/redirectToCurrentJobPostingStepGuard";
// import { redirectToCurrentOnboardingStepGuard } from "@/router/guards/redirectToCurrentOnboardingStepGuard";
import { studentDetailOnlyWithPublishedJobOrChallengeGuard } from "@/router/guards/studentDetailOnlyWithPublishedJobOrChallengeGuard";
import { talentsOnlyWithPublishedJobPostingGuard } from "@/router/guards/talentsOnlyWithPublishedJobPostingGuard";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/DashboardOverview.vue";
import { config } from "./../config";

export enum Routes {
  DASHBOARD = "Dashboard",
  LOGIN = "Login",
  TRIAGE = "Triage",
  ACTIVATE = "Activate",
  ONBOARDING = "Onboarding",
  PROFILE = "Profile",
  PROFILE_EDIT = "ProfileEdit",
  JOB_POSTING_CREATE = "JobPostingCreate",
  JOB_POSTING_SEARCH = "JobPostingSearch",
  JOB_POSTING_DETAIL = "JobPostingDetail",
  CHALLENGE_CREATE = "ChallengeCreate",
  CHALLENGE_SEARCH = "ChallengeSearch",
  CHALLENGE_DETAIL = "ChallengeDetail",
  STUDENT_SEARCH = "StudentSearch",
  STUDENT_DETAIL = "StudentDetail",
  STUDENT_REGISTER = "StudentRegister",
  COMPANY_DETAIL = "CompanyDetail",
  COMPANY_LIST = "CompanyList",
  COMPANY_REGISTER = "CompanyRegister",
  UNIVERSITY_DETAIL = "UniversityDetail",
  PASSWORD_FORGOTTEN = "PasswordForgotten",
  PASSWORD_RESET = "PasswordReset",
  CONTACT = "Contact",
  ACCOUNT_DELETED = "ACCOUNT_DELETED",
  IMPERSONATE = "IMPERSONATE",
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: Routes.DASHBOARD,
    component: Dashboard,
  },
  {
    path: "/login",
    name: Routes.LOGIN,
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/registrierung",
    name: Routes.TRIAGE,
    component: () => import(/* webpackChunkName: "triage" */ "../views/Triage.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/aktivierung/:token",
    name: Routes.ACTIVATE,
    component: () => import(/* webpackChunkName: "activate" */ "../views/Activate.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/profil",
    name: Routes.PROFILE,
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: "/profil/bearbeiten/:step",
    name: Routes.PROFILE_EDIT,
    component: () => import(/* webpackChunkName: "profile-edit" */ "../views/ProfileEdit.vue"),
  },
  {
    path: "/stellen/ausschreiben/:slug?/:step?",
    name: Routes.JOB_POSTING_CREATE,
    component: () =>
      import(/* webpackChunkName: "jobposting-create" */ "../views/JobPostingCreate.vue"),
    beforeEnter: redirectToCurrentJobPostingStepGuard,
    meta: {
      accessType: ["company", "university"],
    },
  },
  {
    path: "/stellen",
    name: Routes.JOB_POSTING_SEARCH,
    component: () =>
      import(/* webpackChunkName: "jobposting-search" */ "../views/JobPostingSearch.vue"),
    meta: {
      accessType: ["student"],
    },
  },
  {
    path: "/stellen/:slug",
    name: Routes.JOB_POSTING_DETAIL,
    component: () =>
      import(/* webpackChunkName: "jobposting-detail" */ "../views/JobPostingDetail.vue"),
  },
  {
    path: "/challenges/ausschreiben/:slug?/:step?",
    name: Routes.CHALLENGE_CREATE,
    component: () =>
      import(/* webpackChunkName: "challenge-create" */ "../views/ChallengeCreate.vue"),
    beforeEnter: redirectToCurrentChallengeStepGuard,
    meta: {
      accessType: ["company", "student", "university"],
    },
  },
  {
    path: "/challenges",
    name: Routes.CHALLENGE_SEARCH,
    component: () =>
      import(/* webpackChunkName: "challenge-search" */ "../views/ChallengeSearch.vue"),
    meta: {
      accessType: ["student", "company", "university"],
      public: true,
    },
  },
  {
    path: "/challenges/:slug",
    name: Routes.CHALLENGE_DETAIL,
    component: () =>
      import(/* webpackChunkName: "challenge-detail" */ "../views/ChallengeDetail.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/talente",
    name: Routes.STUDENT_SEARCH,
    component: () => import(/* webpackChunkName: "student-search" */ "../views/StudentSearch.vue"),
    meta: {
      accessType: ["student", "company", "university"],
    },
    beforeEnter: talentsOnlyWithPublishedJobPostingGuard,
  },
  {
    path: "/talente/:slug",
    name: Routes.STUDENT_DETAIL,
    component: () => import(/* webpackChunkName: "student-detail" */ "../views/StudentDetail.vue"),
    meta: {
      accessType: ["company", "university"],
    },
    beforeEnter: studentDetailOnlyWithPublishedJobOrChallengeGuard,
  },
  {
    path: "/firmen/:slug",
    name: Routes.COMPANY_DETAIL,
    component: () => import(/* webpackChunkName: "company-detail" */ "../views/CompanyDetail.vue"),
  },
  {
    path: "/firmen",
    name: Routes.COMPANY_LIST,
    component: () => import(/* webpackChunkName: "company-list" */ "../views/CompanyList.vue"),
    meta: {
      accessType: ["student"],
    },
  },
  {
    path: "/bildungsinstitute/:slug",
    name: Routes.UNIVERSITY_DETAIL,
    component: () =>
      import(/* webpackChunkName: "university-detail" */ "../views/UniversityDetail.vue"),
  },
  {
    path: "/passwort-vergessen",
    name: Routes.PASSWORD_FORGOTTEN,
    component: () => import(/* webpackChunkName: "login" */ "../views/PasswordForgotten.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
    beforeEnter: needsStateResetBeforePasswordResetGuard,
  },
  {
    path: "/passwort-reset/:token",
    name: Routes.PASSWORD_RESET,
    component: () => import(/* webpackChunkName: "password-reset" */ "../views/PasswordReset.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/registrierung/schueler*in-lernender",
    alias: ["/registrierung/berufseinsteiger*in", "/registrierung/student*in"],
    name: Routes.STUDENT_REGISTER,
    component: () =>
      import(/* webpackChunkName: "student-register" */ "../views/StudentRegister.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/registrierung/unternehmung",
    alias: "/registrierung/bildungsinstitution",
    name: Routes.COMPANY_REGISTER,
    component: () =>
      import(/* webpackChunkName: "company-register" */ "../views/CompanyRegister.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/kontakt",
    name: Routes.CONTACT,
    component: () => import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/konto-geloescht",
    name: Routes.ACCOUNT_DELETED,
    component: () =>
      import(/* webpackChunkName: "account-deleted" */ "../views/AccountDeleted.vue"),
    meta: {
      public: true,
      hideNavigation: true,
    },
  },
  {
    path: "/impersonate",
    name: Routes.IMPERSONATE,
    component: () => import(/* webpackChunkName: "impersonate" */ "../views/Impersonate.vue"),
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
  history: createWebHistory(config.BASE_URL),
  routes,
});

router.beforeEach(isLoggedInGuard);
router.beforeEach(isProfileCompleteGuard);
router.afterEach(calculateMargins);

export default router;
