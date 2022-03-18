import { createApolloClient } from "@/api/apollo-client";
import type {
  ProjectPostingAllocationInput,
  ProjectPostingBaseDataInput,
  ProjectPostingSpecificDataInput,
} from "@/api/models/types";
import { ProjectPostingAllocationDocument } from "@/api/mutations/projectPostingAllocation.generated";
import { ProjectPostingBaseDataDocument } from "@/api/mutations/projectPostingBaseData.generated";
import { ProjectPostingSpecificDataDocument } from "@/api/mutations/projectPostingSpecificData.generated";
import projectPostingQuery from "@/api/queries/projectPosting.gql";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/projectposting/mutation-types";
import { Mutations } from "@/store/modules/projectposting/mutations";
import { State } from "@/store/modules/projectposting/state";
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
    payload: ProjectPostingBaseDataInput
  ): Promise<void>;
  [ActionTypes.SAVE_PROJECTPOSTING_STEP2](
    { commit }: AugmentedActionContext,
    payload: ProjectPostingSpecificDataInput
  ): Promise<void>;
  [ActionTypes.SAVE_PROJECTPOSTING_STEP3](
    { commit }: AugmentedActionContext,
    payload: ProjectPostingAllocationInput
  ): Promise<void>;
  [ActionTypes.PROJECTPOSTING](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SAVE_PROJECTPOSTING_STEP1]({ commit }, payload: ProjectPostingBaseDataInput) {
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: ProjectPostingBaseDataDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.PROJECTPOSTING_STEP_LOADED,
      response.data?.projectPostingBaseData ?? undefined
    );
  },
  async [ActionTypes.SAVE_PROJECTPOSTING_STEP2](
    { commit },
    payload: ProjectPostingSpecificDataInput
  ) {
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: ProjectPostingSpecificDataDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.PROJECTPOSTING_STEP_LOADED,
      response.data?.projectPostingSpecificData ?? undefined
    );
  },
  async [ActionTypes.SAVE_PROJECTPOSTING_STEP3](
    { commit },
    payload: ProjectPostingAllocationInput
  ) {
    commit(MutationTypes.PROJECTPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: ProjectPostingAllocationDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.PROJECTPOSTING_STEP_LOADED,
      response.data?.projectPostingAllocation ?? undefined
    );
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
