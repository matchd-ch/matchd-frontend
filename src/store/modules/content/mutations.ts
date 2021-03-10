import { BranchType, JobOptionType } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/content/state";

export type Mutations<S = State> = {
  [MutationTypes.JOB_OPTIONS_LOADING](state: S): void;
  [MutationTypes.JOB_OPTIONS_LOADED](state: S, payload: { jobOptions: JobOptionType[] }): void;
  [MutationTypes.BRANCHES_LOADING](state: S): void;
  [MutationTypes.BRANCHES_LOADED](state: S, payload: { branches: BranchType[] }): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.JOB_OPTIONS_LOADING](state: State) {
    state.jobOptions.loading = true;
  },
  [MutationTypes.JOB_OPTIONS_LOADED](state: State, payload: { jobOptions: JobOptionType[] }) {
    state.jobOptions.loading = false;
    state.jobOptions.data = payload.jobOptions;
  },
  [MutationTypes.BRANCHES_LOADING](state: State) {
    state.jobOptions.loading = true;
  },
  [MutationTypes.BRANCHES_LOADED](state: State, payload: { branches: BranchType[] }) {
    state.branches.loading = false;
    state.branches.data = payload.branches;
  },
};
