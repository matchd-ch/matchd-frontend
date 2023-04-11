import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function talentsOnlyWithPublishedJobPostingGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  await store.dispatch(ActionTypes.JOB_POSTINGS);

  if (store.getters["jobPostings"].length) {
    next();
  } else {
    next({
      name: "JobPostingCreate",
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  }
}
