import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function studentDetailOnlyWithPublishedJobOrProjectPostingGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  await Promise.all([
    store.dispatch(ActionTypes.JOB_POSTINGS),
    store.dispatch(ActionTypes.PROJECT_POSTINGS),
  ]);
  if (store.getters["jobPostings"].length > 0 || store.getters["projectPostings"].length > 0) {
    next();
  } else if (store.getters["jobPostings"].length === 0) {
    next({
      name: "JobPostingCreate",
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  } else if (store.getters["projectPostings"].length === 0) {
    next({
      name: "ProjectPostingCreate",
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  } else {
    next();
  }
}
