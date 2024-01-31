import { createApolloClient } from "@/api/apollo-client";
import type {
  ChallengeAllocationInput,
  ChallengeBaseDataInput,
  ChallengeSpecificDataInput,
  DeleteChallengeInput,
} from "@/api/models/types";
import { ChallengeAllocationDocument } from "@/api/mutations/challengeAllocation.generated";
import { ChallengeBaseDataDocument } from "@/api/mutations/challengeBaseData.generated";
import { ChallengeSpecificDataDocument } from "@/api/mutations/challengeSpecificData.generated";
import { DeleteChallengeDocument } from "@/api/mutations/deleteChallenge.generated";
import { ChallengeDocument } from "@/api/queries/challenge.generated";
import type { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/challenge/mutation-types";
import type { Mutations } from "@/store/modules/challenge/mutations";
import type { State } from "@/store/modules/challenge/state";
import type { ActionContext, ActionTree } from "vuex";
import { config } from "../../../config";
import { ActionTypes } from "./action-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(config.API_URL);

export interface Actions {
  [ActionTypes.SAVE_CHALLENGE_STEP1](
    { commit }: AugmentedActionContext,
    payload: ChallengeBaseDataInput,
  ): Promise<void>;
  [ActionTypes.SAVE_CHALLENGE_STEP2](
    { commit }: AugmentedActionContext,
    payload: ChallengeSpecificDataInput,
  ): Promise<void>;
  [ActionTypes.SAVE_CHALLENGE_STEP3](
    { commit }: AugmentedActionContext,
    payload: ChallengeAllocationInput,
  ): Promise<void>;
  [ActionTypes.CHALLENGE](
    { commit }: AugmentedActionContext,
    payload: { slug: string },
  ): Promise<void>;
  [ActionTypes.DELETE_CHALLENGE](
    { commit }: AugmentedActionContext,
    payload: DeleteChallengeInput,
  ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SAVE_CHALLENGE_STEP1]({ commit }, payload: ChallengeBaseDataInput) {
    commit(MutationTypes.CHALLENGE_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: ChallengeBaseDataDocument,
      variables: { input: payload },
    });
    commit(MutationTypes.CHALLENGE_STEP_LOADED, response.data?.challengeBaseData ?? undefined);
  },
  async [ActionTypes.SAVE_CHALLENGE_STEP2]({ commit }, payload: ChallengeSpecificDataInput) {
    commit(MutationTypes.CHALLENGE_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: ChallengeSpecificDataDocument,
      variables: { input: payload },
    });
    commit(MutationTypes.CHALLENGE_STEP_LOADED, response.data?.challengeSpecificData ?? undefined);
  },
  async [ActionTypes.SAVE_CHALLENGE_STEP3]({ commit }, payload: ChallengeAllocationInput) {
    commit(MutationTypes.CHALLENGE_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: ChallengeAllocationDocument,
      variables: { input: payload },
    });
    commit(MutationTypes.CHALLENGE_STEP_LOADED, response.data?.challengeAllocation ?? undefined);
  },
  async [ActionTypes.CHALLENGE]({ commit }, payload: { slug: string }) {
    commit(MutationTypes.CHALLENGE_LOADING);
    const response = await apiClient.query({
      query: ChallengeDocument,
      variables: payload,
      fetchPolicy: "no-cache",
    });
    commit(MutationTypes.CHALLENGE_LOADED, response.data);
  },
  async [ActionTypes.DELETE_CHALLENGE]({ commit }, payload: DeleteChallengeInput) {
    commit(MutationTypes.DELETE_CHALLENGE_LOADING);
    const response = await apiClient.mutate({
      mutation: DeleteChallengeDocument,
      variables: payload,
    });
    commit(MutationTypes.DELETE_CHALLENGE_LOADED, response.data?.deleteChallenge ?? undefined);
  },
};
