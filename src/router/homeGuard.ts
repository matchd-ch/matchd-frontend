import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function isCompleteProfile(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useStore();
  const profileStep = store.getters["user"]?.profileStep;
  if (profileStep && profileStep <= 6) {
    next({ name: "Onboarding" });
  } else {
    next({ name: "Home" });
  }
}
