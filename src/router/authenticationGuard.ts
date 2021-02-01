import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/login/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function isLoggedIn(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useStore();
  if (to.meta?.public) {
    next();
  } else if (store.getters["jwtToken"] === "" || store.getters["refreshToken"] === "") {
    next({ name: "Login" });
  } else {
    try {
      await store.dispatch(ActionTypes.ME);
      next();
    } catch (e) {
      next({ name: "Login" });
    }
  }
}
