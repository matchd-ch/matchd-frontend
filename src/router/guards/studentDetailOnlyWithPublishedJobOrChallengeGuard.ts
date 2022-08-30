import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { Routes } from "..";

export async function studentDetailOnlyWithPublishedJobOrChallengeGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  await Promise.all([
    store.dispatch(ActionTypes.JOB_POSTINGS),
    store.dispatch(ActionTypes.CHALLENGE),
  ]);
  if (store.getters["jobPostings"].length > 0 || store.getters["challenges"].length > 0) {
    next();
  } else if (store.getters["jobPostings"].length === 0) {
    next({
      name: Routes.JOB_POSTING_CREATE,
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  } else if (store.getters["challenges"].length === 0) {
    next({
      name: Routes.CHALLENGE_CREATE,
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  } else {
    next();
  }
}
