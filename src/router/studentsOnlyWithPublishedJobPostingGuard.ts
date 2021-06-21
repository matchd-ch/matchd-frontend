import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function studentsOnlyWithPublishedJobPostingGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  await store.dispatch(ActionTypes.JOB_POSTINGS);
  await store.dispatch(ActionTypes.PROJECT_POSTINGS);

  if (
    to.name === "StudentDetail" &&
    (store.getters["jobPostings"].length || store.getters["projectPostings"].length)
  ) {
    next();
  } else if (to.name === "ProjectSearch" && store.getters["projectPostings"].length === 0) {
    next({
      name: "ProjectPostingCreate",
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  } else if (to.name === "StudentSearch" && store.getters["jobPostings"].length === 0) {
    next({
      name: "JobPostingCreate",
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  } else {
    next();
  }
}
