import { createApolloClient } from "@/api/apollo-client";
import { RootState } from "@/store";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/content/mutations";
import { MutationTypes } from "@/store/modules/content/mutation-types";
import { State } from "@/store/modules/content/state";

import benefitsQuery from "@/api/queries/benefits.gql";
import branchesQuery from "@/api/queries/branches.gql";
import companyQuery from "@/api/queries/company.gql";
import expectationsQuery from "@/api/queries/expectations.gql";
import jobOptionsQuery from "@/api/queries/jobOptions.gql";
import jobPositionsQuery from "@/api/queries/jobPositions.gql";
import languagesQuery from "@/api/queries/languages.gql";
import languageLevelsQuery from "@/api/queries/languageLevels.gql";
import skillsQuery from "@/api/queries/skills.gql";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.BENEFITS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.BRANCHES]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.COMPANY](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
  [ActionTypes.EXPECTATIONS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_OPTIONS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_POSITIONS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.LANGUAGES](
    { commit }: AugmentedActionContext,
    payload: { shortList: boolean }
  ): Promise<void>;
  [ActionTypes.LANGUAGE_LEVELS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.SKILLS]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.BENEFITS]({ commit }) {
    commit(MutationTypes.BENEFITS_LOADING);
    const response = await apiClient.query({
      query: benefitsQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.BENEFITS_LOADED, { benefits: response.data.benefits });
  },
  async [ActionTypes.BRANCHES]({ commit }) {
    commit(MutationTypes.BRANCHES_LOADING);
    const response = await apiClient.query({
      query: branchesQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.BRANCHES_LOADED, { branches: response.data.branches });
  },
  async [ActionTypes.COMPANY]({ commit }, payload: { slug: string }) {
    commit(MutationTypes.COMPANY_LOADING);
    const response = await apiClient.query({
      query: companyQuery,
      variables: payload,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.COMPANY_LOADED, { company: response.data.company });
  },
  async [ActionTypes.EXPECTATIONS]({ commit }) {
    commit(MutationTypes.EXPECTATIONS_LOADING);
    const response = await apiClient.query({
      query: expectationsQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.EXPECTATIONS_LOADED, { expectations: response.data.expectations });
  },
  async [ActionTypes.JOB_OPTIONS]({ commit }) {
    commit(MutationTypes.JOB_OPTIONS_LOADING);
    const response = await apiClient.query({
      query: jobOptionsQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_OPTIONS_LOADED, { jobOptions: response.data.jobOptions });
  },
  async [ActionTypes.JOB_POSITIONS]({ commit }) {
    commit(MutationTypes.JOB_POSITIONS_LOADING);
    const response = await apiClient.query({
      query: jobPositionsQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_POSITIONS_LOADED, { jobPositions: response.data.jobPositions });
  },
  async [ActionTypes.LANGUAGES]({ commit }, payload: { shortList: boolean }) {
    commit(MutationTypes.LANGUAGES_LOADING);
    const response = await apiClient.query({
      query: languagesQuery,
      variables: {
        shortList: payload.shortList || false,
      },
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.LANGUAGES_LOADED, { languages: response.data.languages });
  },
  async [ActionTypes.LANGUAGE_LEVELS]({ commit }) {
    commit(MutationTypes.LANGUAGE_LEVELS_LOADING);
    const response = await apiClient.query({
      query: languageLevelsQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.LANGUAGE_LEVELS_LOADED, { languageLevels: response.data.languageLevels });
  },
  async [ActionTypes.SKILLS]({ commit }) {
    commit(MutationTypes.SKILLS_LOADING);
    const response = await apiClient.query({
      query: skillsQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.SKILLS_LOADED, { skills: response.data.skills });
  },
};
