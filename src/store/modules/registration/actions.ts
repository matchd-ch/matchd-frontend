import { createApolloClient } from "@/api/apollo-client";
import type { UserRequestInput } from "@/api/models/types";
import registerCompanyMutation from "@/api/mutations/registerCompany.gql";
import registerStudentMutation from "@/api/mutations/registerStudent.gql";
import userRequestMutation from "@/api/mutations/userRequest.gql";
import verifyAccountMutation from "@/api/mutations/verifyAccount.gql";
import type { NewCompanyAccount, NewStudentAccount } from "@/models/NewAccount";
import type { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/registration/mutation-types";
import type { Mutations } from "@/store/modules/registration/mutations";
import type { State } from "@/store/modules/registration/state";
import type { ActionContext, ActionTree } from "vuex";
import { config } from "./../../../config";
import { ActionTypes } from "./action-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(config.API_URL);

export interface Actions {
  [ActionTypes.SAVE_COMPANY_REGISTRATION](
    { commit }: AugmentedActionContext,
    payload: NewCompanyAccount,
  ): Promise<void>;
  [ActionTypes.SAVE_STUDENT_REGISTRATION](
    { commit }: AugmentedActionContext,
    payload: NewStudentAccount,
  ): Promise<void>;
  [ActionTypes.SEND_REGISTRATION_CONTACT_FORM](
    { commit }: AugmentedActionContext,
    payload: UserRequestInput,
  ): Promise<void>;
  [ActionTypes.VERIFY_ACCOUNT_WITH_TOKEN](
    { commit }: AugmentedActionContext,
    payload: { token: string },
  ): Promise<void>;
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
