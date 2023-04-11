import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function studentDetailOnlyWithPublishedJobOrChallengeGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  next();
  // const store = useStore();
  // await Promise.all([
  //   store.dispatch(ActionTypes.JOB_POSTINGS),
  //   store.dispatch(ActionTypes.CHALLENGE),
  // ]);
  // if (store.getters["jobPostings"].length > 0 || store.getters["challenges"].length > 0) {
  //   next();
  // } else if (store.getters["jobPostings"].length === 0) {
  //   next({
  //     name: Routes.JOB_POSTING_CREATE,
  //     params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
  //   });
  // } else if (store.getters["challenges"].length === 0) {
  //   next({
  //     name: Routes.CHALLENGE_CREATE,
  //     params: { step: `${ParamStrings.STEP}1`, slug: ParamStrings.NEW },
  //   });
  // } else {
  //   next();
  // }
}
