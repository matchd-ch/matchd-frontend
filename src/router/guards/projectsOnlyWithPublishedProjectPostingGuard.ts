import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function projectsOnlyWithPublishedProjectPostingGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  await store.dispatch(ActionTypes.PROJECT_POSTINGS);

  if (store.getters["projectPostings"].length) {
    next();
  } else {
    next({
      name: "ProjectPostingCreate",
      params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
    });
  }
}
