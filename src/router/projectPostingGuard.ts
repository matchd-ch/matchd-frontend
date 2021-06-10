import { parseStepName } from "@/helpers/parseStepName";
import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/projectposting/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function redirectToCurrentProjectPostingStep(
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
      name: "ProjectPostingCreate",
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  } else if (to.params.slug !== ParamStrings.NEW && to.params.step) {
    try {
      await store.dispatch(ActionTypes.PROJECTPOSTING, { slug: String(to.params.slug) });
      const currentStep = store.getters["currentProjectPostingStep"];
      // Prevent user to go to a step which is beyond the state of the project posting
      if (currentStep < parseStepName(String(to.params.step))) {
        next({
          name: "ProjectPostingCreate",
          params: { ...to.params, step: `${ParamStrings.STEP}${currentStep}` },
        });
      } else {
        next();
      }
    } catch (e) {
      next({ name: "Dashboard" });
    }
  } else {
    next();
  }
}
