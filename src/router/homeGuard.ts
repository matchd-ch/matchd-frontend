import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function isCompleteProfile(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useStore();
  const profileStep = store.getters["user"]?.profileStep;
  const isCompany = store.getters["isCompany"];
  const isStudent = store.getters["isStudent"];
  if (profileStep && ((isStudent && profileStep <= 6) || (isCompany && profileStep <= 3))) {
    next({ name: "Onboarding" });
  } else {
    next();
  }
}
