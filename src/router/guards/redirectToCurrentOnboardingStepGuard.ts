import { parseStepName } from "@/helpers/parseStepName";
import { useStore } from "@/store";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { Routes } from "..";

export async function redirectToCurrentOnboardingStepGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  const urlStep = parseStepName(String(to.params?.step || 1));
  const profileStep = store.getters["profileStep"];
  const isCompany = store.getters["isCompany"];
  const isStudent = store.getters["isStudent"];
  const isUniversity = store.getters["isUniversity"];

  if (!profileStep) {
    next({ name: "Error" });
  } else {
    const nextStep = urlStep < profileStep ? urlStep : profileStep;
    if (
      (to.name === Routes.ONBOARDING && to.params.step === `schritt${nextStep}`) ||
      (to.name === Routes.ONBOARDING &&
        ((isStudent && nextStep === 7) ||
          (isCompany && nextStep === 4) ||
          (isUniversity && nextStep === 4)))
    ) {
      next(); // prevent infinite redirect
    } else if (
      nextStep &&
      ((isStudent && nextStep <= 6) ||
        (isCompany && nextStep <= 3) ||
        (isUniversity && nextStep <= 4))
    ) {
      next({ name: Routes.ONBOARDING, params: { step: `schritt${profileStep}` } });
    } else {
      next({ name: Routes.ONBOARDING, params: { step: "finish" } });
    }
  }
}
