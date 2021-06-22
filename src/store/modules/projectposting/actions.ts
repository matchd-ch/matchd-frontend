import { createApolloClient } from "@/api/apollo-client";
import { RootState } from "@/store";
import type {
  ProjectPostingInputStep1,
  ProjectPostingInputStep2,
  ProjectPostingInputStep3,
} from "api";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/projectposting/mutations";
import { MutationTypes } from "@/store/modules/projectposting/mutation-types";
import { State } from "@/store/modules/projectposting/state";

import projectPostingQuery from "@/api/queries/projectPosting.gql";
import projectPostingStep1Mutation from "@/api/mutations/projectPostingStep1.gql";
import projectPostingStep2Mutation from "@/api/mutations/projectPostingStep2.gql";
import projectPostingStep3Mutation from "@/api/mutations/projectPostingStep3.gql";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.SAVE_PROJECTPOSTING_STEP1](
    { commit }: AugmentedActionContext,
    payload: ProjectPostingInputStep1
  ): Promise<void>;
  [ActionTypes.SAVE_PROJECTPOSTING_STEP2](
    { commit }: AugmentedActionContext,
    payload: ProjectPostingInputStep2
  ): Promise<void>;
  [ActionTypes.SAVE_PROJECTPOSTING_STEP3](
    { commit }: AugmentedActionContext,
    payload: ProjectPostingInputStep3
  ): Promise<void>;
  [ActionTypes.PROJECTPOSTING](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SAVE_PROJECTPOSTING_STEP1]({ commit }, payload: ProjectPostingInputStep1) {
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: projectPostingStep1Mutation,
      variables: payload,
    });
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADED, response.data.projectPostingStep1);
  },
  async [ActionTypes.SAVE_PROJECTPOSTING_STEP2]({ commit }, payload: ProjectPostingInputStep2) {
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: projectPostingStep2Mutation,
      variables: payload,
    });
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADED, response.data.projectPostingStep2);
  },
  async [ActionTypes.SAVE_PROJECTPOSTING_STEP3]({ commit }, payload: ProjectPostingInputStep3) {
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: projectPostingStep3Mutation,
      variables: payload,
    });
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADED, response.data.projectPostingStep3);
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
