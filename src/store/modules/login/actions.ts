import { createApolloClient } from "@/api/apollo-client";
import { RootState } from "@/store";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/login/mutations";
import { MutationTypes } from "@/store/modules/login/mutation-types";
import { State } from "@/store/modules/login/state";

import tokenAuthMutation from "@/api/mutations/tokenAuth.gql";
import refreshTokenMutation from "@/api/mutations/refreshToken.gql";
import meQuery from "@/api/queries/me.gql";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    payload: { username: string; password: string }
  ): Promise<void>;
  [ActionTypes.REFRESH_LOGIN]({ commit, getters }: AugmentedActionContext): Promise<void>;
  [ActionTypes.ME]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.LOGIN]({ commit }, payload: { username: string; password: string }) {
    commit(MutationTypes.LOGIN_LOADING);
    const response = await apiClient.mutate({
      mutation: tokenAuthMutation,
      variables: payload,
    });
    commit(MutationTypes.LOGIN_LOADED, response.data.tokenAuth);
  },
  async [ActionTypes.REFRESH_LOGIN]({ commit, getters }) {
    commit(MutationTypes.REFRESH_LOGIN_LOADING);
    const response = await apiClient.mutate({
      mutation: refreshTokenMutation,
      variables: {
        refreshToken: getters["refreshToken"] || "",
      },
    });
    commit(MutationTypes.REFRESH_LOGIN_LOADED, response.data.refreshToken);
  },
  async [ActionTypes.ME]({ commit }) {
    commit(MutationTypes.ME_LOADING);
    const response = await apiClient.query({
      query: meQuery,
      fetchPolicy: "network-only",
    });
    commit(MutationTypes.ME_LOADED, response.data.me);
  },
};
