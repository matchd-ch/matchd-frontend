import { parseStepName } from "@/helpers/parseStepName";
import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function redirectToCurrentJobPostingStep(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (
    !to.params.id ||
    !to.params.step ||
    (to.params.id === ParamStrings.NEW && to.params.step !== `${ParamStrings.STEP}1`)
  ) {
    next({
      name: "CreateJobPosting",
      params: { step: `${ParamStrings.STEP}1`, id: ParamStrings.NEW },
    });
  } else if (Number(to.params.id) && to.params.step) {
    const store = useStore();
    await store.dispatch(ActionTypes.JOBPOSTING, { id: `${to.params.id}` });
    const currentStep = store.getters["currentJobPostingStep"];
    // Prevent user to go to a step which is beyond the state of the job posting
    if (currentStep < parseStepName(String(to.params.step))) {
      next({
        name: "CreateJobPosting",
        params: { ...to.params, step: `${ParamStrings.STEP}${currentStep}` },
      });
    } else {
      next();
    }
  } else {
    next();
  }
}
