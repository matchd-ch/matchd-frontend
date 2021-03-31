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
import culturalFitsQuery from "@/api/queries/culturalFits.gql";
import jobRequirementsQuery from "@/api/queries/jobRequirements.gql";
import jobTypesQuery from "@/api/queries/jobTypes.gql";
import jobPositionsQuery from "@/api/queries/jobPositions.gql";
import languagesQuery from "@/api/queries/languages.gql";
import languageLevelsQuery from "@/api/queries/languageLevels.gql";
import skillsQuery from "@/api/queries/skills.gql";
import softSkillsQuery from "@/api/queries/softSkills.gql";

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
  [ActionTypes.CULTURAL_FITS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_REQUIREMENTS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_TYPE]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_POSITIONS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.LANGUAGES](
    { commit }: AugmentedActionContext,
    payload: { shortList: boolean }
  ): Promise<void>;
  [ActionTypes.LANGUAGE_LEVELS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.SKILLS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.SOFT_SKILLS]({ commit }: AugmentedActionContext): Promise<void>;
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

    commit(MutationTypes.COMPANY_LOADED, {
      company: response.data.company,
      logo: response.data.logo,
      media: response.data.media,
    });
  },
  async [ActionTypes.CULTURAL_FITS]({ commit }) {
    commit(MutationTypes.CULTURAL_FITS_LOADING);
    const response = await apiClient.query({
      query: culturalFitsQuery,
      context: {
        batch: true,
      },
    });

    commit(MutationTypes.CULTURAL_FITS_LOADED, {
      culturalFits: response.data.culturalFits,
    });
  },
  async [ActionTypes.JOB_REQUIREMENTS]({ commit }) {
    commit(MutationTypes.JOB_REQUIREMENTS_LOADING);
    const response = await apiClient.query({
      query: jobRequirementsQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_REQUIREMENTS_LOADED, {
      jobRequirements: response.data.jobRequirements,
    });
  },
  async [ActionTypes.JOB_TYPE]({ commit }) {
    commit(MutationTypes.JOB_TYPES_LOADING);
    const response = await apiClient.query({
      query: jobTypesQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_TYPES_LOADED, { jobTypes: response.data.jobTypes });
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
        shortList: payload?.shortList || false,
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
  async [ActionTypes.SOFT_SKILLS]({ commit }) {
    commit(MutationTypes.SOFT_SKILLS_LOADING);
    const response = await apiClient.query({
      query: softSkillsQuery,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.SOFT_SKILLS_LOADED, { softSkills: response.data.softSkills });
  },
};
