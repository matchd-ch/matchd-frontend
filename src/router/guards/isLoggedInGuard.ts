import useImpersonator from "@/helpers/useImpersonator";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/login/action-types";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { Routes } from "..";

export async function isLoggedInGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> {
  const store = useStore();
  const { impersonator } = useImpersonator();

  if (to.meta?.public && !store.getters["isLoggedIn"]) {
    next();
  } else if (
    (!store.getters["isLoggedIn"] || store.getters["refreshToken"] === null) &&
    !impersonator.value
  ) {
    next({ name: Routes.LOGIN, query: { redirectUri: to.fullPath } });
  } else {
    try {
      await store.dispatch(ActionTypes.ME);
      next();
    } catch (e) {
      await store.dispatch(ActionTypes.LOGOUT_CLEAR_STATE);
      next({ name: Routes.LOGIN, query: { redirectUri: to.fullPath } });
    }
  }
}
