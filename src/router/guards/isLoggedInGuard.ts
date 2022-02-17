import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/login/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function isLoggedInGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  if (to.meta?.public) {
    next();
  } else if (!store.getters["isLoggedIn"] || store.getters["refreshToken"] === null) {
    next({ name: "Login", query: { redirectUri: to.fullPath } });
  } else {
    try {
      await store.dispatch(ActionTypes.ME);
      next();
    } catch (e) {
      next({ name: "Login", query: { redirectUri: to.fullPath } });
    }
  }
}
