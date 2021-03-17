import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { JobPostingStep1, JobPostingType } from "api";

import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/jobposting/state";

export type Mutations<S = State> = {
  [MutationTypes.JOBPOSTING_STEP_LOADING](state: S): void;
  [MutationTypes.JOBPOSTING_STEP_LOADED](state: S, payload: JobPostingStep1): void;
  [MutationTypes.JOBPOSTING_LOADING](state: S): void;
  [MutationTypes.JOBPOSTING_LOADED](state: S, payload: JobPostingType): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.JOBPOSTING_STEP_LOADING](state: State) {
    state.jobPosting.loading = true;
  },
  [MutationTypes.JOBPOSTING_STEP_LOADED](state: State, payload: JobPostingStep1) {
    state.jobPosting.loading = false;
    state.jobPosting.success = payload.success || false;
    state.jobPosting.errors = errorCodeMapper(payload.errors);
    if (payload.success) {
      state.jobPosting.id = payload.jobPostingId || "";
    }
  },
  [MutationTypes.JOBPOSTING_LOADING](state: State) {
    state.jobPosting.loading = true; // todo
  },
  [MutationTypes.JOBPOSTING_LOADED](state: State, payload: JobPostingType) {
    state.jobPosting.loading = false; // todo
    state.currentJobPosting = payload;
  },
};
