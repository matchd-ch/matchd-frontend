import { createApolloClient } from "@/api/apollo-client";
import { RootState } from "@/store";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/content/mutations";
import { MutationTypes } from "@/store/modules/content/mutation-types";
import { State } from "@/store/modules/content/state";

import jobOptionsQuery from "@/api/queries/jobOptions.gql";
import branchesQuery from "@/api/queries/branches.gql";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.JOB_POSITIONS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.BRANCHES]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.JOB_POSITIONS]({ commit }) {
    commit(MutationTypes.JOB_OPTIONS_LOADING);
    const response = await apiClient.query({
      query: jobOptionsQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_OPTIONS_LOADED, { jobOptions: response.data.jobOptions });
  },
  async [ActionTypes.BRANCHES]({ commit }) {
    commit(MutationTypes.BRANCHES_LOADING);
    const response = await apiClient.query({
      query: branchesQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.BRANCHES_LOADED, { branches: response.data.branches });
  },
};
