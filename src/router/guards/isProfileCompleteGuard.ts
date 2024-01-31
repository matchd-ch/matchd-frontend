import { useStore } from "@/store";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { Routes } from "..";

export async function isProfileCompleteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> {
  if (to.meta?.public) {
    next();
  } else {
    const store = useStore();
    const isCompany = store.getters["isCompany"];
    const isStudent = store.getters["isStudent"];
    const isUniversity = store.getters["isUniversity"];

    if (!to.meta?.accessType) {
      next();
    } else if (
      ((to.meta?.accessType as string[])?.includes("student") && isStudent) ||
      ((to.meta?.accessType as string[])?.includes("company") && isCompany) ||
      ((to.meta?.accessType as string[])?.includes("university") && isUniversity)
    ) {
      next();
    } else {
      console.error("Access denied");
      next({ name: Routes.DASHBOARD });
    }
  }
}
