import { createApolloClient } from "@/api/apollo-client";
import {
  ICompanyProfileInputStep1,
  ICompanyProfileInputStep2,
  ICompanyProfileInputStep3,
  ICompanyProfileInputStep4,
  IStudentProfileInputStep1,
  IStudentProfileInputStep2,
  IStudentProfileInputStep3,
  IStudentProfileInputStep4,
  IStudentProfileInputStep5,
  IStudentProfileInputStep6,
  IUniversityProfileInputStep1,
  IUniversityProfileInputStep2,
  IUniversityProfileInputStep3,
  IUniversityProfileInputStep4,
} from "@/api/models/types";
import companyProfileStep1Mutation from "@/api/mutations/companyProfileStep1.gql";
import companyProfileStep2Mutation from "@/api/mutations/companyProfileStep2.gql";
import companyProfileStep3Mutation from "@/api/mutations/companyProfileStep3.gql";
import companyProfileStep4Mutation from "@/api/mutations/companyProfileStep4.gql";
import studentProfileStep1Mutation from "@/api/mutations/studentProfileStep1.gql";
import studentProfileStep2Mutation from "@/api/mutations/studentProfileStep2.gql";
import studentProfileStep3Mutation from "@/api/mutations/studentProfileStep3.gql";
import studentProfileStep4Mutation from "@/api/mutations/studentProfileStep4.gql";
import studentProfileStep5Mutation from "@/api/mutations/studentProfileStep5.gql";
import studentProfileStep6Mutation from "@/api/mutations/studentProfileStep6.gql";
import universityProfileStep1Mutation from "@/api/mutations/universityProfileStep1.gql";
import universityProfileStep2Mutation from "@/api/mutations/universityProfileStep2.gql";
import universityProfileStep3Mutation from "@/api/mutations/universityProfileStep3.gql";
import universityProfileStep4Mutation from "@/api/mutations/universityProfileStep4.gql";
import zipCityQuery from "@/api/queries/zipCity.gql";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/profile/mutation-types";
import { Mutations } from "@/store/modules/profile/mutations";
import { State } from "@/store/modules/profile/state";
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
  [ActionTypes.COMPANY_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputStep4
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: IUniversityProfileInputStep1
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: IUniversityProfileInputStep2
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: IUniversityProfileInputStep3
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputStep4
  ): Promise<void>;
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
  async [ActionTypes.COMPANY_ONBOARDING_STEP4]({ commit }, payload: ICompanyProfileInputStep4) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: companyProfileStep4Mutation,
      variables: payload,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADED, response.data.companyProfileStep4);
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP1](
    { commit },
    payload: IUniversityProfileInputStep1
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: universityProfileStep1Mutation,
      variables: payload,
    });
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED, response.data.universityProfileStep1);
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP2](
    { commit },
    payload: IUniversityProfileInputStep2
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: universityProfileStep2Mutation,
      variables: payload,
    });
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED, response.data.universityProfileStep2);
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP3](
    { commit },
    payload: IUniversityProfileInputStep3
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: universityProfileStep3Mutation,
      variables: payload,
    });
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED, response.data.universityProfileStep3);
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP4](
    { commit },
    payload: IUniversityProfileInputStep4
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: universityProfileStep4Mutation,
      variables: payload,
    });
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED, response.data.universityProfileStep4);
  },
  async [ActionTypes.CITY_BY_ZIP]({ commit }) {
    commit(MutationTypes.ZIP_CITY_LOADING);
    const response = await apiClient.query({
      query: zipCityQuery,
    });
    commit(MutationTypes.ZIP_CITY_LOADED, response.data.zipCity);
  },
};
