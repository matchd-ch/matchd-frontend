import { createApolloClient } from "@/api/apollo-client";
import {
  ICompanyProfileInputStep1,
  ICompanyProfileInputStep2,
  ICompanyProfileInputStep3,
  IStudentProfileInputStep1,
  IStudentProfileInputStep2,
  IStudentProfileInputStep3,
  IStudentProfileInputStep4,
  IStudentProfileInputStep5,
  IStudentProfileInputStep6,
} from "@/api/models/types";
import { RootState } from "@/store";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/profile/mutations";
import { MutationTypes } from "@/store/modules/profile/mutation-types";
import { State } from "@/store/modules/profile/state";

import studentProfileStep1Mutation from "@/api/mutations/studentProfileStep1.gql";
import studentProfileStep2Mutation from "@/api/mutations/studentProfileStep2.gql";
import studentProfileStep3Mutation from "@/api/mutations/studentProfileStep3.gql";
import studentProfileStep4Mutation from "@/api/mutations/studentProfileStep4.gql";
import studentProfileStep5Mutation from "@/api/mutations/studentProfileStep5.gql";
import studentProfileStep6Mutation from "@/api/mutations/studentProfileStep6.gql";
import studentProfileStep3DataQuery from "@/api/queries/studentProfileStep3Data.gql";
import studentProfileStep4DataQuery from "@/api/queries/studentProfileStep4Data.gql";
import companyProfileStep1Mutation from "@/api/mutations/companyProfileStep1.gql";
import companyProfileStep2Mutation from "@/api/mutations/companyProfileStep2.gql";
import companyProfileStep3Mutation from "@/api/mutations/companyProfileStep3.gql";
import companyProfileStep2DataQuery from "@/api/queries/companyProfileStep2Data.gql";
import companyProfileStep3DataQuery from "@/api/queries/companyProfileStep3Data.gql";
import zipCityQuery from "@/api/queries/zipCity.gql";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.STUDENT_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep1
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep2
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep3
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep4
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP5](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep5
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP6](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep6
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP3_DATA]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP4_DATA]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputStep1
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputStep2
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputStep3
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP2_DATA]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP3_DATA]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.CITY_BY_ZIP]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.STUDENT_ONBOARDING_STEP1]({ commit }, payload: IStudentProfileInputStep1) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep1Mutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileStep1);
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP2]({ commit }, payload: IStudentProfileInputStep2) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep2Mutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileStep2);
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP3]({ commit }, payload: IStudentProfileInputStep3) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep3Mutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileStep3);
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP4]({ commit }, payload: IStudentProfileInputStep4) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep4Mutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileStep4);
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP5]({ commit }, payload: IStudentProfileInputStep5) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep5Mutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileStep5);
    commit(MutationTypes.STUDENT_ONBOARDING_NICKNAME_SUGGESTIONS, {
      nicknameSuggestions: response.data.studentProfileStep5?.nicknameSuggestions,
    });
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP6]({ commit }, payload: IStudentProfileInputStep6) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep6Mutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileStep6);
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP3_DATA]({ commit }) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP3_DATA_LOADING);
    const response = await apiClient.query({
      query: studentProfileStep3DataQuery,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP3_DATA_LOADED, {
      jobPositions: response.data.jobPositions,
      jobOptions: response.data.jobOptions,
    });
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP4_DATA]({ commit }) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP4_DATA_LOADING);
    const response = await apiClient.query({
      query: studentProfileStep4DataQuery,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP4_DATA_LOADED, {
      skills: response.data.skills,
      languages: response.data.languages,
      languageLevels: response.data.languageLevels,
    });
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP1]({ commit }, payload: ICompanyProfileInputStep1) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: companyProfileStep1Mutation,
      variables: payload,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADED, response.data.companyProfileStep1);
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP2]({ commit }, payload: ICompanyProfileInputStep2) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: companyProfileStep2Mutation,
      variables: payload,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADED, response.data.companyProfileStep2);
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP3]({ commit }, payload: ICompanyProfileInputStep3) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: companyProfileStep3Mutation,
      variables: payload,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADED, response.data.companyProfileStep3);
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP2_DATA]({ commit }) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP2_DATA_LOADING);
    const response = await apiClient.query({
      query: companyProfileStep2DataQuery,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP2_DATA_LOADED, {
      branches: response.data.branches,
    });
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP3_DATA]({ commit }) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP3_DATA_LOADING);
    const response = await apiClient.query({
      query: companyProfileStep3DataQuery,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP3_DATA_LOADED, {
      jobPositions: response.data.jobPositions,
      benefits: response.data.benefits,
    });
  },
  async [ActionTypes.CITY_BY_ZIP]({ commit }) {
    commit(MutationTypes.ZIP_CITY_LOADING);
    const response = await apiClient.query({
      query: zipCityQuery,
    });
    commit(MutationTypes.ZIP_CITY_LOADED, response.data.zipCity);
  },
};
