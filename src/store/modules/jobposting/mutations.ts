import { errorCodeMapper } from "@/helpers/errorCodeMapper";

import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/jobposting/state";

export type Mutations<S = State> = {
  [MutationTypes.JOBPOSTING_STEP_LOADING](state: S): void;
  [MutationTypes.JOBPOSTING_STEP_LOADED](state: S, payload: any): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.JOBPOSTING_STEP_LOADING](state: State) {
    state.jobPosting.loading = true;
  },
  [MutationTypes.JOBPOSTING_STEP_LOADED](state: State, payload: any) {
    state.jobPosting.loading = false;
    state.jobPosting.success = payload.success || false;
    state.jobPosting.errors = errorCodeMapper(payload.errors);
  },
};
