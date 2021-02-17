import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function redirectToCurrentOnboardingStep(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useStore();
  const profileStep = store.getters["user"]?.profileStep;
  if (profileStep && profileStep <= 6) {
    if (to.name === `OnboardingStep${profileStep}`) {
      next();
    } else {
      next({ name: `OnboardingStep${profileStep}` });
    }
  } else {
    next({ name: "Home" });
  }
}
