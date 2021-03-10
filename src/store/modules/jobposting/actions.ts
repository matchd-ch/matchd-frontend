import { createApolloClient } from "@/api/apollo-client";
import { RootState } from "@/store";
import { JobPostingInputStep1 } from "api";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/jobposting/mutations";
import { MutationTypes } from "@/store/modules/jobposting/mutation-types";
import { State } from "@/store/modules/jobPosting/state";

import jobPostingStep1Mutation from "@/api/mutations/jobPostingStep1.gql";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.SAVE_JOBPOSTING_STEP1](
    { commit }: AugmentedActionContext,
    payload: JobPostingInputStep1
  ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SAVE_JOBPOSTING_STEP1]({ commit }, payload: JobPostingInputStep1) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: jobPostingStep1Mutation,
      variables: payload,
    });
    commit(MutationTypes.JOBPOSTING_STEP_LOADED, response.data.jobPostingStep1);
  },
};
