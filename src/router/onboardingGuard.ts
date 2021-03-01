import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function redirectToCurrentOnboardingStep(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useStore();
  const profileStep = store.getters["user"]?.profileStep;

  if (!profileStep) {
    next({ name: "Error" });
  } else if (
    (to.name === `Onboarding` && to.params.step === `schritt${profileStep}`) ||
    (to.name === "Onboarding" && profileStep === 7)
  ) {
    next(); // prevent infinite redirect
  } else if (profileStep <= 6) {
    next({ name: `Onboarding`, params: { step: `schritt${profileStep}` } });
  } else {
    next({ name: "Onboarding", params: { step: "finish" } });
  }
}
