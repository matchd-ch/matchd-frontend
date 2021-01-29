import { createApolloClient } from "@/api/apollo-client";
import { RootState } from "@/store";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/login/mutations";
import { MutationTypes } from "@/store/modules/login/mutation-types";
import { State } from "@/store/modules/login/state";

import tokenAuthMutation from "@/api/mutations/tokenAuth.gql";
import refreshTokenMutation from "@/api/mutations/refreshToken.gql";
import sendPasswordResetEmailMutation from "@/api/mutations/sendPasswordResetEmail.gql";
import passwordResetMutation from "@/api/mutations/passwordReset.gql";
import meQuery from "@/api/queries/me.gql";
import verifyPasswordResetTokenQuery from "@/api/queries/verifyPasswordResetToken.gql";

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
  [ActionTypes.LOGOUT]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.REFRESH_LOGIN]({ commit, getters }: AugmentedActionContext): Promise<void>;
  [ActionTypes.ME]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.VERIFY_PASSWORD_RESET_TOKEN](
    { commit }: AugmentedActionContext,
    payload: { token: string }
  ): Promise<void>;
  [ActionTypes.SEND_PASSWORD_RESET_EMAIL](
    { commit }: AugmentedActionContext,
    payload: { email: string }
  ): Promise<void>;
  [ActionTypes.PASSWORD_RESET](
    { commit }: AugmentedActionContext,
    payload: { token: string; password: string }
  ): Promise<void>;
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
  async [ActionTypes.LOGOUT]({ commit }) {
    commit(MutationTypes.LOGOUT_LOADING);
    const response = await apiClient.mutate({
      mutation: tokenAuthMutation,
    });
    commit(MutationTypes.LOGOUT_LOADED, response.data.logout);
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
  async [ActionTypes.VERIFY_PASSWORD_RESET_TOKEN]({ commit }, payload: { token: string }) {
    commit(MutationTypes.VERIFY_PASSWORD_RESET_TOKEN_LOADING);
    const response = await apiClient.query({
      query: verifyPasswordResetTokenQuery,
      variables: payload,
      fetchPolicy: "network-only",
    });
    commit(MutationTypes.VERIFY_PASSWORD_RESET_TOKEN_LOADED, {
      valid: response.data.verifyPasswordResetToken,
    });
  },
  async [ActionTypes.SEND_PASSWORD_RESET_EMAIL]({ commit }, payload: { email: string }) {
    commit(MutationTypes.SEND_PASSWORD_RESET_EMAIL_LOADING);
    const response = await apiClient.mutate({
      mutation: sendPasswordResetEmailMutation,
      variables: payload,
    });
    commit(MutationTypes.SEND_PASSWORD_RESET_EMAIL_LOADED, response.data.sendPasswordResetEmail);
  },
  async [ActionTypes.PASSWORD_RESET]({ commit }, payload: { token: string; password: string }) {
    commit(MutationTypes.PASSWORD_RESET_LOADING);
    const response = await apiClient.mutate({
      mutation: passwordResetMutation,
      variables: payload,
    });
    commit(MutationTypes.PASSWORD_RESET_LOADED, response.data.passwordReset);
  },
};
