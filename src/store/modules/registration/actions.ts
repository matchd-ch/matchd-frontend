import { createApolloClient } from "@/api/apollo-client";
import { RootState } from "@/store";
import { UserRequestInput } from "api";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/registration/mutations";
import { MutationTypes } from "@/store/modules/registration/mutation-types";
import { State } from "@/store/modules/registration/state";

import userRequestMutation from "@/api/mutations/userRequest.gql";
import registerCompanyMutation from "@/api/mutations/registerCompany.gql";
import registerStudentMutation from "@/api/mutations/registerStudent.gql";
import verifyAccountMutation from "@/api/mutations/verifyAccount.gql";

import { NewCompanyAccount, NewStudentAccount } from "@/models/NewAccount";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.SAVE_COMPANY_REGISTRATION](
    { commit }: AugmentedActionContext,
    payload: NewCompanyAccount
  ): void;
  [ActionTypes.SAVE_STUDENT_REGISTRATION](
    { commit }: AugmentedActionContext,
    payload: NewStudentAccount
  ): void;
  [ActionTypes.SEND_REGISTRATION_CONTACT_FORM](
    { commit }: AugmentedActionContext,
    payload: UserRequestInput
  ): void;
  [ActionTypes.VERIFY_ACCOUNT_WITH_TOKEN](
    { commit }: AugmentedActionContext,
    payload: { token: string }
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SAVE_COMPANY_REGISTRATION]({ commit }, payload: NewCompanyAccount) {
    commit(MutationTypes.REGISTRATION_COMPANY_LOADING);
    const response = await apiClient.mutate({
      mutation: registerCompanyMutation,
      variables: payload,
    });
    commit(MutationTypes.REGISTRATION_COMPANY_LOADED, response.data.registerCompany);
  },
  async [ActionTypes.SAVE_STUDENT_REGISTRATION]({ commit }, payload: NewStudentAccount) {
    commit(MutationTypes.REGISTRATION_STUDENT_LOADING);
    const response = await apiClient.mutate({
      mutation: registerStudentMutation,
      variables: payload,
    });
    commit(MutationTypes.REGISTRATION_STUDENT_LOADED, response.data.registerStudent);
  },
  async [ActionTypes.SEND_REGISTRATION_CONTACT_FORM]({ commit }, payload: UserRequestInput) {
    commit(MutationTypes.REGISTRATION_CONTACT_FORM_SENDING);
    const response = await apiClient.mutate({
      mutation: userRequestMutation,
      variables: payload,
    });
    commit(MutationTypes.REGISTRATION_CONTACT_FORM_SENT, response.data.userRequest);
  },
  async [ActionTypes.VERIFY_ACCOUNT_WITH_TOKEN]({ commit }, payload: { token: string }) {
    commit(MutationTypes.REGISTRATION_ACTIVATION_LOADING);
    const response = await apiClient.mutate({
      mutation: verifyAccountMutation,
      variables: payload,
    });
    commit(MutationTypes.REGISTRATION_ACTIVATION_LOADED, response.data.verifyAccount);
  },
};
