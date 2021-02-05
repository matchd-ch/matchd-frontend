import { createApolloClient } from "@/api/apollo-client";
import { IStudentProfileInputStep1 } from "@/api/models/types";
import { RootState } from "@/store";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/profile/mutations";
import { MutationTypes } from "@/store/modules/profile/mutation-types";
import { State } from "@/store/modules/profile/state";

import studentProfileStep1Mutation from "@/api/mutations/studentProfileStep1.gql";
import zipCityQuery from "@/api/queries/zipCity.gql";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep1
  ): Promise<void>;
  [ActionTypes.CITY_BY_ZIP]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.ONBOARDING_STEP1]({ commit }, payload: IStudentProfileInputStep1) {
    console.log(payload);
    commit(MutationTypes.ONBOARDING_STEP1_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep1Mutation,
      variables: payload,
    });
    commit(MutationTypes.ONBOARDING_STEP1_LOADED, response.data.studentProfileStep1);
  },
  async [ActionTypes.CITY_BY_ZIP]({ commit }) {
    commit(MutationTypes.ZIP_CITY_LOADING);
    const response = await apiClient.query({
      query: zipCityQuery,
    });
    commit(MutationTypes.ZIP_CITY_LOADED, response.data.zipCity);
  },
};
