import { parseStepName } from "@/helpers/parseStepName";
import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/challenge/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { Routes } from "..";

export async function redirectToCurrentChallengeStepGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  if (
    !to.params.slug ||
    !to.params.step ||
    (to.params.slug === ParamStrings.NEW && to.params.step !== `${ParamStrings.STEP}1`)
  ) {
    next({
      name: Routes.CHALLENGE_CREATE,
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  } else if (to.params.slug !== ParamStrings.NEW && to.params.step) {
    try {
      await store.dispatch(ActionTypes.CHALLENGE, { slug: String(to.params.slug) });
      const currentStep = store.getters["currentChallengeStep"];
      // Prevent user to go to a step which is beyond the state of the challenge
      if (currentStep < parseStepName(String(to.params.step))) {
        next({
          name: Routes.CHALLENGE_CREATE,
          params: { ...to.params, step: `${ParamStrings.STEP}${currentStep}` },
        });
      } else {
        next();
      }
    } catch (e) {
      next({ name: Routes.DASHBOARD });
    }
  } else {
    next();
  }
}
