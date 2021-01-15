import { createApolloClient } from "@/api/apollo-client";
import { RootState } from "@/store";
import { UserRequestInput } from "api";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/registration/mutations";
import { MutationTypes } from "@/store/modules/registration/mutation-types";
import { State } from "@/store/modules/registration/state";

import userRequestMutation from "@/api/mutations/userRequest.gql";

import { NewCompanyAccount, NewStudentAccount } from "@/models/NewAccount";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.SAVE_REGISTRATION](
    { commit }: AugmentedActionContext,
    payload: NewCompanyAccount | NewStudentAccount
  ): void;
  [ActionTypes.SEND_REGISTRATION_CONTACT_FORM](
    { commit }: AugmentedActionContext,
    payload: UserRequestInput
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SAVE_REGISTRATION]({ commit }) {
    commit(MutationTypes.SET_LOADING, true);
    // async stuff
    commit(MutationTypes.SET_LOADING, false);
  },
  async [ActionTypes.SEND_REGISTRATION_CONTACT_FORM]({ commit }, payload: UserRequestInput) {
    commit(MutationTypes.REGISTRATION_CONTACT_FORM_LOADING);
    const response = await apiClient.mutate({
      mutation: userRequestMutation,
      variables: payload,
    });
    commit(MutationTypes.REGISTRATION_CONTACT_FORM_SENT, response.data.userRequest);
  },
};
