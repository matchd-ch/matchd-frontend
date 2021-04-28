import { createApolloClient } from "@/api/apollo-client";
import { MatchingInput } from "@/models/MatchingInput";
import { ZipCityJobsInput } from "@/models/ZipCityJobsInput";
import { RootState } from "@/store";
import type { MatchJobPostingInput, MatchStudentInput } from "api";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/content/mutations";
import { MutationTypes } from "@/store/modules/content/mutation-types";
import { State } from "@/store/modules/content/state";

import benefitsQuery from "@/api/queries/benefits.gql";
import branchesQuery from "@/api/queries/branches.gql";
import companyQuery from "@/api/queries/company.gql";
import dashboardQuery from "@/api/queries/dashboard.gql";
import culturalFitsQuery from "@/api/queries/culturalFits.gql";
import jobPostingQuery from "@/api/queries/jobPosting.gql";
import jobPostingsQuery from "@/api/queries/jobPostings.gql";
import jobRequirementsQuery from "@/api/queries/jobRequirements.gql";
import jobTypesQuery from "@/api/queries/jobTypes.gql";
import languagesQuery from "@/api/queries/languages.gql";
import languageLevelsQuery from "@/api/queries/languageLevels.gql";
import matchingQuery from "@/api/queries/matching.gql";
import skillsQuery from "@/api/queries/skills.gql";
import studentQuery from "@/api/queries/student.gql";
import softSkillsQuery from "@/api/queries/softSkills.gql";
import zipCityJobsQuery from "@/api/queries/zipCityJobs.gql";

import matchJobPostingMutation from "@/api/mutations/matchJobPosting.gql";
import matchStudentMutation from "@/api/mutations/matchStudent.gql";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");
let abortController: AbortController | null = null;

export interface Actions {
  [ActionTypes.BENEFITS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.BRANCHES]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.COMPANY](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
  [ActionTypes.CULTURAL_FITS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.DASHBOARD]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_POSTING](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
  [ActionTypes.JOB_POSTINGS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_REQUIREMENTS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_TYPE]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.LANGUAGES](
    { commit }: AugmentedActionContext,
    payload: { shortList: boolean }
  ): Promise<void>;
  [ActionTypes.LANGUAGE_LEVELS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.MATCH_JOB_POSTING](
    { commit }: AugmentedActionContext,
    payload: MatchJobPostingInput
  ): Promise<void>;
  [ActionTypes.MATCH_STUDENT](
    { commit }: AugmentedActionContext,
    payload: MatchStudentInput
  ): Promise<void>;
  [ActionTypes.MATCHING]({ commit }: AugmentedActionContext, payload: MatchingInput): Promise<void>;
  [ActionTypes.SKILLS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.SOFT_SKILLS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.STUDENT](
    { commit }: AugmentedActionContext,
    payload: { slug: string; jobPostingId: string }
  ): Promise<void>;
  [ActionTypes.ZIP_CITY_JOBS](
    { commit }: AugmentedActionContext,
    payload: ZipCityJobsInput
  ): Promise<void>;
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
  async [ActionTypes.DASHBOARD]({ commit }) {
    commit(MutationTypes.DASHBOARD_LOADING);
    const response = await apiClient.query({
      query: dashboardQuery,
      context: {
        batch: true,
      },
    });
    console.log("response", response.data);
    commit(MutationTypes.DASHBOARD_LOADED, {
      dashboard: response.data.dashboard,
    });
  },
  async [ActionTypes.JOB_POSTING]({ commit }, payload: { slug: string }) {
    commit(MutationTypes.JOB_POSTING_LOADING);
    const response = await apiClient.query({
      query: jobPostingQuery,
      fetchPolicy: "no-cache",
      variables: payload,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_POSTING_LOADED, {
      jobPosting: response.data.jobPosting,
    });
  },
  async [ActionTypes.JOB_POSTINGS]({ commit }) {
    commit(MutationTypes.JOB_POSTINGS_LOADING);
    const response = await apiClient.query({
      query: jobPostingsQuery,
      fetchPolicy: "no-cache",
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_POSTINGS_LOADED, {
      jobPostings: response.data.jobPostings,
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
  async [ActionTypes.LANGUAGES]({ commit }, payload: { shortList: boolean }) {
    commit(MutationTypes.LANGUAGES_LOADING);
    const response = await apiClient.query({
      query: languagesQuery,
      variables: {
        shortList: payload?.shortList || null,
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
  async [ActionTypes.MATCH_JOB_POSTING]({ commit }, payload: MatchJobPostingInput) {
    commit(MutationTypes.MATCH_LOADING);
    const response = await apiClient.mutate({
      mutation: matchJobPostingMutation,
      variables: payload,
    });
    commit(MutationTypes.MATCH_JOB_POSTING_LOADED, {
      id: payload.jobPosting?.id,
      match: response.data.matchJobPosting,
    });
  },
  async [ActionTypes.MATCH_STUDENT]({ commit }, payload: MatchStudentInput) {
    commit(MutationTypes.MATCH_LOADING);
    const response = await apiClient.mutate({
      mutation: matchStudentMutation,
      variables: payload,
    });
    commit(MutationTypes.MATCH_STUDENT_LOADED, {
      id: payload.student?.id,
      match: response.data.matchStudent,
    });
  },
  async [ActionTypes.MATCHING]({ commit }, payload: MatchingInput) {
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    commit(MutationTypes.MATCHES_LOADING);
    const response = await apiClient.query({
      query: matchingQuery,
      variables: payload,
      fetchPolicy: "no-cache",
      context: {
        queryDeduplication: false,
        batch: true,
        fetchOptions: {
          signal: abortController.signal,
        },
      },
    });
    commit(MutationTypes.MATCHES_LOADED, { matches: response.data.matches });
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
  async [ActionTypes.STUDENT]({ commit }, payload: { slug: string; jobPostingId: string }) {
    commit(MutationTypes.STUDENT_LOADING);
    const response = await apiClient.query({
      query: studentQuery,
      variables: payload,
      fetchPolicy: "no-cache",
      context: {
        batch: true,
      },
    });

    commit(MutationTypes.STUDENT_LOADED, {
      student: response.data.student,
      avatar: response.data.avatar,
      certificates: response.data.certificates,
    });
  },
  async [ActionTypes.ZIP_CITY_JOBS]({ commit }, payload?: ZipCityJobsInput) {
    commit(MutationTypes.ZIP_CITY_JOBS_LOADING);
    const response = await apiClient.query({
      query: zipCityJobsQuery,
      variables: payload,
      fetchPolicy: "network-only",
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.ZIP_CITY_JOBS_LOADED, { zipCityJobs: response.data.zipCityJobs });
  },
};
