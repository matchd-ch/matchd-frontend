import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function redirectToCurrentOnboardingStep(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useStore();
  const profileStep = store.getters["user"]?.profileStep;
  const isCompany = store.getters["isCompany"];
  const isStudent = store.getters["isStudent"];
  if (!profileStep) {
    next({ name: "Error" });
  } else if (
    (to.name === `Onboarding` && to.params.step === `schritt${profileStep}`) ||
    (to.name === "Onboarding" &&
      ((isStudent && profileStep === 7) || (isCompany && profileStep === 4)))
  ) {
    next(); // prevent infinite redirect
  } else if ((isStudent && profileStep <= 6) || (isCompany && profileStep <= 3)) {
    next({ name: `Onboarding`, params: { step: `schritt${profileStep}` } });
  } else {
    next({ name: "Onboarding", params: { step: "finish" } });
  }
}
