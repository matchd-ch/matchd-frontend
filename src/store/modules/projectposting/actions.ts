import { createApolloClient } from "@/api/apollo-client";
import projectPostingAllocationMutation from "@/api/mutations/projectPostingAllocation.gql";
import projectPostingBaseDataMutation from "@/api/mutations/projectPostingBaseData.gql";
import projectPostingSpecificDataMutation from "@/api/mutations/projectPostingSpecificData.gql";
import projectPostingQuery from "@/api/queries/projectPosting.gql";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/projectposting/mutation-types";
import { Mutations } from "@/store/modules/projectposting/mutations";
import { State } from "@/store/modules/projectposting/state";
import type {
  MutationProjectPostingAllocationArgs,
  MutationProjectPostingBaseDataArgs,
  MutationProjectPostingSpecificDataArgs,
  ProjectPostingAllocation,
  ProjectPostingBaseData,
  ProjectPostingInputAllocation,
  ProjectPostingInputBaseData,
  ProjectPostingInputSpecificData,
  ProjectPostingSpecificData,
} from "api";
import { ActionContext, ActionTree } from "vuex";
import { config } from "./../../../config";
import { ActionTypes } from "./action-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(config.API_URL);

export interface Actions {
  [ActionTypes.SAVE_PROJECTPOSTING_STEP1](
    { commit }: AugmentedActionContext,
    payload: ProjectPostingInputBaseData
  ): Promise<void>;
  [ActionTypes.SAVE_PROJECTPOSTING_STEP2](
    { commit }: AugmentedActionContext,
    payload: ProjectPostingInputSpecificData
  ): Promise<void>;
  [ActionTypes.SAVE_PROJECTPOSTING_STEP3](
    { commit }: AugmentedActionContext,
    payload: ProjectPostingInputAllocation
  ): Promise<void>;
  [ActionTypes.PROJECTPOSTING](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SAVE_PROJECTPOSTING_STEP1]({ commit }, payload: ProjectPostingInputBaseData) {
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADING);
    const response = await apiClient.mutate<
      ProjectPostingBaseData,
      MutationProjectPostingBaseDataArgs
    >({
      mutation: projectPostingBaseDataMutation,
      variables: { baseData: payload },
    });
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADED, response.data ?? undefined);
  },
  async [ActionTypes.SAVE_PROJECTPOSTING_STEP2](
    { commit },
    payload: ProjectPostingInputSpecificData
  ) {
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADING);
    const response = await apiClient.mutate<
      ProjectPostingSpecificData,
      MutationProjectPostingSpecificDataArgs
    >({
      mutation: projectPostingSpecificDataMutation,
      variables: { specificData: payload },
    });
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADED, response.data ?? undefined);
  },
  async [ActionTypes.SAVE_PROJECTPOSTING_STEP3](
    { commit },
    payload: ProjectPostingInputAllocation
  ) {
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADING);
    const response = await apiClient.mutate<
      ProjectPostingAllocation,
      MutationProjectPostingAllocationArgs
    >({
      mutation: projectPostingAllocationMutation,
      variables: { allocation: payload },
    });
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADED, response.data ?? undefined);
  },
  async [ActionTypes.PROJECTPOSTING]({ commit }, payload: { slug: string }) {
    commit(MutationTypes.PROJECTPOSTING_LOADING);
    const response = await apiClient.query({
      query: projectPostingQuery,
      variables: payload,
      fetchPolicy: "no-cache",
    });
    commit(MutationTypes.PROJECTPOSTING_LOADED, response.data.projectPosting);
  },
};
