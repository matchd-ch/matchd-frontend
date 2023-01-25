import { createApolloClient } from "@/api/apollo-client";
import { LogoutDocument } from "@/api/mutations/logout.generated";
import passwordResetMutation from "@/api/mutations/passwordReset.gql";
import refreshTokenMutation from "@/api/mutations/refreshToken.gql";
import sendPasswordResetEmailMutation from "@/api/mutations/sendPasswordResetEmail.gql";
import tokenAuthMutation from "@/api/mutations/tokenAuth.gql";
import { MeDocument } from "@/api/queries/me.generated";
import verifyPasswordResetTokenQuery from "@/api/queries/verifyPasswordResetToken.gql";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/login/mutation-types";
import { Mutations } from "@/store/modules/login/mutations";
import { State } from "@/store/modules/login/state";
import jwtDecode from "jwt-decode";
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
  [ActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    payload: { username: string; password: string }
  ): Promise<void>;
  [ActionTypes.LOGOUT]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.LOGOUT_CLEAR_STATE]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.REFRESH_LOGIN]({ commit, getters }: AugmentedActionContext): Promise<void>;
  [ActionTypes.IMPERSONATE](
    { commit }: AugmentedActionContext,
    payload: { token: string }
  ): Promise<void>;
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
      mutation: LogoutDocument,
    });
    await apiClient.resetStore();
    commit(MutationTypes.LOGOUT_LOADED, response);
  },
  async [ActionTypes.LOGOUT_CLEAR_STATE]({ commit }) {
    await apiClient.resetStore();
    commit(MutationTypes.LOGOUT_LOADED, {});
  },
  async [ActionTypes.REFRESH_LOGIN]({ commit, getters }) {
    commit(MutationTypes.REFRESH_LOGIN_LOADING);
    const response = await apiClient.mutate({
      mutation: refreshTokenMutation,
      variables: {
        refreshToken: getters["refreshToken"] || null,
      },
    });
    commit(MutationTypes.REFRESH_LOGIN_LOADED, response.data.refreshToken);
  },
  async [ActionTypes.IMPERSONATE]({ commit }, payload: { token: string }) {
    try {
      jwtDecode(payload.token);
      commit(MutationTypes.LOGIN_LOADED, {
        token: payload.token,
        success: true,
      });
    } catch {
      console.error("Invalid token");
    }
  },
  async [ActionTypes.ME]({ commit }) {
    commit(MutationTypes.ME_LOADING);
    const response = await apiClient.query({
      query: MeDocument,
      fetchPolicy: "no-cache",
    });
    if (response.data?.me) {
      commit(MutationTypes.ME_LOADED, response.data);
    }
  },
  async [ActionTypes.VERIFY_PASSWORD_RESET_TOKEN]({ commit }, payload: { token: string }) {
    commit(MutationTypes.VERIFY_PASSWORD_RESET_TOKEN_LOADING);
    const response = await apiClient.query({
      query: verifyPasswordResetTokenQuery,
      variables: payload,
      fetchPolicy: "no-cache",
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
