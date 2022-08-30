import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/login/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { Routes } from "..";

export async function isLoggedInGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  if (to.meta?.public && !store.getters["isLoggedIn"]) {
    next();
  } else if (!store.getters["isLoggedIn"] || store.getters["refreshToken"] === null) {
    next({ name: Routes.LOGIN, query: { redirectUri: to.fullPath } });
  } else {
    try {
      await store.dispatch(ActionTypes.ME);
      next();
    } catch (e) {
      next({ name: Routes.LOGIN, query: { redirectUri: to.fullPath } });
    }
  }
}
