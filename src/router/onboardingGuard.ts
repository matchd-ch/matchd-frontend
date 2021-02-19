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
    to.name === `OnboardingStep${profileStep}` ||
    (to.name === "OnboardingFinish" && profileStep === 7)
  ) {
    next(); // prevent infinite redirect
  } else if (profileStep <= 6) {
    next({ name: `OnboardingStep${profileStep}` });
  } else {
    next({ name: "OnboardingFinish" });
  }
}
