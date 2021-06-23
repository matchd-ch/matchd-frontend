import { parseStepName } from "@/helpers/parseStepName";
import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

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
      (to.name === `Onboarding` && to.params.step === `schritt${nextStep}`) ||
      (to.name === "Onboarding" &&
        ((isStudent && nextStep === 7) ||
          (isCompany && nextStep === 4) ||
          (isUniversity && nextStep === 4)))
    ) {
      next(); // prevent infinite redirect
    } else if (
      nextStep &&
      ((isStudent && nextStep <= 6) ||
        (isCompany && nextStep <= 3) ||
        (isUniversity && nextStep <= 3))
    ) {
      next({ name: `Onboarding`, params: { step: `schritt${profileStep}` } });
    } else {
      next({ name: "Onboarding", params: { step: "finish" } });
    }
  }
}
