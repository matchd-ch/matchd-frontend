import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { Routes } from "..";

export async function challengesOnlyWithPublishedChallengeGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  await store.dispatch(ActionTypes.CHALLENGES);

  if (store.getters["challenges"].length) {
    next();
  } else {
    next({
      name: Routes.CHALLENGE_CREATE,
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  }
}
