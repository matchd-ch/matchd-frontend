import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function isCompleteProfile(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  if (to.meta?.public) {
    next();
  } else {
    const store = useStore();
    const profileStep = store.getters["profileStep"];
    const isCompany = store.getters["isCompany"];
    const isStudent = store.getters["isStudent"];
    const isUniversity = store.getters["isUniversity"];

    if (
      (to.meta?.accessType &&
        (to.meta?.accessType as string[])?.includes("student") &&
        !isStudent) ||
      (to.meta?.accessType &&
        (to.meta?.accessType as string[])?.includes("company") &&
        !isCompany) ||
      (to.meta?.accessType &&
        (to.meta?.accessType as string[])?.includes("university") &&
        !isUniversity)
    ) {
      console.error("Access denied");
      next({ name: "Home" });
    } else if (
      to.name !== "Onboarding" &&
      profileStep &&
      ((isStudent && profileStep <= 6) ||
        (isCompany && profileStep <= 4) ||
        (isUniversity && profileStep <= 3))
    ) {
      next({ name: "Onboarding" });
    } else {
      next();
    }
  }
}
